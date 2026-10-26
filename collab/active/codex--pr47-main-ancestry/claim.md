---
branch: codex/pr47-main-ancestry
owner: amazon
started: 2026-10-26
status: active
goal: chore(release): PR47 최신 main 조건을 위한 main 이력 연결
next: main 이력을 연결하고 dev 제품 트리 보존 검증 후 통합 PR 하나 게시
base: dev
---

## 메모
- 사용자 승인: 이번 통합에 한해 squash-only 예외로 merge commit을 허용한다.
- 필수 CI와 다른 사람의 최신 head 승인 후 dev에 반영한다. PR47의 main 병합·배포는 별도다.
- dev acce38c, main 3a279ef 기준. main에만 있는 커밋은 #38·#41 머지 커밋 2개이며 내용 변경은 없다.
