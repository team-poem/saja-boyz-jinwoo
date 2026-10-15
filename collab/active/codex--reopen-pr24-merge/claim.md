---
branch: codex/reopen-pr24-merge
owner: amazon
started: 2026-10-15
status: done
goal: fix(release): main 이력을 dev에 연결해 기존 PR24 복구
next: dev 대상 복구 PR의 필수 CI·사람 리뷰와 저장소 merge commit 허용 설정 확인
base: dev
---

## 범위

- 사용자가 기존 PR24(dev → main)를 되살리고 main을 dev에 정상 merge하도록 명시적으로 요청했다. 별도 worktree에서 수행한다.
- 시작 refs: dev a924bdd9417b0c207eff2c28a6920708e4f4daf5, main ed92d23f41deb340d7b273299304d2ae0fa76fe8.
- main의 전체 tree는 dev 조상 119172afa3eb5b9cbe62ea18a58e4514a58e278f와 같다. 현재 dev의 #22·#23을 보존하고 공통 조상만 연결한다.
- 기존 #25와 Cairn은 변경하지 않는다. 강제 push, 브랜치 삭제, 새 PR, main 최종 병합, 승인, 배포, 보호 설정 변경은 범위 밖이다.
- dev 보호 규칙에 선형 이력·PR 승인·필수 검사·관리자 적용이 있다. 정상 push가 거부되면 근거와 검증된 산출물을 보존하고 추가 권한 결정이 필요함을 보고한다.

## 재개 승인

- 사용자가 dev의 선형 이력 요구만 해제하고 기존 브랜치의 복구 PR을 통해 정상 merge commit으로 반영하도록 승인했다. PR·필수 검사·리뷰·나머지 보호 조건을 유지하며 관리자 강제 merge는 하지 않는다.
- dev 설정의 required_linear_history만 false로 바뀌었고 전후 전체 응답 비교에서 나머지 값은 모두 동일했다.
- 저장소 전체 allow_merge_commit=false는 별도 설정이다. 현재 승인된 dev 보호 설정 범위를 넘어 변경하지 않는다. 복구 PR은 dev 대상이며 #24는 main 대상 릴리즈 PR로 유지한다.
