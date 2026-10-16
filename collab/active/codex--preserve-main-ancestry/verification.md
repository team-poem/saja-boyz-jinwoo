# main 조상 복구 검증

- 기준 dev: `e889df0c46378af13aa1b035ebbdc7bdef5f57db`.
- 기준 main: `4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086`.
- 복구 merge: `d853456ba30c0ef2bb929246499683a698d0688c`. 부모는 claim 커밋 `53385343d33e451353c13531e6a57c22772f50c7`와 main이다. claim의 부모는 기준 dev다.
- merge 전후 tree는 `e17be3a462714616047d5923bfabade6181c60a5`로 동일하다. 기존 dev 1,025개 파일의 경로·mode·blob을 모두 보존했다. 독립 읽기 전용 검토에서도 불일치 0개와 양쪽 조상 포함을 확인했다.
- 이 PR은 새 claim·검증 기록·저널만 추가한다. 제품·테스트·설정·기존 협업 기록은 변경하지 않는다.

## 실행 검증

- Node 24.9.0, pnpm 10.34.6, 기존 lockfile과 의존성 그대로.
- 전체 `./node_modules/.bin/vitest run`: 27개 파일·113개 테스트 통과, 121.91초. 브라우저 및 hooks·loop·sobaya 회귀 포함.
- 타입 검사, production build, lint, format, 스타일 검사, 컨벤션 문서·workflow 형식 검사 통과. lint와 format은 커밋 훅에서도 실행했다.
- 최초 협업 검사는 아직 작성 전인 저널 누락을 정확히 거부했다. 아래 새 저널을 추가한 후 최종 커밋에서 다시 검사한다. 과거 동료 브랜치와의 겹침 알림은 있으나 기준 dev 대비 기존 파일 변경은 0개다.
- 최신 head에서 GitHub 필수 CI와 타인 승인을 별도로 확인한다. 로컬 검증은 사람 승인을 대신하지 않는다.

## 반복 squash 조사

- #26·#27·#29의 실제 결과는 모두 부모 1개였다. GitHub `merged_by`와 timeline의 actor는 모두 `solp721`(User), `auto_merge`와 `performed_via_github_app`는 null이다.
- 이 기록은 수동 UI와 해당 계정의 API·CLI·에이전트 호출을 구별하지 못한다. 특정 수단이 원인이라고 단정하지 않는다.
- 저장소의 유일한 `gh pr merge --auto --squash`는 `if: false`인 `chore/collab-prune` 전용 작업이다. 세 최종 CI에서 모두 skipped였다. 저장소 CI가 자동 squash했다는 근거는 없다.
- AGENTS의 squash-only 일반 규칙은 존재한다. 이번 조상 복구에는 사용자 승인에 따라 일반 merge 예외를 적용하며 규칙·설정·자동화는 변경하지 않는다.

## 병합 조건

- **Squash 금지.** 최신 head의 타인 승인과 필수 CI가 갖춰지면 담당 에이전트가 `merge_method=merge`와 head SHA 고정으로 dev에 병합한다.
- 병합 직전 dev/main 최신 refs, mergeability, 승인 head, 검사 결과를 다시 확인한다. 보호 규칙 우회·self approve·force push는 하지 않는다.
- 실제 dev의 두 부모 merge, 최신 main의 조상 포함, 검증한 tree의 보존을 확인한 뒤만 복구 완료를 선언한다.
- 별도 릴리즈 PR #30, main, 보호 규칙, 배포는 이 작업에서 변경하지 않는다.
