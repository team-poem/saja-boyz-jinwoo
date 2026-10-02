---
branch: codex/incident-list
owner: amazon
started: 2026-10-02
status: active
goal: feat(incidents): 사건 목록·카드·빈 결과·로딩 구현
next: 사건 ID 예외 처리 명세·추가 테스트 승인 후 src/features/incident-list/ 보완 및 최종 리뷰
base: dev
---

## 메모
- 사용자 승인 분담에 따라 amazon 담당 사건 목록부터 시작한다.
- 승인된 다섯 목록 항목과 Figma 스타일을 구현했다. 전체 검사·최종 gate는 통과했으나 독립 리뷰가 예약 ID의 잘못된 상세 이동을 발견하여 review_pending이다.
- ID 예외 처리의 명세·신규 테스트 제안은 review.id-safety-proposal.md에 있다. 현재 승인 계획과 구현에는 적용하지 않았다.
- 공용 UI·필터 URL 어댑터·지도·검색은 easter721 담당을 유지한다.
- 기존 Incident 타입을 사용한다. 실제 뉴스 API·제보 저장·인증은 이번 범위에서 확정하지 않는다.
- 공용 기반 인수 전에는 목록 본문을 독립적으로 검증한다. 샘플 데이터는 실제 사건과 구별한다.
- /incidents 라우트와 loading.tsx, URL 필터·API 연결은 후속 범위다.
