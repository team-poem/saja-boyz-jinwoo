# codex/link-main-to-dev · amazon · 2026-10-16

## 이벤트
- changed collab/active/codex--link-main-to-dev/claim.md 최신 dev a347ed87에서 정상 merge 451a2f9로 main 4fdbd4e 조상을 연결했다 → 기존 제품·검사기·테스트·기록 1018개는 그대로다.
- rule 이 복구 PR은 반드시 Create a merge commit으로 병합할 것 → squash/rebase는 파일이 같아도 main 조상을 다시 잃는다.
- rule main과 보호 규칙을 변경하지 않는 복구 브랜치 경로다 → #28의 Update branch로 dev를 main에 반영하지 않는다.

## 남은 것
- 새 dev 대상 PR의 최신 CI와 독립 사람 리뷰를 확인한 뒤 사용자가 정상 merge로 병합한다.
- 실제 병합 후 원격 dev에 main 조상이 포함되는지 다시 확인한다. #24·#28 처리와 main 릴리즈 병합은 이번 요청 범위 밖이다.
