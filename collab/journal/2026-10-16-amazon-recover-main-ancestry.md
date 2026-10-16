# codex/recover-main-ancestry · amazon · 2026-10-16
- claim: collab/active/codex--recover-main-ancestry/claim.md

## 이벤트
- added collab/active/codex--recover-main-ancestry/verification.md #26·#25 squash 이후 최신 main/dev 제품 동일성과 협업 기록 합집합 보존을 검증했다 → 이전 복구 후보 대신 최신 두 부모 merge를 검토할 것.
- rule 이번 dev 대상 복구 PR은 정상 merge commit으로 병합해야 한다 → squash/rebase는 main 조상을 다시 버리므로 사용하지 말 것.

## 남은 것
- merge 커밋의 협업 검사와 draft PR 원격 CI, 최신 push에 대한 사람 리뷰.
- 저장소 Allow merge commits 변경은 자동 승인 심사에서 실행 전 거부됐으므로 직접 사용자 승인 필요. PR·필수 검사·리뷰 우회는 하지 않는다.
- main 최종 병합·#24 닫기·#25 변경·배포는 범위 밖이다.
