// @vitest-environment jsdom
import { act, createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, expect, test, vi } from 'vitest';
import { ArticleViewTracker } from './article-view-tracker';

const route = vi.hoisted(() => ({ path: '/incidents/' + 'a'.repeat(64) }));
vi.mock('next/navigation', () => ({ usePathname: () => route.path }));
const id = 'a'.repeat(64);
const origin = 'https://news.example.test';
(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
});

test('only visible active detail records; revisits reuse browser identity and failures stay silent', async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValue(new Response(null, { status: 204 }));
  vi.stubGlobal('fetch', fetcher);
  let visible = false;
  vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() =>
    visible ? 'visible' : 'hidden',
  );
  const root = createRoot(document.createElement('div'));
  const render = () =>
    act(async () =>
      root.render(
        createElement(
          StrictMode,
          null,
          createElement(ArticleViewTracker, { id, apiOrigin: origin }),
        ),
      ),
    );
  await render();
  expect(fetcher).not.toHaveBeenCalled();
  visible = true;
  await act(async () => document.dispatchEvent(new Event('visibilitychange')));
  expect(fetcher).toHaveBeenCalledTimes(1);
  const [url, init] = fetcher.mock.calls[0];
  expect(url).toBe(`${origin}/news/${id}/views`);
  expect(init.method).toBe('POST');
  const visitor = JSON.parse(init.body).visitor_id;
  expect(visitor).toMatch(/^[0-9a-f-]{36}$/);
  route.path = '/incidents';
  await render();
  expect(fetcher).toHaveBeenCalledTimes(1);
  route.path = '/incidents/' + id;
  fetcher.mockRejectedValueOnce(new Error('offline'));
  await render();
  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(JSON.parse(fetcher.mock.calls[1][1].body).visitor_id).toBe(visitor);
  await act(async () => root.unmount());
});

test('unavailable browser storage skips tracking instead of creating repeat visitors', async () => {
  const fetcher = vi.fn();
  vi.stubGlobal('fetch', fetcher);
  vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  const root = createRoot(document.createElement('div'));
  await act(async () =>
    root.render(createElement(ArticleViewTracker, { id, apiOrigin: origin })),
  );
  expect(fetcher).not.toHaveBeenCalled();
  await act(async () => root.unmount());
});
