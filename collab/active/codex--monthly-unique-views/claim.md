---
branch: codex/monthly-unique-views
owner: amazon
started: 2026-10-25
status: active
goal: feat(news): 최근 30일 고유 조회수 기록과 인기순 목록 연결
next: 별도 조회 기록 컴포넌트·루트 연결·목록 API 순서 연결
base: dev
---

## 메모
- 사용자가 최근 30일 고유 방문자 순 노출과 구현·PR을 요청했다.
- poem-news의 월간 조회 API PR과 함께 검증한다. 브라우저의 상세 진입만 기록하고 GET/prefetch는 집계하지 않는다.
- 기존 fetchArticleList, loadArticlePage, RouteShell을 재사용한다. 새 상세/목록 UI를 만들지 않는다.
- Solpi PR45에서 현재 편집 중인 detail-sheet.tsx와 proxy-navigation.test.ts는 작업 범위에 포함하지 않는다.
