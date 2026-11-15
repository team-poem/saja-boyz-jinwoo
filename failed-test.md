# 목록 기간 필터 시나리오

## 기간 API
```ts
// file: src/features/article-list/api/list-period.test.ts
import { afterEach, expect, test, vi } from 'vitest';

import { fetchArticleList } from './fetch-articles';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
```
- [x] listRequestIncludesSelectedPeriod — 기간 적용 응답의 요청에 선택한 기간과 기존 인기순 및 offset을 전달한다.
```ts
test('listRequestIncludesSelectedPeriod', async () => {
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  const request = vi
    .fn()
    .mockResolvedValue(
      Response.json(
        { total: 0, items: [] },
        { headers: { 'X-News-Period': '7d' } },
      ),
    );
  vi.stubGlobal('fetch', request);

  const result = await Reflect.apply(fetchArticleList, undefined, [
    undefined,
    20,
    'popular',
    undefined,
    '7d',
  ]);

  expect(result).not.toBeNull();
  const url = new URL(String(request.mock.calls[0][0]));
  expect(url.searchParams.get('period')).toBe('7d');
  expect(url.searchParams.get('sort')).toBe('popular');
  expect(url.searchParams.get('offset')).toBe('20');
});
```

## 화면과 복귀
- [ ] listPeriodSelection — 메뉴 선택·URL·최초 조회와 페이지네이션이 일치한다.
- [ ] listPeriodResetsAndRace — 변경 후 과거 응답이 목록에 섞이지 않고 빈 결과와 재시도를 처리한다.
- [ ] listPeriodDetailReturn — 상세 복귀와 새로고침에서 선택값을 유지한다.
