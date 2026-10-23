# 상세 바텀시트 통합

사용자가 승인한 spec.md 범위에서 테스트 하나씩 진행한다. 시각 기준은 collab/active/codex--detail-bottom-sheet/figma-expanded-context.md의 실제 Figma 컨텍스트다. 기본 높이456/852, 확장803/852, 여백·간격16, 제목18, 이미지140, 닫기24, 공유48. OS 상태바·예시 주소·상태·언론사 로고는 복제하지 않는다. 기존 오류·공유·안전 URL 계약을 유지한다. 현재 구현은 서버 확장 시트 본문까지만 진행하고 뒤 시나리오는 구체화하지 않는다.

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

- [ ] articleSheetInteractionPreservesBackground — 기본/확장·스크롤·Escape·닫기와 포커스/배경 복구
- [ ] articleSheetRoutesPreserveSource — 목록/검색의 URL 시트 진입과 q·추가 결과·스크롤 보존
- [ ] mapArticleSheetPreservesGroupedChoices — 지도 단일/다건·하단 카드와 2/12건·중심·줌·SDK 보존
- [ ] articleSheetMetadataMatchesDirectUrl — noindex 누수 방지, canonical·OG·공유·JSON-LD와 오류/없는 기사 구분
- [ ] articleSheetVerifiedContext — 실제 위치·출처·관련 기사만 표현하고 대체된 구형 UI 삭제
