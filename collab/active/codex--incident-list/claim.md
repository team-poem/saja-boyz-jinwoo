---
branch: codex/incident-list
owner: amazon
started: 2026-10-02
status: active
goal: feat(incidents): 사건 목록·카드·빈 결과·로딩 구현
next: src/features/incident-list/, src/app/incidents/page.tsx, src/app/incidents/loading.tsx
base: dev
---

## 메모
- 사용자 승인 분담에 따라 amazon 담당 사건 목록부터 시작한다.
- 현재는 동작·테스트 초안 준비 단계다. 정확한 테스트 승인 전에는 구현하지 않는다.
- 공용 UI·필터 URL 어댑터·지도·검색은 easter721 담당을 유지한다.
- 기존 Incident 타입을 사용한다. 실제 뉴스 API·제보 저장·인증은 이번 범위에서 확정하지 않는다.
- 공용 기반 인수 전에는 목록 본문을 독립적으로 검증한다. 샘플 데이터는 실제 사건과 구별한다.
