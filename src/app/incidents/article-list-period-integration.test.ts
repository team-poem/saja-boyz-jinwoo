// file: src/app/incidents/article-list-period-integration.test.ts
// @vitest-environment jsdom
import { act, createElement, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, assert, expect, test, vi } from 'vitest';

import IncidentsPage from '@/app/(browse)/@background/incidents/page';
import {
  ArticleRouteHost,
  useArticleSheetRoute,
} from '@/features/article-detail/ui/article-route-host/article-route-host';

let pathname = '/incidents';
let articleSegments: string[] = [];
const push = vi.fn((href: string) => window.history.pushState({}, '', href));
const back = vi.fn(() => window.history.back());

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useSearchParams: () => new URLSearchParams(window.location.search),
  useRouter: () => ({ push, back, refresh: vi.fn() }),
  useSelectedLayoutSegments: (slot?: string) =>
    slot === 'background' ? ['incidents'] : articleSegments,
}));
vi.mock('next/link', () => ({
  useLinkStatus: () => ({ pending: false }),
  default: ({
    href,
    children,
    scroll: _scroll,
    ...props
  }: {
    href: string;
    children: ReactNode;
    scroll?: boolean;
  }) => createElement('a', { href, ...props }, children),
}));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

test('listPeriodSelectionPaginationUnavailableAndDetailReturn', async () => {
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  pathname = '/incidents';
  articleSegments = [];
  window.history.replaceState({}, '', '/incidents');
  push.mockClear();
  const observers: {
    callback: IntersectionObserverCallback;
    target: Element | null;
    disconnected: boolean;
  }[] = [];
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      entry = {
        callback: (() => {}) as IntersectionObserverCallback,
        target: null as Element | null,
        disconnected: false,
      };
      constructor(callback: IntersectionObserverCallback) {
        this.entry.callback = callback;
        observers.push(this.entry);
      }
      observe(target: Element) {
        this.entry.target = target;
        this.entry.disconnected = false;
      }
      unobserve() {
        this.entry.target = null;
      }
      disconnect() {
        this.entry.disconnected = true;
      }
    },
  );
  const item = (index: number) => ({
    article_id: index.toString(16).padStart(64, '0'),
    image_status: 'disabled',
    image_url: null,
    article: {
      title: `기간 기사 ${index}`,
      description: `요약 ${index}`,
      pubDate: '2026-11-15T00:00:00Z',
      originallink: `https://publisher.example.invalid/${index}`,
      link: '',
    },
  });
  let unsupported = false;
  let finishOld: ((response: Response) => void) | undefined;
  const requests: URL[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL | Request) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      requests.push(url);
      const period = url.searchParams.get('period');
      const offset = Number(url.searchParams.get('offset'));
      if (!period && offset === 20) {
        return new Promise<Response>((resolve) => {
          finishOld = resolve;
        });
      }
      const items = offset
        ? [item(20)]
        : Array.from({ length: 20 }, (_, i) => item(i));
      return Response.json(
        { total: 21, items },
        { headers: period && !unsupported ? { 'X-News-Period': period } : {} },
      );
    }),
  );
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  function DetailProbe() {
    const route = useArticleSheetRoute();
    return createElement(
      'a',
      { 'aria-label': '상세에서 목록 복귀', href: route?.sourcePath },
      '목록으로',
    );
  }
  async function renderPage() {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    const page = await Reflect.apply(IncidentsPage, undefined, [
      { searchParams: Promise.resolve(params) },
    ]);
    await act(async () =>
      root.render(
        createElement(
          ArticleRouteHost,
          { background: page },
          createElement(DetailProbe),
        ),
      ),
    );
  }
  function button(label: string) {
    const found = Array.from(host.querySelectorAll('button')).find(
      (node) =>
        (node.getAttribute('aria-label') ?? node.textContent?.trim()) === label,
    );
    assert(found, `${label} 버튼이 있어야 합니다`);
    return found;
  }
  async function click(label: string) {
    await act(async () => button(label).click());
  }
  async function loadTail() {
    await act(async () => {
      for (const observer of [...observers]) {
        if (observer.disconnected || !observer.target) continue;
        observer.callback(
          [
            {
              target: observer.target,
              isIntersecting: true,
              intersectionRatio: 1,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      }
    });
  }
  try {
    await renderPage();
    await loadTail();
    assert(finishOld, '이전 기간의 추가 요청이 대기해야 합니다');
    await click('기간');
    await click('최근 7일');
    expect(new URL(window.location.href).searchParams.get('period')).toBe('7d');
    await renderPage();
    expect(requests.at(-1)?.searchParams.get('period')).toBe('7d');
    expect(requests.at(-1)?.searchParams.get('offset')).toBe('0');
    await act(async () => {
      finishOld?.(Response.json({ total: 21, items: [item(999)] }));
    });
    expect(host.textContent).not.toContain('기간 기사 999');
    await loadTail();
    expect(requests.at(-1)?.searchParams.get('period')).toBe('7d');
    expect(requests.at(-1)?.searchParams.get('offset')).toBe('20');
    expect(host.textContent).toContain('기간 기사 20');
    const articleLink = host.querySelector<HTMLAnchorElement>('article h2 a');
    assert(articleLink);
    await act(async () =>
      articleLink.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      ),
    );
    pathname = articleLink.getAttribute('href')!;
    articleSegments = ['(.)incidents'];
    await renderPage();
    expect(
      host
        .querySelector<HTMLAnchorElement>('a[aria-label="상세에서 목록 복귀"]')
        ?.getAttribute('href'),
    ).toBe('/incidents?period=7d');
    pathname = '/incidents';
    articleSegments = [];
    window.history.replaceState({}, '', '/incidents?period=7d');
    unsupported = true;
    await renderPage();
    const error = host.querySelector('[role="alert"]');
    assert(
      error,
      '서버가 기간 적용을 확인하지 않으면 결과 대신 오류가 표시되어야 합니다',
    );
    expect(error.textContent).toContain('다시 시도');
    expect(error.querySelector('a')?.getAttribute('href')).toBe(
      '/incidents?period=7d',
    );
    expect(host.querySelector('article')).toBeNull();
  } finally {
    await act(async () => root.unmount());
    host.remove();
  }
}, 120_000);
