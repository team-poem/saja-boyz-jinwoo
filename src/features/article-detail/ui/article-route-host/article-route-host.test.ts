// file: src/features/article-detail/ui/article-route-host/article-route-host.test.ts
// @vitest-environment jsdom
import { act, createElement, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, test, vi } from 'vitest';
import { ArticleRouteHost, useArticleSheetRoute } from './article-route-host';

let pathname = '/search';
let backgroundSegments = ['search'];
let childSegments: string[] = [];
const push = vi.fn();
const back = vi.fn();
const replace = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useSelectedLayoutSegments: (slot?: string) =>
    slot === 'background' ? backgroundSegments : childSegments,
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
            background: createElement(Background),
          },
          opened ? createElement(Detail) : null,
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
    childSegments = ['(.)incidents', id];
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
    childSegments = ['search']; // 일반 페이지로 복귀하면 상세 슬롯을 해제한다.
    await draw();
    expect(input.closest('[inert]')).toBeNull();
    expect(input.value).toBe('화재 후속');
    expect(container.querySelector('main')?.textContent).toContain(
      '추가 결과 1',
    );
    backgroundSegments = ['(__SLOT__)', 'incidents'];
    pathname = '/incidents';
    childSegments = ['incidents'];
    await draw();
    expect(container.querySelector('header')).not.toBeNull();
    expect(container.querySelector('[aria-label="기사 필터"]')).not.toBeNull();
  } finally {
    await act(async () => root.unmount());
    container.remove();
    pathname = '/search';
    backgroundSegments = ['search'];
    childSegments = [];
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  }
});

test('articleSheetLoadingPreservesOpenerFocus', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  pathname = '/incidents';
  backgroundSegments = ['(__SLOT__)', 'incidents'];
  childSegments = [];
  const id = 'a'.repeat(64);
  function Background() {
    return createElement(
      'a',
      {
        href: '/incidents/' + id,
        onClick: (event: { preventDefault(): void }) => event.preventDefault(),
      },
      '읽던 기사',
    );
  }
  function Modal({ stage }: { stage: string }) {
    const sheet = useArticleSheetRoute();
    return createElement(
      'div',
      { role: 'dialog', key: stage, tabIndex: -1 },
      createElement('button', { onClick: () => sheet?.close() }, stage),
    );
  }
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  const draw = async (stage?: string) => {
    await act(async () =>
      root.render(
        createElement(
          ArticleRouteHost,
          {
            background: createElement(Background),
          },
          stage ? createElement(Modal, { key: stage, stage }) : null,
        ),
      ),
    );
  };
  try {
    await draw();
    const opener = host.querySelector<HTMLAnchorElement>(
      'main a[href^="/incidents/"]',
    )!;
    opener.focus();
    await act(async () => opener.click());
    pathname = '/incidents/' + id;
    childSegments = ['(.)incidents', id];
    await draw('로딩 중');
    host.querySelector<HTMLElement>('[role="dialog"]')!.focus();
    await draw('기사 본문');
    const close = host.querySelector<HTMLButtonElement>(
      '[role="dialog"] button',
    )!;
    close.focus();
    await act(async () => close.click());
    pathname = '/incidents';
    childSegments = ['incidents'];
    await draw();
    expect(opener.closest('[inert]')).toBeNull();
    expect(
      document.activeElement,
      '로딩 시트가 본문으로 교체되어도 원래 기사 링크로 복귀',
    ).toBe(opener);
  } finally {
    await act(async () => root.unmount());
    host.remove();
    pathname = '/search';
    backgroundSegments = ['search'];
    childSegments = [];
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  }
});
