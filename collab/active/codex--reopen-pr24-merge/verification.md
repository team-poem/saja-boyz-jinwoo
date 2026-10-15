# PR24 정상 merge 복구 검증

## 원인과 보존

- 시작 dev: `a924bdd9417b0c207eff2c28a6920708e4f4daf5`.
- 시작 main: `ed92d23f41deb340d7b273299304d2ae0fa76fe8`.
- merge-base: `c8ee953ae9799085099ecaa69ef95545f18dfc03`.
- main은 부모 하나인 PR20 squash 커밋이다. main과 dev 조상 `119172afa3eb5b9cbe62ea18a58e4514a58e278f`의 전체 tree는 `651bd9153666a5dff33dadc640f918a22d837840`로 동일하며 `git diff --exit-code`도 통과했다.
- 이후 dev에는 PR22 `bf29990`, PR23 `a924bdd`가 있다. main에만 있는 별도 파일 내용은 없다.
- `git merge --no-ff --no-commit origin/main`으로 25개 충돌을 직접 재현했다. 각 충돌 파일은 현재 dev의 blob으로 해소했다. 무조건적인 merge strategy로 변경을 버리지 않았다.
- 독립 읽기 전용 검토에서 25개 모두 기존 dev blob = 인덱스 blob = 작업 트리 blob임을 확인했다. 미해결 index entry는 0개다.
- 작업 claim·새 검증자료·새 저널 이외 전체 tracked 파일의 staged/working diff가 dev와 동일하다. 기존 테스트·명세·문서·협업 기록을 수정하지 않았다.

## 검증

- Node `v24.9.0`, pnpm `10.34.6`.
- `./node_modules/.bin/vitest run`: 27파일, 113테스트 통과, 115.85초. 실제 Chrome/로컬 Next 회귀 및 협업 harness 테스트를 포함한다. 운영 Naver 지도 재실행이나 배포는 하지 않았다.
- `pnpm run lint`, `pnpm run format:check`, `sh scripts/check-styles.sh`: 통과.
- `pnpm exec prettier --check docs/code-conventions.md .github/workflows/app-check.yml`: 통과.
- `pnpm run typecheck`: 통과.
- `pnpm run test:harness`: hooks·loop·sobaya 전체 통과.
- `pnpm run build`: 통과. 최초 외부 node_modules 심링크를 Turbopack이 거부했으므로 동일 package.json·lockfile의 의존성을 worktree 안으로 복사한 뒤 재실행했다. 소스나 lockfile을 변경하지 않았다.
- `[evidence/](evidence/)`에 충돌 목록, 전체 테스트, harness, 타입, 빌드 로그를 보존했다. 코드·기존 테스트 변경이 없으므로 새 제품 테스트나 리팩터링은 추가하지 않았다.

## 원격 반영 범위와 제약

- 이 브랜치는 dev에서 시작하며 main을 두 번째 부모로 포함하는 정상 merge를 만든다. dev에 대한 정상 fast-forward push와 기존 PR24 reopen만 요청됐다.
- dev 보호 규칙은 선형 이력 필수, 관리자 포함 적용, 승인 1명 및 마지막 push 승인, 필수 검사를 요구한다. 정상 push 결과를 별도 완료 기록에 남긴다.
- 강제 push, 보호 규칙 변경, 새 PR, #25 변경, main 최종 merge, 정식 APPROVE, 배포는 수행하지 않는다.
