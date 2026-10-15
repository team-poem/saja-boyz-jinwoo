# codex/reopen-pr24-merge · amazon · 2026-10-15
- claim: collab/active/codex--reopen-pr24-merge/claim.md

## 이벤트
- supersedes 2026-10-15-amazon-reopen-pr24-merge-result.md 선형 이력 규칙 차단 → 사용자의 구체적 승인으로 dev required_linear_history만 false로 변경했으며 나머지 보호 설정은 전체 비교로 보존했다.
- changed dev 복구를 직접 push 대신 기존 브랜치의 PR로 진행한다 → 필수 CI와 사람 리뷰를 유지하고 정상 merge commit으로 main 조상을 보존할 것.

## 남은 것
- 저장소 전체 allow_merge_commit=false를 별도로 확인했다. dev 설정만 바꾸라는 승인 범위를 넘어 이 설정은 변경하지 않았다.
- 복구 PR의 원격 CI·리뷰를 확인하고 실제 dev 반영 후 #24 충돌 해소를 검증해야 한다. #24는 릴리즈 PR이며 #25와 main 최종 merge는 별도다.
