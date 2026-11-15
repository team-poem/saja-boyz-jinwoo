---
branch: codex/period-query-consistency
owner: easter721
started: 2026-11-16
status: active
goal: fix(list): 중복 기간 쿼리의 선택 표시 일치
next: 기간 입력의 중복값을 서버와 클라이언트에서 같은 기준으로 처리하고 회귀 검증
base: codex/adaptive-skeletons
---

## 메모
- 기존 PR 68 위에서 기간 쿼리 해석만 수정한다.
- 분류 데이터 및 검색어 처리 동작은 변경하지 않는다.
