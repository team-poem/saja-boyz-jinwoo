# codex/list-period-filter · easter721 · 2026-11-16

- claim: collab/active/codex--list-period-filter/claim.md

## 이벤트

- supersedes collab/journal/2026-11-16-easter721-list-period-filter.md 기간 요청만 구현했던 중간 상태는 이후 목록 UI와 응답 확인까지 확장됐다.
- changed src/features/article-list/api/fetch-articles.ts 목록 기간 요청은 `24h`·`7d`·`30d`와 일치하는 `X-News-Period` 응답만 사용한다 → 서버 배포 전 기간 선택을 무조건 성공으로 간주하지 말 것.
- changed src/features/article-list/ui/article-list/ 선택 기간의 첫 페이지·추가 페이지·빈 결과를 처리한다 → 기간이 바뀌면 이전 페이지의 결과와 offset을 재사용하지 말 것.
- changed src/features/article-detail/ui/article-route-host/article-route-host.tsx 목록 상세 복귀에 선택한 기간 query를 보존한다 → 상세 복귀 경로를 바꿀 때 query와 포커스 복원을 함께 확인할 것.

## 남은 것

- 카테고리는 서버 기사에 신뢰할 수 있는 분류값이 없어 비활성 상태다. Level 1·2·3 데이터 재정리는 이번 작업에서 다루지 않았다.
- 서버 기간 응답 표식이 실제 운영 프록시를 통과하는지는 배포 후 확인해야 한다.
- 기간 브랜치의 전체 Vitest 305개가 통과했다. 통합 PR 브랜치 `9302e84`에서 Webpack 빌드와 Chrome 393×852의 기간 선택·추가 페이지·상세 복귀·미지원 오류/재시도·0건 안내를 확인했다.
- 통합 브랜치 `30bd0a2`에서 Vitest 64개 파일·312개 테스트가 종료 코드 0으로 통과했다. 최신 PR68 소스를 반영한 이 브랜치 `966c000`에서 소바야 gate의 전체 테스트 312개가 통과했고, 읽기 전용 review에서 수정이 필요한 구체적인 결함은 발견되지 않았다.
