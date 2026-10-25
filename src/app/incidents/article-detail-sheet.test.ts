// file: src/app/incidents/article-detail-sheet.test.ts
// @vitest-environment jsdom
import { expect, test, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import DetailPage from './[id]/page';

vi.mock('next/navigation', () => ({
  usePathname: () => null,
  notFound: () => {
    throw new Error('TEST_ARTICLE_NOT_FOUND');
  },
}));

test('articleDetailServerSheetPreservesDiscovery', async () => {
  const id = 'd'.repeat(64);
  const article = {
    title: '마포구 <b>화재</b> 후속 보도',
    description: '서교동 화재 관련 보도를 확인할 수 있습니다.',
    pubDate: '2026-10-22T21:20:00+09:00',
    originallink: 'https://publisher.example.invalid/report',
    link: 'https://portal.example.invalid/report',
  };
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      Response.json({
        article_id: id,
        article,
        image_status: 'disabled',
        image_url: null,
      }),
    ),
  );
  try {
    const tree = await DetailPage({ params: Promise.resolve({ id }) });
    const view = document.createElement('div');
    view.innerHTML = renderToStaticMarkup(tree);
    const sheet = view.querySelector('[role="dialog"]');
    expect(sheet, '직접 접속도 공통 상세 시트로 표시').not.toBeNull();
    expect(sheet?.getAttribute('aria-modal')).toBe('true');
    const title = sheet?.querySelector('h1');
    expect(title?.textContent).toBe('마포구 화재 후속 보도');
    expect(title?.id).toBeTruthy();
    expect(sheet?.getAttribute('aria-labelledby')).toBe(title?.id);
    expect(sheet?.textContent).toContain(article.description);
    expect(sheet?.querySelector('time')?.dateTime).toBe(
      '2026-10-22T12:20:00.000Z',
    );
    const source = sheet?.querySelector(
      'a[href="https://publisher.example.invalid/report"]',
    );
    expect(source?.getAttribute('target')).toBe('_blank');
    expect(source?.getAttribute('rel')).toContain('noopener');
    expect(sheet?.querySelector('button')?.closest('[role="dialog"]')).toBe(
      sheet,
    );
    expect(sheet?.textContent).toContain('공유');
    expect(
      view.querySelector('script[type="application/ld+json"]')?.textContent,
    ).toContain(`/incidents/${id}`);
    expect(view.textContent).not.toMatch(/타임라인|조회수|진행 중|서교동 365/);
  } finally {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  }
});

test('articleSheetInteractionPreservesBackground', async () => {
  const id = 'd'.repeat(64);
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      Response.json({
        article_id: id,
        article: {
          title: '시트 조작 검증 기사',
          description: '검증용 요약',
          pubDate: '2026-10-22T12:20:00Z',
          originallink: 'https://publisher.example.invalid/report',
          link: '',
        },
        image_status: 'disabled',
        image_url: null,
      }),
    ),
  );
  const { act } = await import('react');
  const { createRoot } = await import('react-dom/client');
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const caller = document.createElement('button');
  const container = document.createElement('div');
  document.body.append(caller, container);
  caller.focus();
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'auto';
  const root = createRoot(container);
  let closedTo = '';
  const captureClose = (event: MouseEvent) => {
    const link = (event.target as Element).closest('a[aria-label="닫기"]');
    if (link) {
      event.preventDefault();
      closedTo = link.getAttribute('href') ?? '';
    }
  };
  document.addEventListener('click', captureClose);
  try {
    const tree = await DetailPage({ params: Promise.resolve({ id }) });
    await act(async () => {
      root.render(tree);
    });
    const dialog = container.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(document.body.style.overflow, '시트가 열리면 배경 스크롤 차단').toBe(
      'hidden',
    );
    expect(
      dialog.contains(document.activeElement),
      '시트 안으로 포커스 이동',
    ).toBe(true);
    const handle = dialog.querySelector<HTMLButtonElement>(
      'button[aria-expanded]',
    );
    expect(handle, '키보드로 접고 펼칠 수 있는 핸들').not.toBeNull();
    expect(handle?.getAttribute('aria-expanded')).toBe('true');
    await act(async () => {
      handle?.click();
    });
    expect(handle?.getAttribute('aria-expanded')).toBe('false');
    await act(async () => {
      handle?.click();
    });
    expect(handle?.getAttribute('aria-expanded')).toBe('true');
    await act(async () => {
      dialog.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
    });
    expect(closedTo, '직접 유입은 외부 히스토리 대신 지도 주소로 닫기').toBe(
      '/',
    );
  } finally {
    await act(async () => {
      root.unmount();
    });
    expect(document.body.style.overflow).toBe('auto');
    expect(document.activeElement, '진입한 요소로 포커스 복구').toBe(caller);
    document.body.style.overflow = previousOverflow;
    document.removeEventListener('click', captureClose);
    caller.remove();
    container.remove();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  }
});

test('articleSheetDragKeepsReadingAndShareWithinReach', async () => {
  const id = 'd'.repeat(64);
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      Response.json({
        article_id: id,
        article: {
          title: '드래그 검증 기사',
          description: '긴 요약 '.repeat(80),
          pubDate: '2026-10-22T12:20:00Z',
          originallink: 'https://publisher.example.invalid/report',
          link: '',
        },
        image_status: 'disabled',
        image_url: null,
      }),
    ),
  );
  const { act } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  try {
    await act(async () =>
      root.render(await DetailPage({ params: Promise.resolve({ id }) })),
    );
    const handle = host.querySelector<HTMLButtonElement>(
      'button[aria-expanded]',
    )!;
    const drag = async (start: number, end: number) => {
      await act(async () => {
        handle.dispatchEvent(
          new MouseEvent('pointerdown', { bubbles: true, clientY: start }),
        );
        handle.dispatchEvent(
          new MouseEvent('pointermove', { bubbles: true, clientY: end }),
        );
        handle.dispatchEvent(
          new MouseEvent('pointerup', { bubbles: true, clientY: end }),
        );
      });
    };
    await drag(100, 220);
    expect(
      handle.getAttribute('aria-expanded'),
      '핸들을 내리면 기본 시트',
    ).toBe('false');
    const dialog = host.querySelector('[role="dialog"]')!;
    expect(dialog.querySelector('h1')?.textContent).toBe('드래그 검증 기사');
    const share = [...dialog.querySelectorAll('button')].find((button) =>
      button.textContent?.includes('공유'),
    )!;
    expect(share, '긴 기사에서도 공유 버튼이 사라지지 않음').toBeDefined();
    share.focus();
    await act(async () =>
      share.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }),
      ),
    );
    expect(document.activeElement).toBe(handle);
    await drag(220, 100);
    expect(
      handle.getAttribute('aria-expanded'),
      '핸들을 올리면 확장 시트',
    ).toBe('true');
  } finally {
    await act(async () => root.unmount());
    host.remove();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  }
});
