---
branch: codex/preserve-main-ancestry
owner: amazon
started: 2026-10-16
status: active
goal: fix(release): main 조상 복구 — squash 금지, 담당 에이전트가 merge
next: 필수 CI와 최신 head의 타인 승인 확인 후 SHA 고정 일반 merge
base: dev
---

## 범위

- 시작 dev e889df0c46378af13aa1b035ebbdc7bdef5f57db, main 4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086.
- #26·#27·#29의 squash로 사라진 main 조상 연결을 복구한다. 열린 복구 PR이 없음을 확인했다.
- 사용자 승인에 따라 최신 dev 기반의 새 브랜치에 main을 정상 merge하고 dev 대상 PR 하나만 준비한다.
- 제품·기존 기록·설정을 보존한다. 필수 CI와 최신 head의 타인 승인을 확인한 뒤 담당 에이전트가 merge_method=merge와 head SHA 고정으로 병합한다.
- 이번 복구는 사용자가 승인한 일반 merge 예외다. squash/rebase, 보호 규칙 우회, self approve, 강제 push, main 변경·릴리즈, 배포, 설정·자동화 변경은 하지 않는다.
