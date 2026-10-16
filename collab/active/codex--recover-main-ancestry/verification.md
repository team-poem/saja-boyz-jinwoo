# 최신 main 조상 복구 검증

## 최신 이력

- dev: a8b7809b24572056a9b29f1f1212f785693030b2, 유일한 부모 a924bdd9417b0c207eff2c28a6920708e4f4daf5 (#26 squash).
- main: 4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086, 유일한 부모 ed92d23f41deb340d7b273299304d2ae0fa76fe8 (#25 squash).
- 복구 전 merge-base: c8ee953ae9799085099ecaa69ef95545f18dfc03. #26의 squash는 이전 merge 부모 관계를 보존하지 않았다.
- collab 밖의 제품·기존 테스트·설정·문서·자산은 두 브랜치에서 동일하다. main에만 있는 collab 파일 7개, dev에만 있는 파일 131개이며 같은 경로의 내용 차이는 없다.

## 복구와 보존

- 최신 dev에서 새 작업 브랜치를 시작하고 `git merge --no-ff --no-commit origin/main`을 실행했다. 충돌 없이 main 전용 협업 파일 7개가 추가됐다.
- 기존 dev 997개 + main 전용 7개 = 기존 파일 합집합 1004개다. 독립 검토에서 모든 경로의 모드·blob을 비교했으며 누락·불일치·미해결 충돌은 모두 0개였다. 여기에 새 작업 기록만 추가한다.
- 제품 변경과 신규 동작이 없으므로 기존 테스트나 명세를 고치지 않았다. 두 부모를 가진 정상 merge로 main 조상을 연결한다. 이 PR을 squash/rebase하면 같은 문제가 반복된다.
- inherited main 로그의 CR·끝 빈 줄 때문에 전체 whitespace 검사에는 기존 경고가 있다. 원본 협업 기록 보존을 위해 수정하지 않는다. 새 작업 기록은 별도로 검사한다.

## 실행한 검증

- Node v24.9.0, pnpm 10.34.6. 같은 package.json·pnpm-lock.yaml의 의존성을 이 worktree 안으로 복사했다.
- `./node_modules/.bin/vitest run`: 27파일·113테스트 통과, 124.48초. Chrome 회귀와 hooks/loop/sobaya harness 실행을 포함한다.
- `pnpm run lint`, `pnpm run format:check`, `sh scripts/check-styles.sh`: 통과.
- `pnpm exec prettier --check docs/code-conventions.md .github/workflows/app-check.yml`: 통과.
- `pnpm run typecheck`, `pnpm run build`: 통과.
- 기존 파일 내용 보존과 두 브랜치의 collab 밖 diff 0개를 확인했다. 실제 merge 커밋 뒤 협업 검사를 별도 기록한다.

## 설정과 범위

- `allow_merge_commit=true` 변경은 자동 승인 심사가 전달된 승인 근거를 인정하지 않아 실행 전에 거부했다. 다른 경로나 도구로 재시도하지 않았다.
- [변경 전](evidence/repo-settings-before.json)·[거부 후](evidence/repo-settings-after.json) merge 설정은 완전히 같고 allow_merge_commit=false다. dev 보호 설정 전체도 최초 조회 값과 동일하다. 기존 required_linear_history=false 및 PR·검사·리뷰 조건을 유지했다.
- main 최종 merge, #24 닫기, #25 변경, 배포, 강제 push, 관리자 강제 merge, 자기 승인은 하지 않는다.
- #25로 제품 전달이 끝났으므로 #24에는 이후 새 릴리즈 의도가 필요한지 사용자가 결정해야 한다. 이 작업은 #24를 열어 둔다.

## merge 커밋과 협업 검사 결과

- 정상 merge `c51140228ba28c86b20ce9b2b2e111307a6532a9`의 부모는 `a39e4ca40e75657a62f71388e0c87b1146c65b7d`(작업 선언, 부모 dev a8b7809)와 최신 main `4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086`다.
- 커밋 후 `git ls-tree -r`로 모드·blob·경로 전체를 비교했다. 새 작업 기록을 제외하면 main/dev의 1004개 파일 합집합과 정확히 동일하다. main과 dev 모두 복구 HEAD의 실제 조상이며 `git merge-base origin/main HEAD`는 4fdbd4e다.
- `sh scripts/collab.sh check --base origin/dev`는 실패했다. main에서 그대로 가져온 `collab/active/codex--release-figma-ui/`의 claim·검증자료 5개를 다른 브랜치 claim 수정으로 판정한다. 이 파일들은 모두 main 원본 blob과 동일하다. [실패 로그](evidence/collab-check.txt).
- 현재 check는 merge-base 이후의 경로를 보고 다른 claim 디렉터리를 금지하므로, 정상 merge로 들어온 이미 검증된 기록과 직접 편집을 구분하지 않는다. 검사를 끄거나 파일을 제거하지 않았으며 필수 CI 통과로 보고하지 않는다.
- draft 복구 PR에서 원격 검사 결과를 확인하고, 이 정상 merge 반입을 다루는 협업 검사 수정 범위에 대한 결정을 기다린다. 기존 tests/scripts/workflow/보호 조건은 변경하지 않았다.
