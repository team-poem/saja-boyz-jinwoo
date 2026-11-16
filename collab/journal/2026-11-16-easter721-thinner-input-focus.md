# codex/thinner-input-focus · easter721 · 2026-11-16
- claim: collab/active/codex--thinner-input-focus/claim.md

## 이벤트
- changed src/features/search/ui/search-form/search-form.tsx 검색 입력 포커스는 평상시 중립색 경계와 구분되는 빨간 1px 윤곽 한 겹이다 → PR68에 반영할 때 기존 검색 동작과 버튼 포커스를 유지한다.
- changed src/app/report/page.tsx 제보 입력과 첨부는 빨간 1px 윤곽을 표시하며 오류 포커스는 기존 오류선과 대비되는 짙은 빨강이다 → 오류 배경과 키보드 접근성을 유지한다.
- changed src/app/incidents/[id]/detail-share.tsx 공유 링크 입력도 빨간 1px 윤곽 한 겹을 표시한다 → 직접 복사 폴백을 유지한다.

## 남은 것
- 별도 브랜치의 제품·테스트 변경을 PR68에 반영하고 최신 동료 편집 상태 및 PR 검사를 확인한다. 이 브랜치에서는 PR68을 변경하지 않았다.
- 소바야 실행 당시 관련 테스트에 `thinFocus:` 접두어를 썼다가 GREEN 뒤 원래 테스트 이름으로 돌렸다. 보관한 계획은 당시 실행 기록을 보존한다.
- 전체 테스트와 포맷·린트는 소바야 runner의 GREEN에서 통과했고 린트에는 기존 경고 3개가 있었다. 이후 오류 대비 테스트와 프로덕션 빌드를 확인했고, 테스트 이름을 복구한 뒤 포커스 관련 테스트 4개가 통과했다.
