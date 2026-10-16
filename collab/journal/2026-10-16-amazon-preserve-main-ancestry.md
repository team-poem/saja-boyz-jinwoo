# main 조상 복구의 일반 merge 처리

## 이벤트

- added collab/active/codex--preserve-main-ancestry/verification.md 최신 dev 기반 조상 복구와 기존 1,025개 파일 보존·113개 테스트 통과를 확인함 → 검증 근거와 실제 두 부모 커밋을 확인할 것.
- rule 이번 복구 PR은 사용자 승인에 따른 일반 merge 예외이며 squash 금지 → 동료는 최신 head를 리뷰하고, 승인 후 담당 에이전트가 SHA 고정 merge로 처리할 것.
- supersedes collab/active/codex--link-main-to-dev/verification.md #29는 실제로 squash되어 파일은 보존했으나 조상 연결은 dev에 들어가지 않음 → PR merged 표시만으로 복구 완료를 판단하지 말 것.

## 남은 것

- 새 dev 대상 PR의 필수 CI와 최신 head에 대한 타인 승인 확인, 명시적인 일반 merge 실행, 실제 원격 조상·tree 보존 검증.
- #30 릴리즈와 main 변경은 별도 사용자 결정이며 여기서는 처리하지 않는다.
