# codex/recover-main-ancestry · amazon · 2026-10-16

## 이벤트
- changed scripts/collab.sh 보호 origin 이력의 실제 merge에서 원본 그대로 추가된 동료 기록을 허용한다 → 직접 편집·삭제와 비보호 브랜치 반입은 계속 금지한다.
- changed tests/hooks.sh 정상 반입·CI 가상 merge 및 직접 복사·변조·삭제 기록 부활 차단 회귀 12개를 추가했다 → 전체 113테스트와 함께 검증할 것.
- supersedes 협업 검사 오탐과 merge commit 설정 대기는 해소했다 → PR27 최신 CI와 사람 리뷰를 확인한 뒤 반드시 merge commit으로 병합할 것.

## 남은 것
- 최신 push의 필수 CI 및 독립 사람 리뷰 1명·마지막 push 승인 확인. squash/rebase로 병합하면 조상 복구 목적을 잃는다.
- dev 병합 후 원격 main이 dev의 실제 조상인지 다시 확인. main 최종 릴리즈와 #24 처리 결정은 사용자의 별도 범위다.
