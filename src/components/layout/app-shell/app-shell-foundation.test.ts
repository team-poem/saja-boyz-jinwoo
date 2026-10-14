// file: src/components/layout/app-shell/app-shell-foundation.test.ts
// @vitest-environment jsdom
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, assert, expect, test, vi } from 'vitest';

import { AppShell } from './app-shell';

let pathname = '/';
const childAction = vi.fn();

vi.mock('next/navigation', () => ({ usePathname: () => pathname }));

afterEach(() => {
  pathname = '/';
  vi.unstubAllGlobals();
  childAction.mockClear();
});

async function withShell(
  route: string,
  inspect: (host: HTMLDivElement) => void | Promise<void>,
) {
  pathname = route;
  childAction.mockClear();
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);

  try {
    await act(async () => {
      root.render(
        createElement(
          AppShell,
          null,
          createElement(
            'section',
            { 'aria-label': '기능 내용' },
            createElement('h1', null, '기능 내용'),
            createElement(
              'button',
              { type: 'button', onClick: childAction },
              '기능 동작',
            ),
          ),
        ),
      );
    });
    await inspect(host);
  } finally {
    await act(async () => root.unmount());
    host.remove();
  }
}

test('foundationDedicatedScreensPreserveTheirContent', async () => {
  for (const route of ['/report', `/incidents/${'a'.repeat(64)}`]) {
    await withShell(route, async (host) => {
      expect(host.querySelector('header')).toBeNull();
      expect(host.querySelector('nav[aria-label="주 메뉴"]')).toBeNull();
      const main = host.querySelector('main#main-content');
      assert(main);
      expect(main.textContent).toContain('기능 내용');
      const button = main.querySelector<HTMLButtonElement>('button');
      assert(button);
      await act(async () => button.click());
      expect(childAction).toHaveBeenCalledTimes(1);
    });
  }
});

test('foundationNavigationAnnouncesItsCurrentDestination', async () => {
  for (const [route, currentHref, currentValue] of [
    ['/', '/', 'page'],
    ['/incidents', '/incidents', 'page'],
    ['/search', '/', 'location'],
  ]) {
    await withShell(route, (host) => {
      const nav = host.querySelector('nav[aria-label="주 메뉴"]');
      assert(nav);
      const links = Array.from(nav.querySelectorAll('a'));
      expect(links.map((link) => link.getAttribute('href'))).toEqual([
        '/',
        '/report',
        '/incidents',
      ]);
      const current = nav.querySelectorAll('a[aria-current]');
      expect(current).toHaveLength(1);
      expect(current[0].getAttribute('href')).toBe(currentHref);
      expect(current[0].getAttribute('aria-current')).toBe(currentValue);
      expect(
        nav.querySelector('a[href="/report"]')?.getAttribute('aria-label'),
      ).toBe('제보하기');
    });
  }
});
