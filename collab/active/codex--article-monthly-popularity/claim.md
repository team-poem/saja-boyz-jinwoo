---
branch: codex/article-monthly-popularity
owner: amazon
started: 2026-10-25
status: done
goal: feat(news): 최근 30일 고유 조회수 기록과 인기순 목록 연결
next: 서버 PR11 선배포 후 프런트 배포
base: dev
---

## 메모
- 사용자가 최근 30일 고유 방문자 순 노출과 구현·PR을 요청했다.
- poem-news PR11과 함께 검증. 실제 상세 진입만 기록하고 GET/prefetch는 집계하지 않는다.
- 기존 작업의 제품 소스·테스트는 검증된 패치로 보존하고, 중복 claim 커밋 없이 이 브랜치에 옮긴다.
- Solpi의 현재 detail-sheet.tsx·proxy-navigation.test.ts 편집은 건드리지 않는다.
