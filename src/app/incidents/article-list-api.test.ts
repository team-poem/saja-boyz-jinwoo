// file: src/app/incidents/article-list-api.test.ts
import { afterEach, assert, beforeEach, expect, test, vi } from 'vitest';
import { createElement, type ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const loadingRoutes = import.meta.glob('./loading.tsx');
const apiOrigin = 'https://news.example.invalid';
const idA = 'e77553113fe8862b91aec1fd09a25af83e256ac12cb4a8ff7d8d78ea3050c909';
const idB = '6dd70b87676f579839c940ae6048bc6bf65d2005e1552c515b9a0151500b621a';
const item = {
  collection_id: '20261004T030000000000Z_00000000000000000000000000000000',
  article_id: idA,
  article: {
    title: '샘플: <b>교통</b> 안내 &amp; 점검',
    originallink: 'https://example.invalid/news/a',
    link: 'https://portal.example.invalid/news/a',
    description: '가상 &quot;안내&quot; &#39;검증&#39; &#xAC00;',
    pubDate: 'Thu, 17 Sep 2026 09:00:00 +0900',
  },
  image_status: 'disabled',
  image_url: null,
};
const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv('NEWS_API_BASE_URL', apiOrigin);
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function respond(items: unknown[], total = items.length) {
  fetchMock.mockResolvedValueOnce(Response.json({ total, items }));
}

async function renderPage() {
  vi.resetModules();
  const { default: IncidentsPage } = await import('./page');
  return renderToStaticMarkup(await IncidentsPage());
}

function cards(html: string): string[] {
  return html.match(/<article\b[^>]*>[\s\S]*?<\/article>/g) ?? [];
}

function singleCard(html: string) {
  const rows = cards(html);
  expect(rows).toHaveLength(1);
  return rows[0];
}

function readRole(html: string, role: 'status' | 'alert') {
  return html.match(
    new RegExp(
      `<([a-z][a-z0-9]*)\\b([^>]*\\brole="${role}"[^>]*)>([\\s\\S]*?)<\\/\\1>`,
    ),
  );
}

function isLoadingModule(value: unknown): value is { default: ComponentType } {
  return (
    value !== null &&
    typeof value === 'object' &&
    'default' in value &&
    typeof value.default === 'function'
  );
}

function expectError(html: string) {
  const alert = readRole(html, 'alert');
  expect(alert).not.toBeNull();
  expect(alert?.[3]).toContain('기사를 불러오지 못했어요');
  expect(alert?.[3]).toContain('다시 시도');
  expect(alert?.[3]).toContain('href="/incidents"');
  expect(html).not.toContain('아직 수집된 기사가 없어요');
  expect(cards(html)).toHaveLength(0);
}

test('articleApiRequest', async () => {
  respond([]);
  await renderPage();
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [input, init] = fetchMock.mock.calls[0];
  const url = new URL(input instanceof Request ? input.url : String(input));
  expect(url.origin).toBe(apiOrigin);
  expect(url.pathname).toBe('/news');
  expect([...url.searchParams.entries()].sort()).toEqual([
    ['limit', '20'],
    ['offset', '0'],
  ]);
  expect(init?.method).toBe('GET');
  expect(init?.cache).toBe('no-store');
  expect(init?.body).toBeUndefined();
  expect(init?.signal).toBeInstanceOf(AbortSignal);
});
