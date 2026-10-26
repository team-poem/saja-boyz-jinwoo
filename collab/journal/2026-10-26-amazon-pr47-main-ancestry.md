# codex/pr47-main-ancestry · amazon · 2026-10-26
- claim: collab/active/codex--pr47-main-ancestry/claim.md

## 이벤트
- rule 이번 PR47 통합에 한해 사용자가 merge commit 예외를 승인함 → 필수 CI와 다른 사람의 최신 head 승인 뒤 dev에 merge commit으로 반영할 것.
- changed main의 #38·#41 머지 커밋을 dev 이력에 연결했고 충돌과 제품 변경은 없음 → dev와 main 양쪽의 최신 대상 브랜치 조건을 함께 만족함.

## 검증
- 기준 dev: acce38c56e88c13c692393edde133f28f88dca8d, main: 3a279ef9df425b4334ed9414241694dbf58c89c6.
- 이력 연결 커밋의 두 번째 부모가 현재 main이고, dev 대비 차이는 이번 claim·저널뿐임.
- 통합 PR의 최종 head 필수 CI 결과와 독립 승인 리뷰는 GitHub에서 별도 확인한다.

## 남은 것
- 통합 PR의 필수 CI·독립 승인 후 merge commit으로 dev에 반영하고 PR47의 최신 상태를 확인한다.
- PR48(main→dev)은 dev의 최신 조건을 만족할 수 없으므로 닫는다. PR47의 main 병합·배포는 수행하지 않는다.
