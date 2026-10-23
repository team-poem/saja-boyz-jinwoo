// file: src/features/article-detail/ui/article-route-host/article-route-host.test.ts
// @vitest-environment jsdom
import { act, createElement, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, test, vi } from 'vitest';
import { ArticleRouteHost, useArticleSheetRoute } from './article-route-host';

let pathname = '/search';
let childSegments = ['search'];
let articleSegments: string[] = [];
const push = vi.fn();
const back = vi.fn();
const replace = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useSelectedLayoutSegments: (slot?: string) =>
    slot === 'article' ? articleSegments : childSegments,
  useRouter: () => ({ push, back, replace, refresh: vi.fn() }),
}));

test('articleSheetRoutesPreserveSource', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const id = 'a'.repeat(64);
  function Background() {
    const [count, setCount] = useState(0);
    const sheet = useArticleSheetRoute();
    return createElement(
      'section',
      { 'aria-label': '검색 결과' },
      createElement('input', { defaultValue: '화재', 'aria-label': '검색어' }),
      createElement(
        'button',
        { onClick: () => setCount(count + 1) },
        '추가 결과 ' + count,
      ),
      createElement(
        'button',
        { onClick: () => sheet?.openArticle(id) },
        '상세 열기',
      ),
    );
  }
  function Detail() {
    const sheet = useArticleSheetRoute();
    return createElement(
      'div',
      { role: 'dialog' },
      createElement('button', { onClick: () => sheet?.close() }, '상세 닫기'),
    );
  }
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  const draw = async (opened = false) => {
    await act(async () =>
      root.render(
        createElement(
          ArticleRouteHost,
          {
            article: opened ? createElement(Detail) : null,
          },
          createElement(Background),
        ),
      ),
    );
  };
  try {
    await draw();
    const input = container.querySelector('input')!;
    input.value = '화재 후속';
    await act(async () =>
      container.querySelector<HTMLButtonElement>('section button')!.click(),
    );
    await act(async () =>
      [...container.querySelectorAll('button')]
        .find((b) => b.textContent === '상세 열기')!
        .click(),
    );
    expect(push).toHaveBeenCalledWith('/incidents/' + id, { scroll: false });
    pathname = '/incidents/' + id;
    articleSegments = ['(.)incidents', id];
    await draw(true);
    expect(container.querySelector('input')).toBe(input);
    expect(input.value).toBe('화재 후속');
    expect(container.querySelector('main')?.textContent).toContain(
      '추가 결과 1',
    );
    const background = input.closest('[inert]');
    expect(
      background,
      '배경은 보존하면서 키보드/포인터 접근 차단',
    ).not.toBeNull();
    expect(
      background?.contains(container.querySelector('[role="dialog"]')),
    ).toBe(false);
    expect(container.querySelector('nav[aria-label="주 메뉴"]')).not.toBeNull();
    await act(async () =>
      container
        .querySelector<HTMLButtonElement>('[role="dialog"] button')!
        .click(),
    );
    expect(back).toHaveBeenCalledTimes(1);
    pathname = '/search';
    articleSegments = ['search']; // catch-all 슬롯도 활성 상세로 오인하지 않는다.
    await draw();
    expect(input.closest('[inert]')).toBeNull();
    expect(input.value).toBe('화재 후속');
    expect(container.querySelector('main')?.textContent).toContain(
      '추가 결과 1',
    );
    childSegments = ['incidents', '(list)'];
    pathname = '/incidents';
    articleSegments = ['incidents'];
    await draw();
    expect(container.querySelector('header')).not.toBeNull();
    expect(container.querySelector('[aria-label="기사 필터"]')).not.toBeNull();
  } finally {
    await act(async () => root.unmount());
    container.remove();
    pathname = '/search';
    childSegments = ['search'];
    articleSegments = [];
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  }
});
