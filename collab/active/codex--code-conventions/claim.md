branch: codex/code-conventions
owner: easter721
started: 2026-10-11
status: active
goal: refactor(frontend): 코드 작성 컨벤션과 가독성 통일
next: 기존 전체 테스트를 기준으로 컨벤션 문서·ESLint 검사와 제품 소스의 구획을 정리하고 소바야 gate·독립 리뷰·dev PR로 검증.
base: dev
---

## 범위
- 제품 TypeScript/TSX의 import·타입·상수·함수 구획과 함수 내부 흐름의 공백을 정리한다. 복잡한 레이아웃 조건은 의미 있는 이름으로 표현한다.
- 컨벤션 문서와 기존 ESLint의 자동 검사 가능한 규칙을 연결한다. 새 패키지·추상화·폴더 이동·제품 기능 변경은 하지 않는다.
- 기존 테스트·fixture·Test 명령은 그대로 유지한다. 사용자가 이번 컨벤션 정리와 PR 작성까지 승인했으며 PR은 dev 대상이다. GitHub 코멘트·머지는 별도 승인 전 하지 않는다.
