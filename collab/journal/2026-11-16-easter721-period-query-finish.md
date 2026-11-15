# codex/period-query-consistency · easter721 · 2026-11-16
- claim: collab/active/codex--period-query-consistency/claim.md

## 이벤트
- changed src/components/layout/article-filters/article-filters.tsx 기간값이 정확히 하나인 경우에만 선택 상태를 표시 → 중복 URL도 서버의 전체 기간 요청과 같은 상태로 표시할 것.
- added src/components/layout/article-filters/article-period-query.test.ts 정상·무효·중복 기간값의 버튼 표시와 서버 요청 일치를 확인 → 서버 쿼리 해석을 바꿀 때 함께 점검할 것.

## 남은 것
- 변경은 PR 68의 `9174e0b`에 반영했다. PR의 원격 CI와 리뷰는 해당 PR에서 확인한다.
- `86d53d5`에서 소바야 gate와 review를 각각 통과했다. gate 전체 테스트는 312개였고 리뷰어는 수정이 필요한 결함을 찾지 못했다.
