# codex/article-monthly-popularity · amazon · 2026-10-25
- claim: collab/active/codex--article-monthly-popularity/claim.md

## 이벤트
- added src/features/article-views/article-view-tracker.tsx 성공한 상세의 실제 활성 경로·보이는 탭에서만 익명 UUID POST 기록 → GET/prefetch로 조회수를 올리지 말 것.
- changed src/features/article-list/api/fetch-articles.ts 세 번째 선택 인자 recent/popular 추가, 기존 기본 recent 유지 → 목록과 더 보기는 popular, 검색·아카이브는 기존 계약 유지.
- rule 서버 POST /news/{article_id}/views 및 GET /news?sort=popular를 먼저 배포하고 NEWS_VIEWS_ALLOWED_ORIGINS에 정확한 프런트 origin 설정 → 서버 선배포 후 프런트 배포.
- done collab/active/codex--article-monthly-popularity/evidence/browser.mjs 로컬 Go 서버·실제 Chrome에서 중복 방문과 재시작 보존 검증 → 운영 쓰기는 수행하지 않았음.

## 검증
- 전체 Vitest 35파일·135테스트 통과(Chrome/로컬 서버 허용 환경). 제한 환경의 기존 브라우저 테스트 타임아웃은 허용 환경 재실행에서 해소.
- Next 프로덕션 빌드·타입 검사 통과. 실제 Chrome: 사전 조회 0, 첫 방문 1, 새로고침 1, 다른 브라우저 2, 인기순·재시작 후 2 유지.
- 신규 방문 추적 모듈 부재 RED와 인기순 요청 인자 누락 RED를 관찰한 뒤 구현. 기존 테스트의 라우터 mock에 usePathname 추가, 목록 예상 쿼리에 승인된 sort=popular 추가.

## 남은 것
- 운영 배포는 이번 요청 범위 밖. poem-news 서버 PR 먼저 반영 필요.
- 사건 중복 제거 작업은 별도 진행 중. 이번 조회수 API는 기사 ID 기준이며 사건 단위는 서버에서 방문자 합집합 연결 필요.
- 로컬 공통 훅이 참조하던 정확한 pinned Sobaya 런타임 경로를 복구했고 훅 검사를 생략하지 않음.
