# codex/navigation-motion · easter721 · 2026-11-16
- claim: collab/active/codex--navigation-motion/claim.md

## 이벤트
- changed src/components/layout/search-header/search-header.tsx 검색 안내가 바뀔 때 세로 진입 효과를 적용함 → 검색 링크의 접근성 이름은 유지한다.
- touching src/features/article-detail/ui/detail-sheet/detail-sheet.tsx 상세 복귀 시 기존 시트의 진입 모션 재생 여부를 수정 중 → 관련 변경을 병합하기 전 작업 상태를 확인한다.
- touching src/components/feedback/list-navigation-pending.tsx 지도에서 목록으로 이동할 때 로딩 화면 구성을 수정할 예정 → 관련 변경을 병합하기 전 작업 상태를 확인한다.

## 남은 것
- 상세 복귀와 목록 진입의 변경을 구현하고 회귀 테스트와 브라우저 검증을 진행한다.
- 완료한 변경을 통합 PR에 반영하고 최종 저널을 남긴다.
