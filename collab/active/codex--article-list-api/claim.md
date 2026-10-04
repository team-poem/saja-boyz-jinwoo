---
branch: codex/article-list-api
owner: amazon
started: 2026-10-04
status: active
goal: feat(incidents): 기사 API를 사건 목록 페이지에 연결
next: src/app/incidents/page.tsx, src/app/incidents/loading.tsx, src/features/article-list/
base: codex/incident-list
---

## 메모
- 기사 1개를 사건 1개로 표시한다는 사용자 결정을 반영한다.
- PR #2의 검증된 목록 컴포넌트 위에 쌓는 후속 브랜치다. 기존 승인 입력과 완료 기록은 보존한다.
- 기사 발행 시각을 사건 발생 시각으로 바꾸지 않고, API에 없는 분류·상태·위치·타임라인을 만들지 않는다.
- 공용 필터/UI, 상세 페이지, 제보 페이지는 이번 범위에서 제외한다.
- 새 라우트/API 명세·정확한 테스트와 지원 코드 검토안을 준비하고, 승인 기준선 기록 뒤 구현한다.
