# 상세 바텀시트 통합

사용자가 승인한 spec.md 범위에서 테스트 하나씩 진행한다. 시각 기준은 collab/active/codex--detail-bottom-sheet/figma-expanded-context.md의 실제 Figma 컨텍스트다. 기본 높이456/852, 확장803/852, 여백·간격16, 제목18, 이미지140, 닫기24, 공유48. OS 상태바·예시 주소·상태·언론사 로고는 복제하지 않는다. 기존 오류·공유·안전 URL 계약을 유지한다. 서버 본문 GREEN 다음은 시트 프레임의 조작과 배경 복구다. 클라이언트 프레임은 Next 라우터 훅 없이 닫기 링크를 기본으로 하고 뒤 URL 호스트가 선택적 콜백을 제공한다. 접기/펼치기는 버튼과 핸들 드래그를 지원한다. 새 Figma 치수와 실제 close.svg를 사용하고 기존 공유/오류 복귀를 유지한다.

## 서버 상세 시트
```ts
// file: src/app/incidents/article-detail-sheet.test.ts
// @vitest-environment jsdom
import { expect, test, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import DetailPage from './[id]/page';

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('TEST_ARTICLE_NOT_FOUND');
  },
}));
```

- [x] articleDetailServerSheetPreservesDiscovery — 직접 기사 주소에서 확장 시트와 실제 본문/안전 출처를 서버 HTML로 제공
```ts
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
```

- [x] articleSheetInteractionPreservesBackground — 기본/확장·스크롤·Escape·닫기와 포커스/배경 복구
```ts
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
```
- [ ] articleSheetRoutesPreserveSource — 목록/검색의 URL 시트 진입과 q·추가 결과·스크롤 보존
- [ ] mapArticleSheetPreservesGroupedChoices — 지도 단일/다건·하단 카드와 2/12건·중심·줌·SDK 보존
- [ ] articleSheetMetadataMatchesDirectUrl — noindex 누수 방지, canonical·OG·공유·JSON-LD와 오류/없는 기사 구분
- [ ] articleSheetVerifiedContext — 실제 위치·출처·관련 기사만 표현하고 대체된 구형 UI 삭제

## 조작 시트 검증에서 배운 것
- RED는 배경 스크롤 잠금 부재였다. 125개 전체 테스트는 통과했고 초안 서식만 실패해 실행을 보존·종료한 뒤 Prettier만 적용했다. 동일 기대값의 gate 전체 검증 통과를 확인했으며 새로운 RED로 계산하지 않는다.
- 다음은 가로채기 URL 호스트의 배경 상태 보존이다. 소바야 Canon의 직접 에이전트 RED→GREEN과 gate를 사용해 단일 작성자로 진행한다.
