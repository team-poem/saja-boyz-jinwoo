branch: codex/keyword-search
owner: easter721
started: 2026-10-07
status: active
goal: feat(search): Figma 기반 기사 키워드 검색 구현
next: Figma 검색 2개 화면 기준 명세·테스트 초안 작성 및 승인 후 sobaya 실행
base: dev
---
## 범위
- 검색 입력/URL q/서버 keyword/기존 ArticleList 결과와 초기·로딩·빈 결과·오류·재시도.
- Figma 11:1797 및 11:1864의 검색 헤더·간격·색상 참조. 가짜 주소·사건 상태·최근 검색 이력은 만들지 않는다.
- 기존 목록 API 호출과 기존 28테스트 유지. deps 추가 없음.
- 예정 수정: src/app/search/, src/features/search/, src/features/article-list/api/fetch-articles.ts, 검색 경로의 공용 헤더 처리 및 해당 신규 테스트.
- amazon과 동일 파일 작업이 확인되면 중단·조율. GitHub 코멘트는 사용자 승인 후에만 게시.
