---
branch: codex/recover-main-ancestry
owner: amazon
started: 2026-10-16
status: active
goal: fix(release): 최신 main 이력을 dev에 병합해 분기 복구
next: 정상 main merge 반입의 협업 검사 오탐을 회귀 테스트로 수정하고 PR27 CI 검증
base: dev
---

## 범위

- 시작 dev a8b7809b24572056a9b29f1f1212f785693030b2, main 4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086.
- #26과 #25가 squash 병합되어 제품 내용은 같지만 main 조상이 dev에 연결되지 않았다. 최신 두 브랜치를 정상 merge하며 양쪽 협업 기록도 보존한다.
- main에만 있는 collab 7개 파일과 dev에만 있는 131개 파일을 모두 보존한다. 같은 경로의 내용 차이는 없다. 제품·명세·설정은 변경하지 않는다.
- 정상 merge commit이 필요하다. squash/rebase는 복구 목적을 달성하지 못한다. 복구 PR은 dev 대상 draft로 준비하고 사람 리뷰·필수 CI를 유지한다.
- 저장소 allow_merge_commit 활성화 요청은 자동 승인 심사가 전달 승인 근거를 인정하지 않아 거부했다. 재시도나 우회 없이 별도 직접 승인을 기다린다. dev 선형 이력 해제는 기존 상태대로 유지한다.
- main 최종 병합, #24 닫기, #25 변경, 배포, 강제 push, 관리자 강제 merge, 자기 승인은 하지 않는다.

## 협업 검사 수정 (2026-10-16 직접 요청)

- 사용자의 `해결해` 요청에 따라 scripts/collab.sh와 tests/hooks.sh에서 정상 main merge로 들어온 동료 기록의 오탐을 수정한다.
- 보호 원격 이력이 실제 병합되었고 원본 경로·mode·blob이 보존된 추가만 허용한다. 직접 복사·수정·삭제 및 신뢰하지 않는 브랜치 반입은 계속 차단한다.
- 저장소 merge commit은 사용자가 활성화했다. PR27은 ready 상태이며 리뷰 1명과 최신 push 승인 조건을 유지한다.
- 다음 검증 시나리오: 정상 merge 반입, 직접 복사, 비보호 브랜치 병합, 병합 후 내용·mode 변조, 기존 기록 수정·삭제, 원격 전진, CI 가상 merge.
