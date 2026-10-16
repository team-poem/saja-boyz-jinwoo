# PR24 대체 통합 검증

2026-10-15 KST. PR24는 최신 dev `a924bdd9417b0c207eff2c28a6920708e4f4daf5`를 main `ed92d23f41deb340d7b273299304d2ae0fa76fe8`에 통합하려는 PR이다.

## 충돌 원인

main은 PR20의 squash 결과이며 당시 dev119172a와 전체 tree가 동일한 `651bd9153666a5dff33dadc640f918a22d837840`이다. main에만 있는 변경은 없다. 이후 dev에는 PR22 bf29990과 PR23 a924bdd만 추가됐다. 그러나 공통 조상은 c8ee953에 머물러, 이전에 반영된 파일도 add/add로 판단하는25개 충돌이 생긴다.

dev는 GitHub에서 필수 선형 이력·승인1명·마지막 push 별도 승인·필수 검사·관리자 적용으로 보호되며 저장소는 squash만 허용한다. 원래 PR24를 유지하려면 main 조상을 dev에 넣어야 하지만 merge commit은 현재 규칙과 맞지 않는다. 보호 규칙을 바꾸거나 강제 push하지 않고 main 기반 통합 브랜치를 사용했다.

## 보존 범위

- main 기준 PR22·PR23의 코드·일반 문서·정적 자산·테스트·의존성·완료 저널·보관 명세를 내용 수정 없이 반영했다.
- `src` tree는 dev와 동일한 `0ad12ab6321ef7357ef0ad95d5939e758160df03`이다. `git diff --exit-code origin/dev HEAD -- . ':!collab/active/' ':!collab/journal/2026-10-15-amazon-release-figma-ui.md' ':!collab/journal/2026-10-15-amazon-release-figma-ui-2.md'`로 나머지 보존 파일도 확인한다.
- 기존 검사는 기능 PR에 다른 브랜치의 collab/active 폴더를 추가하는 것을 금지한다. 최초 전체 복사 후보의 실패 원인을 확인한 후 해당 폴더의 새 산출물만 배포 묶음에서 제외했다. main에 원래 있던 작업 기록은 그대로다. 원본은 [PR22 기록](https://github.com/team-poem/saja-boyz-jinwoo/tree/bf29990/collab/active/codex--report-figma-polish), [PR23 기록](https://github.com/team-poem/saja-boyz-jinwoo/tree/a924bdd/collab/active/codex--figma-map-home)에 보존된다.
- 기존 worktree의 미커밋 하네스 이전 작업, dev/main의 커밋·보호 설정, 기존 spec·테스트 기대값은 수정하지 않았다.

## 검증과 근거

- 최초 후보5ba5512에서 실행한 전체 Vitest: **27파일·113테스트 PASS**, 113.61초. 현재 배포 파일은 이 검증 후보와 동일하며 차이는 collab/active 포장뿐이다.
- 같은 후보에서 format:check, lint, typecheck, production build, 스타일 검사 통과. 최종 브랜치의 정상 커밋 훅에서도 format·lint 통과.
- 최종 브랜치 `collab.sh check --base origin/main`: 통과. 과거 원격 claim에 대한 겹침 안내는 남지만 규칙 위반은 없다.
- main이 실제 조상, 미해결 index entry 없음, `git merge-tree --write-tree HEAD origin/main` 종료0. 제품 경로 공백·충돌 마커 검사 통과.
- [로컬 전체 테스트](evidence/suite.txt), [빌드](evidence/build.txt), [정적 검사](evidence/static-checks.txt). 이 로그는 최초 후보 실행 결과이며 최종 브랜치 자체의 전체 검증은 PR의 GitHub CI로 확인한다.
- 기능을 추가·수정하지 않았으므로 UI를 새로 만들거나 운영 접수·배포를 수행하지 않았다. 이미 dev에 합쳐진 두 PR을 main으로 전달하기 위한 통합이다.

## 주의할 후속 작업

대체 PR에는 별도 필수 리뷰가 필요하며 PR24의 승인이 자동 이전되지는 않는다. 장기 dev를 main에 반복 squash하면 같은 문제가 다시 생길 수 있으므로 향후 통합은 main 기준 release 브랜치 또는 별도 합의된 브랜치 정책으로 진행한다.
