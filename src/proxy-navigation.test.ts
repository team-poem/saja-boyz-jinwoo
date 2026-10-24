// file: src/proxy-navigation.test.ts
import { execFile, spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdtemp, rm, symlink } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { chromium, type Browser, type BrowserContext } from 'playwright-core';
import { afterAll, beforeAll, expect, test } from 'vitest';

const execute = promisify(execFile);
const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function listen(server: Server) {
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  return (server.address() as AddressInfo).port;
}

async function stop(child?: ChildProcess) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  const exited = once(child, 'exit');
  child.kill('SIGTERM');
  await Promise.race([exited, wait(2000)]);
  if (child.exitCode === null && child.signalCode === null) {
    child.kill('SIGKILL');
    await exited;
  }
}

async function ready(origin: string, app: ChildProcess, output: () => string) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (app.exitCode !== null) throw new Error(output());
    try {
      const response = await fetch(origin + '/incidents', {
        signal: AbortSignal.timeout(1000),
      });
      await response.body?.cancel();
      if (response.ok) return;
    } catch {
      // Only wait for the test-owned production server.
    }
    await wait(100);
  }
  throw new Error('Next server did not start: ' + output());
}

const id = 'a'.repeat(64);
const missingId = 'f'.repeat(64);
const article = {
  article_id: id,
  image_status: 'disabled',
  image_url: null,
  article: {
    title: '검증용 RSC 이동 기사',
    description: '실제 사건이 아닌 내부 이동 검증용 기사입니다.',
    pubDate: '2026-10-24T00:00:00Z',
    originallink: 'https://publisher.example.invalid/rsc-test',
    link: '',
  },
};
let unavailable = false;
let listArticles = [article];
const detailRequests: number[] = [];
const api = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://fixture.invalid');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (url.pathname === '/news') {
    const offset = Number(url.searchParams.get('offset') ?? 0);
    const limit = Number(url.searchParams.get('limit') ?? 20);
    response.end(
      JSON.stringify({
        total: listArticles.length,
        items: listArticles.slice(offset, offset + limit),
      }),
    );
    return;
  }
  if (url.pathname === '/news/' + id) {
    detailRequests.push(Date.now());
    // Leave this response pending until the app's actual fetch timeout aborts.
    if (unavailable) return;
    response.end(JSON.stringify(article));
    return;
  }
  const item = listArticles.find(
    (item) => url.pathname === '/news/' + item.article_id,
  );
  if (item) {
    response.end(JSON.stringify(item));
    return;
  }
  response.writeHead(404).end('{}');
});

let directory: string | undefined;
let app: ChildProcess | undefined;
let browser: Browser | undefined;
let origin = '';
const contexts: BrowserContext[] = [];

beforeAll(async () => {
  directory = await mkdtemp(join(tmpdir(), 'proxy-navigation-test-'));
  const apiPort = await listen(api);
  const reservation = createServer();
  const appPort = await listen(reservation);
  await new Promise<void>((resolve) => reservation.close(() => resolve()));
  for (const name of [
    'src',
    'public',
    'package.json',
    'next.config.ts',
    'postcss.config.mjs',
    'tsconfig.json',
  ]) {
    await cp(join(process.cwd(), name), join(directory, name), {
      recursive: true,
    });
  }
  await symlink(
    join(process.cwd(), 'node_modules'),
    join(directory, 'node_modules'),
    'junction',
  );
  const env = {
    ...process.env,
    NEWS_API_BASE_URL: 'http://127.0.0.1:' + apiPort,
    NEXT_TELEMETRY_DISABLED: '1',
  };
  const next = join(process.cwd(), 'node_modules/next/dist/bin/next');
  await execute(process.execPath, [next, 'build', '--webpack'], {
    cwd: directory,
    env,
    timeout: 90000,
    maxBuffer: 8 * 1024 * 1024,
  });
  app = spawn(
    process.execPath,
    [next, 'start', '--hostname', '127.0.0.1', '--port', String(appPort)],
    {
      cwd: directory,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );
  let output = '';
  app.stdout?.on('data', (chunk) => {
    output += String(chunk);
  });
  app.stderr?.on('data', (chunk) => {
    output += String(chunk);
  });
  origin = 'http://127.0.0.1:' + appPort;
  await ready(origin, app, () => output);
  browser = await chromium.launch({ channel: 'chrome', headless: true });
}, 120000);

afterAll(async () => {
  for (const context of contexts) await context.close();
  await browser?.close();
  await stop(app);
  api.closeAllConnections();
  await new Promise<void>((resolve) => api.close(() => resolve()));
  if (directory) await rm(directory, { recursive: true, force: true });
}, 120000);

async function openList(width = 393) {
  const context = await browser!.newContext({
    viewport: { width, height: 852 },
  });
  contexts.push(context);
  await context.route('**/*', async (route) => {
    const headers = route.request().headers();
    if (headers['next-router-prefetch'] || headers.purpose === 'prefetch') {
      await route.abort();
      return;
    }
    await route.continue();
  });
  const page = await context.newPage();
  await page.goto(origin + '/incidents');
  await page
    .getByRole('link', { name: article.article.title, exact: true })
    .waitFor();
  return page;
}

test('realNextLinkNavigationSkipsDocumentProbeAndTimesOutOnlyOnce', async () => {
  try {
    const beforeDocument = detailRequests.length;
    const document = await fetch(origin + '/incidents/' + id);
    await document.text();
    expect(document.status).toBe(200);
    expect
      .soft(
        detailRequests.length - beforeDocument,
        'direct document keeps existence probe plus detail load',
      )
      .toBe(2);
    const missing = await fetch(origin + '/incidents/' + missingId);
    const missingHtml = await missing.text();
    expect(missing.status).toBe(404);
    expect(missingHtml).toContain('noindex');

    const normalPage = await openList();
    const normalRequests: { query: string; rsc?: string }[] = [];
    normalPage.on('request', (request) => {
      const url = new URL(request.url());
      if (
        url.pathname === '/incidents/' + id &&
        !request.headers()['next-router-prefetch']
      ) {
        normalRequests.push({ query: url.search, rsc: request.headers().rsc });
      }
    });
    const beforeNormal = detailRequests.length;
    await normalPage
      .getByRole('link', { name: article.article.title, exact: true })
      .click();
    await normalPage
      .getByRole('dialog')
      .getByRole('heading', { level: 1, name: article.article.title })
      .waitFor();
    expect
      .soft(
        normalRequests.some(
          (request) => request.rsc === '1' && /_rsc=/.test(request.query),
        ),
        'the actual NextLink emits an RSC navigation',
      )
      .toBe(true);
    expect
      .soft(
        detailRequests.length - beforeNormal,
        'soft navigation skips the document-only probe',
      )
      .toBe(1);

    const slowPage = await openList();
    unavailable = true;
    const beforeSlow = detailRequests.length;
    const started = Date.now();
    await slowPage
      .getByRole('link', { name: article.article.title, exact: true })
      .click();
    await slowPage
      .getByRole('dialog')
      .getByRole('alert')
      .waitFor({ timeout: 18000 });
    const elapsed = Date.now() - started;
    expect
      .soft(
        detailRequests.length - beforeSlow,
        'unresponsive API is attempted once during soft navigation',
      )
      .toBe(1);
    expect
      .soft(elapsed, 'one actual five-second timeout reaches retry feedback')
      .toBeGreaterThanOrEqual(4500);
    expect
      .soft(elapsed, 'document probe must not add another five-second timeout')
      .toBeLessThan(8500);
    expect(slowPage.url()).toContain('/incidents/' + id);
    expect(
      await slowPage
        .getByRole('link', { name: '다시 시도', exact: true })
        .count(),
    ).toBe(1);
  } finally {
    unavailable = false;
  }
}, 120000);

test('listFocusRemainsVisibleWhileTabbingAndReturningFromDetail', async () => {
  listArticles = [
    article,
    ...Array.from({ length: 13 }, (_, index) => ({
      ...article,
      article_id: (index + 1).toString(16).padStart(64, '0'),
      article: {
        ...article.article,
        title: `포커스 검증 기사 ${index + 1}`,
        originallink: `https://publisher.example.invalid/focus-${index + 1}`,
      },
    })),
  ];
  try {
    for (const width of [320, 393, 1440]) {
      const page = await openList(width);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const links = page.locator('article a');
      expect(await links.count()).toBe(28);
      async function visible(index: number, direction: string) {
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            ),
        );
        const value = await links.nth(index).evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const shell = element.closest('[data-article-background]')!;
          let header = shell.querySelector<HTMLElement>('header');
          while (header && getComputedStyle(header).position !== 'sticky')
            header = header.parentElement;
          const nav = shell.querySelector('nav[aria-label="주 메뉴"]')!;
          const hit = document.elementFromPoint(
            rect.x + rect.width / 2,
            rect.y + rect.height / 2,
          );
          return {
            focused: document.activeElement === element,
            top: rect.top,
            bottom: rect.bottom,
            headerBottom: header?.getBoundingClientRect().bottom ?? 0,
            navTop: nav.getBoundingClientRect().top,
            hit: hit === element || element.contains(hit),
          };
        });
        const label = `${width}px ${direction} 기사 링크 ${index}`;
        expect.soft(value.focused, label + ' 실제 키보드 포커스').toBe(true);
        expect
          .soft(value.top, label + ' 헤더 아래 포커스 윤곽')
          .toBeGreaterThanOrEqual(value.headerBottom + 7);
        expect
          .soft(value.bottom, label + ' 하단 메뉴 위 포커스 윤곽')
          .toBeLessThanOrEqual(value.navTop - 7);
        expect
          .soft(value.hit, label + ' 링크가 다른 요소에 가리지 않음')
          .toBe(true);
      }
      await links.last().focus();
      await visible(27, '시작');
      for (let index = 26; index >= 0; index--) {
        await page.keyboard.press('Shift+Tab');
        await visible(index, 'Shift+Tab');
      }
      for (let index = 1; index < 28; index++) {
        await page.keyboard.press('Tab');
        await visible(index, 'Tab');
      }
      for (let index = 0; index < 3; index++)
        await page.keyboard.press('Shift+Tab');
      const opener = links.nth(24);
      expect(
        await opener.evaluate((element) => element === document.activeElement),
      ).toBe(true);
      const before = await page.evaluate(() => scrollY);
      await page.keyboard.press('Enter');
      await page
        .getByRole('dialog')
        .getByRole('heading', {
          level: 1,
          name: listArticles[12].article.title,
        })
        .waitFor();
      await page.keyboard.press('Escape');
      await page.waitForFunction(
        () => !document.querySelector('[role="dialog"]'),
      );
      expect(new URL(page.url()).pathname).toBe('/incidents');
      await visible(24, '상세 닫기');
      expect(
        Math.abs((await page.evaluate(() => scrollY)) - before),
      ).toBeLessThanOrEqual(2);
      await page.close();
    }
  } finally {
    listArticles = [article];
  }
}, 120000);
