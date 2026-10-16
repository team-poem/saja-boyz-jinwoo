# 최신 dev 기반 main 조상 연결

## 결과와 보존

- 시작 dev: `a347ed87e78ea17ce866d4bf0ad07c7a77b4d744`.
- 연결할 main: `4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086`.
- 새 브랜치 `codex/link-main-to-dev`를 최신 dev에서 시작했다. 기존 독립 worktree를 재사용했으며 사용자의 미커밋 작업이 있는 기본 checkout은 그대로 유지했다.
- 정상 merge: `451a2f9d17ce0733922f3a7d82e7ec3025bf5faf`. 부모는 `75fc32aec5062620d8ab8f2ff5c5c36dd2a651fe`(새 claim, 부모 dev a347ed87)와 main 4fdbd4e다.
- merge 전후 tree는 `e6caaf83b4f1961b42a089f695aa66d91490530a`로 완전히 같다. 새 작업 기록을 제외하면 기존 dev 1018개 파일의 경로·mode·blob을 모두 보존했다. 누락·불일치·충돌 0개이며 제품·검사기·테스트·설정 변경은 없다.
- 독립 읽기 전용 검토도 같은 보존 결과와 최신 dev·main의 실제 조상 포함을 확인했다. [부모·tree 근거](evidence/ancestry.txt).

## 검증

- Node 24.9.0 / pnpm 10.34.6. 기존 package/lock이 같아 이 worktree의 기존 의존성을 그대로 사용했다.
- 선언된 전체 `./node_modules/.bin/vitest run`: 27파일·113테스트 통과, 120.26초. 브라우저와 hooks 96개·loop 48개·sobaya 32개 회귀를 포함한다. [로그](evidence/suite.txt).
- `pnpm run typecheck`, `pnpm run build`, `pnpm run format:check`, `pnpm run lint`, 스타일 검사와 컨벤션 문서·workflow 포맷 검사 통과. format/lint는 실제 커밋 훅에서도 실행했다. [타입·빌드 로그](evidence/build.txt).
- 로그는 콘솔 CR·줄 끝 공백·끝 빈 줄만 정리했다. 새 기록의 whitespace와 최종 커밋의 협업 검사를 확인한다.
- 새 동작이나 제품 변경이 없으므로 테스트·명세는 수정하지 않았다. 검증 대상은 파일 보존과 실제 Git 부모 관계다.

## 보호 조건과 후속 절차

- dev/main 보호 응답과 저장소 merge 설정을 시작 전후 비교하여 완전 동일함을 확인했다. dev의 strict up-to-date·필수 검사·타인 승인 1명·마지막 push 승인·관리자 보호는 유지된다. [비교 근거](evidence/protection.txt).
- main은 4fdbd4e, dev는 a347ed87 그대로이며 이 작업은 새 복구 브랜치에만 push한다. #24·#28은 변경하지 않는다.
- 최종 head의 PR CI가 모두 완료될 때까지 확인한다. 사람 리뷰를 받은 뒤 반드시 **Create a merge commit**으로 병합해야 한다. Squash/rebase는 조상 연결을 다시 제거한다.
- 실제 dev 병합 후 원격 main이 dev의 조상인지 별도로 확인해야 한다. PR 생성만으로 dev 이력 복구 완료를 주장하지 않는다.
