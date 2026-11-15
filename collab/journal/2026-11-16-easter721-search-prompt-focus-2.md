# codex/search-prompt-focus · easter721 · 2026-11-16
- claim: collab/active/codex--search-prompt-focus/claim.md

## 이벤트
- changed src/features/search/ui/search-form/search-form.tsx 빈 검색 입력 안내를 롤링하고 실제 입력값·IME 조합 중에는 숨김 → 검색 제출·초기화·접근성 이름과 움직임 줄이기 동작을 유지할 것.
- changed src/app/incidents/[id]/detail-share.tsx 직접 복사용 링크 입력의 포커스 윤곽을 필드에 맞춤 → 공유·클립보드 실패 복구를 유지할 것.
- supersedes collab/journal/2026-11-16-easter721-search-prompt-focus-start.md 검색 안내와 공유 입력 구현 및 개별 검증 완료, 최종 통합 전체 검사는 남아 있음.

## 남은 것
- PR 68에 소스·회귀 테스트를 통합한 뒤 전체 테스트와 종료 코드, 원격 검사를 확인한다. 변경 전 전체 311개와 정리 후 선택 테스트·Webpack 빌드·Chrome 검증은 통과했다.
- 정리 후 원래 `src/app/globals.css`와 차이는 없다. 실제 스크린리더 음성 출력은 시험하지 않았다.
- 최종 통합 검증 전이므로 claim은 active를 유지하고 `spec.md`, `failed-test.md`는 보관하지 않는다.
