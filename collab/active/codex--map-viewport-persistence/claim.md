branch: codex/map-viewport-persistence
owner: easter721
started: 2026-10-12
status: active
goal: feat(map): 화면 이동 후 지도 위치와 확대 수준 복원
next: spec-proposal.md와 failed-test-proposal.md 정확 초안 승인 후 sobaya 구현·검증·dev PR 진행
base: dev
---

## 범위
- 같은 탭의 지도 재진입 시 마지막 중심·확대 수준을 복원한다. 탭 런타임 메모리만 사용하며 새로고침 시 기본 위치로 시작한다.
- 지도 SDK 실패·내 위치·기존 UI와 승인 테스트는 유지한다. 지도 관련 파일과 작업 문서만 변경하며 새로운 의존성·주소 검색·사건 API 변경은 제외한다.
- 사용자 진행 지시에 따라 명세·테스트 초안을 준비한다. 구현은 정확 초안 승인 후 sobaya로 진행한다. GitHub 코멘트와 머지는 별도 승인 전 하지 않는다.
