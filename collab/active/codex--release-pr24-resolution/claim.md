---
branch: codex/release-pr24-resolution
owner: amazon
started: 2026-10-15
status: active
goal: chore(release): PR24의 통합 충돌을 해소한 최신 dev 반영
next: main 기반에 PR22·PR23을 적용하고 dev와의 tree 일치·전체 검사를 확인
base: main
---

## 범위

- 사용자 요청: PR24 충돌 해결. PR24는 dev→main이며 이전 squash 통합으로 merge-base가 오래되어 25개 충돌이 생겼다.
- main ed92d23의 전체 tree는 당시 dev119172a와 동일하다. 이후 dev의 변경은 PR22 bf29990, PR23 a924bdd 두 커밋이다.
- 기존 dev의 제품 내용을 보존하고 main에서 두 커밋을 순서대로 재적용하여 충돌 없는 통합 PR을 준비한다. 제품 동작·기존 테스트·명세·하네스·보호 규칙은 변경하지 않는다.
- dev의 필수 선형 이력·리뷰·검사를 우회하거나 강제 push하지 않는다. 기존 PR24는 대체 PR 검토 전까지 열린 상태로 보존한다.
