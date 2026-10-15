---
branch: codex/reopen-pr24-merge
owner: amazon
started: 2026-10-15
status: active
goal: fix(release): main 이력을 dev에 연결해 기존 PR24 복구
next: main merge의 내용 보존과 전체 검증 후 정상 dev push 및 PR24 재개
base: dev
---

## 범위

- 사용자가 기존 PR24(dev → main)를 되살리고 main을 dev에 정상 merge하도록 명시적으로 요청했다. 별도 worktree에서 수행한다.
- 시작 refs: dev a924bdd9417b0c207eff2c28a6920708e4f4daf5, main ed92d23f41deb340d7b273299304d2ae0fa76fe8.
- main의 전체 tree는 dev 조상 119172afa3eb5b9cbe62ea18a58e4514a58e278f와 같다. 현재 dev의 #22·#23을 보존하고 공통 조상만 연결한다.
- 기존 #25와 Cairn은 변경하지 않는다. 강제 push, 브랜치 삭제, 새 PR, main 최종 병합, 승인, 배포, 보호 설정 변경은 범위 밖이다.
- dev 보호 규칙에 선형 이력·PR 승인·필수 검사·관리자 적용이 있다. 정상 push가 거부되면 근거와 검증된 산출물을 보존하고 추가 권한 결정이 필요함을 보고한다.
