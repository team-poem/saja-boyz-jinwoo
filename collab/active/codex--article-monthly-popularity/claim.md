---
branch: codex/article-monthly-popularity
owner: amazon
started: 2026-10-25
status: active
goal: feat(news): 최근 30일 고유 조회수 기록과 인기순 목록 연결
next: PR46에 최신 dev를 병합해 상세·목록 충돌을 해결하고 전체 검증 후 반영
base: dev
---

## 메모
- 사용자가 최근 30일 고유 방문자 순 노출과 구현·PR을 요청했다.
- poem-news PR11과 함께 검증. 실제 상세 진입만 기록하고 GET/prefetch는 집계하지 않는다.
- 기존 작업의 제품 소스·테스트는 검증된 패치로 보존하고, 중복 claim 커밋 없이 이 브랜치에 옮긴다.
- Solpi의 현재 detail-sheet.tsx·proxy-navigation.test.ts 편집은 건드리지 않는다.
- 2026-10-25 사용자의 충돌 해결 요청으로 재개. 현재 dev의 완료된 상세·목록 UI와 조회수 추적/인기순을 함께 보존한다. 운영 배포는 이번 범위가 아니다.
