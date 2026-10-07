// file: src/app/search/search-page.test.ts
// @vitest-environment jsdom
import { afterEach, assert, beforeEach, expect, test, vi } from 'vitest';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SearchPage from './page';
const loadingModules = import.meta.glob('./loading.tsx');
const mock = vi.fn<typeof fetch>();
const item = {
  article_id: 'a'.repeat(64),
  image_status: 'disabled',
  image_url: null,
  article: {
    title: '테스트 기사 <b>화재</b>',
    description: '안전 &amp; 점검',
    pubDate: '2026-10-07T00:00:00Z',
    originallink: 'https://example.invalid/news',
    link: '',
  },
};
beforeEach(() => {
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  vi.stubGlobal('fetch', mock);
});
afterEach(() => {
  mock.mockReset();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
async function renderSearch(q?: string | string[]) {
  const page: (props: {
    searchParams: Promise<{ q?: string | string[] }>;
  }) => ReactNode | Promise<ReactNode> = SearchPage;
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    await page({ searchParams: Promise.resolve({ q }) }),
  );
  return root;
}

test('searchInitialStateUsesRealGetFormWithoutFetching', async () => {
  for (const q of [undefined, '   ']) {
    const root = await renderSearch(q);
    const form = root.querySelector('form');
    assert(form);
    expect(form.getAttribute('action')).toBe('/search');
    expect((form.getAttribute('method') ?? 'get').toLowerCase()).toBe('get');
    const input = form.querySelector('input[name="q"]');
    assert(input instanceof HTMLInputElement);
    expect(input.value).toBe('');
    expect(input.getAttribute('aria-label')).toBe('기사 키워드 검색');
    expect(form.querySelector('button[type="submit"]')).not.toBeNull();
    expect(root.querySelector('a[href="/"]')).not.toBeNull();
    expect(
      Array.from(root.querySelectorAll('a')).some(
        (a) =>
          new URL(
            a.getAttribute('href') ?? '',
            'https://app.example.invalid',
          ).searchParams.get('q') === '대형화재',
      ),
    ).toBe(true);
    expect(root.textContent).not.toContain('검색 결과가 없어요');
    expect(root.textContent).not.toContain('서울 소방서');
  }
  expect(mock).not.toHaveBeenCalled();
});
