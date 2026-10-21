---
branch: codex/sobaya-runtime-bump
owner: amazon
started: 2026-10-21
status: active
goal: chore(sobaya): 검증된 런타임과 Canon TDD 연결로 갱신
next: harness/ AGENTS.md .agents/skills/ scripts/collab.sh tests/sobaya.sh
base: dev
---

## 메모
- 사용자가 다른 Sobaya 소비 저장소의 bump PR 생성을 요청했습니다.
- 기준은 dev 3a2b784이며, Sobaya PR #15가 병합되고 CI를 통과한 0d051213으로 고정합니다.
- 기존 로컬 설치에서 검증한 Canon 연결 변경을 이 격리 worktree로 가져와 리뷰 가능한 변경으로 만듭니다.
- 앱 제품 코드와 기존 작업 체크아웃은 변경하지 않습니다.
