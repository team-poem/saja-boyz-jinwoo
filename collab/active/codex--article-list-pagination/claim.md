branch: codex/article-list-pagination
owner: amazon
started: 2026-10-11
status: active
goal: feat(articles): 기사 목록 더 보기와 페이지별 재시도 구현
next: review.ko.md의 명세·정확 테스트 3개 승인 대기. 기존 58개 통과·새 3개 행동 RED·단계별 타입/린트·독립 초안 리뷰 완료. 승인 후 항목별 구현과 브라우저 검증.
base: dev
---

## 범위
- `/incidents`의 기존 첫 페이지·카드·상세 연결을 유지하고 다음 페이지·중복 제거·로딩·재시도를 추가한다.
- 머지된 PR #11의 공용 fetchArticleList(keyword?, offset)와 total 계약을 재사용한다. 검색·지도·제보·서버 API·의존성 변경은 포함하지 않는다.
- 새 테스트는 사용자 검토 전 초안이다. 승인된 기존 테스트와 spec.md를 변경하지 않는다.
