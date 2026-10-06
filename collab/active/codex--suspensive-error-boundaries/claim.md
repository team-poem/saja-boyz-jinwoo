---
branch: codex/suspensive-error-boundaries
owner: easter721
started: 2026-10-06
status: done
goal: feat(errors): Suspensive 오류 경계와 재시도 적용
next: 구현·gate·독립 리뷰 완료; dev 대상 PR 외부 리뷰 대기
base: dev
---

## 메모
- dev dc020b9에서 시작한다. PR #4의 이미지 대체 처리를 보존한다.
- Suspensive 3.21.4와 shouldCatch 타입 추론을 도입한다.
- 구현은 Sobaya 정확 입력 승인 이후 진행한다.

- 승인 항목3개를 Sobaya로 구현하고 서버 retry를 보완했다. 전체26개 테스트·타입·빌드·production 브라우저 확인·독립 소스 리뷰 완료.
