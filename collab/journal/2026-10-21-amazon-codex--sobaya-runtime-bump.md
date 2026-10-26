# codex/sobaya-runtime-bump · amazon · 2026-10-21
- claim: collab/active/codex--sobaya-runtime-bump/claim.md

## 이벤트
- dep harness/sobaya.lock Sobaya를 `83af28db`에서 PR #15에 포함되어 병합된 `0d051213`으로 갱신 → 검증한 소스 버전과 관리 pre-commit 훅을 같은 버전에 맞출 것.
- rule AGENTS.md 시나리오 목록에서 테스트 하나씩 RED → GREEN → 필요한 리팩터링을 진행하고 기능 사이에 회고 → 테스트별 승인과 필수 독립 리뷰 없이 제품 의도 안에서 다음 테스트를 선택할 것.
- changed harness/config.sh 명시한 환경변수 다음으로 clone-local `sobaya.sourceRoot`를 사용 → 개인 경로를 추적 파일에 넣지 말고 Git 설정으로 선택할 것.
- changed harness/join.sh 합류 시 자동 pull·재설치를 없애 보관한 기능 문서를 보존 → 기존 설치는 `harness/sobaya/RULES.md`에 따라 소스·pin·관리 훅을 점검하고 `.githooks` 연결을 유지할 것.
- rule CONTRIBUTING.md 기존 설치의 legacy attach/sync/update 안내를 제거 → 문서와 CI 알림의 유지보수 절차를 따를 것.

## 검증
- Node 24.19.0에서 전체 Vitest 29개 파일·123개 테스트 통과. hooks/loop/sobaya 셸 스위트와 실제 브라우저 fixture 포함.
- 기본 Turbopack production build, 타입 검사, 스타일 검사, diff 검사 통과. 외부 node_modules 심링크는 Turbopack이 거부해 같은 lockfile의 의존성을 이 worktree 안에 복사한 뒤 기본 빌드를 통과시켰다.
- pre-commit의 format/lint 통과. 기존 코드의 unused-variable 경고 3개는 남아 있으며 오류는 없다.
- 실제 resolver·pin·공통 Git pre-commit 모두 `0d051213`을 사용하며 바깥 `core.hooksPath=.githooks` 유지 확인.
- 독립 리뷰에서 발견한 기존 업데이트 안내의 충돌을 README·기여 가이드·사용 가이드·도움말·CI 알림에서 해결했다.

## 남은 것
- dev 대상 PR 리뷰와 병합. 다른 구성원은 자신의 소스 경로와 훅을 확인해야 한다. 이 PR은 타인의 개인 Git 설정을 변경하지 않는다.
- 원래 작업 체크아웃의 진행 중 변경과 기능 문서는 그대로 보존했다. 앱 제품 코드 변경은 없다.

## 배운 점
- 버전 pin만 바꾸면 예전 합류·갱신 안내가 새 흐름과 충돌한다. 이번 갱신에서는 실제 연결 경로와 사용자 안내를 함께 검증했다.
