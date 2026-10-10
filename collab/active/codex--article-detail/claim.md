branch: codex/article-detail
owner: amazon
started: 2026-10-10
status: active
goal: feat(articles): 기사 상세 조회 화면과 목록 연결
next: 상세 경로와 목록 연결의 설계·테스트 초안; 선행 GET /news/{article_id} API 승인 후 화면 구현
base: dev
---

## 범위
- 최신 dev f5bc8cf에서 시작. 현재 상세 경로가 항상 notFound를 반환하는 상태를 실제 기사 조회 화면으로 연결한다.
- 우선 별도 Go 수집기 저장소의 단건 조회 API 계약과 실행 가능한 테스트 초안을 준비하고 사용자 검토를 받는다.
- 프런트 대상은 src/app/incidents/[id]/, src/features/article-detail/ 및 목록 카드의 상세 진입 링크다. 공유 목록 카드는 검색 결과에서도 재사용되므로 기존 검색 동작과 원문 링크를 보존한다.
- 실제 API에 있는 제목·description 요약·발행 시각·원문·AI 이미지 상태만 사용한다. 기사 전문·사건 위치·분류·상태·타임라인은 추정하지 않는다.
- 지도·검색 기능, 공용 레이아웃·토큰·의존성 변경은 이번 착수 범위에서 제외한다. PR #8에서 재현한 지도 인증 실패 처리 문제는 별도 리뷰 사항으로 유지한다.
- spec.md와 기존 승인 테스트를 수정하지 않는다. 신규 실행 테스트가 승인되기 전에는 제품 코드를 구현하지 않는다.
