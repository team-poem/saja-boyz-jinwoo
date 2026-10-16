# codex/recover-main-ancestry · amazon · 2026-10-16
- claim: collab/active/codex--recover-main-ancestry/claim.md

## 이벤트
- changed collab/active/codex--recover-main-ancestry/verification.md 정상 merge c511402의 양쪽 조상 및 1004개 원본 파일 합집합 보존을 확인했다 → 소스 변화 없이 이력을 연결한 후보로 검토할 것.
- rule 협업 검사가 main에서 그대로 가져온 다른 claim 기록 5개를 금지한다 → 기록 삭제·검사 해제 없이 정상 merge 반입과 직접 편집을 구분하는 수정 범위를 검토해야 한다.

## 남은 것
- draft 복구 PR 원격 CI 확인. 로컬 제품 113테스트·타입·빌드·린트·포맷은 통과했지만 협업 검사 실패가 남았다.
- Allow merge commits 설정의 직접 승인, 필요한 사람 리뷰, 모든 필수 검사 충족 전에는 dev에 병합하지 않는다.
