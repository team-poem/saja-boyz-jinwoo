# PR24 복구 PR 재개

2026-10-15. 사용자가 dev의 merge commit 금지(선형 이력 요구) 해제와 복구 PR 생성을 승인했다. 기존 PR·필수 검사·사람 리뷰·그 외 보호 조건은 유지한다.

## 보호 설정 변경 검증

- 최신 전체 설정을 읽고 required_linear_history만 true에서 false로 변경했다.
- 필수 검사 3개와 각 GitHub App ID 15368, strict=true, 승인 1명, 마지막 push 별도 승인, 오래된 승인 무효화, 관리자 적용, 대화 해결 필수, 강제 push/삭제 금지 모두 유지했다.
- [변경 전](evidence/resume/dev-protection-before.json)과 [변경 후](evidence/resume/dev-protection-after.json)의 전체 JSON을 비교했다. 변경 전 required_linear_history.enabled만 false로 치환하면 변경 후와 완전히 동일하다.
- 최초 요청은 checks/contexts를 동시에 전달해 422 스키마 검증으로 거부됐다. 설정이 그대로임을 확인한 뒤 App ID를 보존하는 checks만 전달해 성공했다. 권한 거부나 보호 우회는 없었다.

## 복구 내용과 검증

- 제품·기존 테스트·문서는 dev a924bdd 그대로다. 독립 검토에서도 기존 tracked 내용 동일성과 main/dev 조상 보존을 재확인했다.
- 이전 검증 113테스트, harness 84/48/32, 타입·빌드·린트·포맷은 같은 제품 소스에 대한 증거다. 이번 추가 변경은 협업 기록뿐이며 원격 PR CI를 새로 확인한다.
- 복구 PR의 base는 dev다. 정상 merge commit으로 81de320의 main 부모 관계를 보존해야 한다. squash/rebase 방식은 이 복구의 조상 연결 목적을 충족하지 않는다.

## 남은 조건

- 저장소 설정 allow_merge_commit=false, allow_squash_merge=true, allow_rebase_merge=false를 확인했다. dev의 선형 이력 해제와 별개로 저장소 전체 merge 방식 허용이 필요하며, 이 설정 변경은 현재의 좁은 승인 범위로 해석하지 않았다.
- 복구 PR 최종 head의 필수 검사 통과와 push한 사람 외의 승인 1명이 필요하다. 기존 #24 승인은 이 PR에 대한 승인을 대신하지 않는다.
- #24의 main 최종 릴리즈 merge, #25 변경, 배포, 관리자 강제 merge, 검사·리뷰 완화는 수행하지 않는다.
