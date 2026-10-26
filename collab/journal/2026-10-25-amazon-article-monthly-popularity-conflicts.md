# codex/article-monthly-popularity · amazon · 2026-10-25
- claim: collab/active/codex--article-monthly-popularity/claim.md

## 이벤트
- changed src/app/incidents/[id]/page.tsx 최신 dev의 IconText·기본 접힘 상세 UI에 성공한 상세의 ArticleViewTracker만 유지 → 기본 높이·공유 자연 흐름·AI 안내·오류/복귀 탐색을 되돌리지 말 것.
- changed src/app/(browse)/@background/incidents/page.tsx 제거된 아카이브/안내 행은 복구하지 않고 인기순 API와 접근성 정렬 설명을 유지 → 목록/추가 조회의 popular와 검색/아카이브의 기존 정렬 구분을 유지할 것.
- changed src/app/incidents/article-detail-sheet.test.ts·article-detail.test.ts 최신 useRouter와 조회수 추적의 usePathname mock을 함께 유지 → 어느 한쪽 mock이나 기존 UI assertion을 제거하지 말 것.
- done PR46 최신 dev 2df69031 충돌 해결, 전체 153테스트·타입·프로덕션 빌드·포맷 통과 및 린트 오류 0 → 머지 전 GitHub의 현재 head 검사 결과를 확인할 것.

## 남은 것
- 서버 월간 조회수 API·정확한 CORS origin·Traefik POST 경로 선배포 확인 후 프런트를 배포한다. 이번 충돌 해결에서는 운영 배포와 PR 머지를 실행하지 않았다.
- Node 24.19.0·pnpm 10.34.6을 사용했다. 전역 pnpm의 자동 버전 전환 대신 설치된 동일 버전의 실행 경로를 사용했으며 저장소 패키지·의존성은 변경하지 않았다.
- 린트의 기존 미사용 변수 경고 3개는 이번 충돌 해결 범위 밖이다.
