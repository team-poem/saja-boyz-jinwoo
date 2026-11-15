# codex/navigation-motion · easter721 · 2026-11-16
- claim: collab/active/codex--navigation-motion/claim.md

## 이벤트
- changed src/components/layout/search-header/search-header.tsx 검색 안내 변경 시 세로 진입 모션을 사용한다 → 움직임 줄이기 설정과 검색 링크의 접근성 이름을 유지한다.
- changed src/features/article-detail/ui/detail-sheet/detail-sheet.tsx 지도 미리보기는 처음 열 때만 진입 모션을 재생한다 → 상세에서 돌아올 때 시트 상태와 포커스 복원을 유지한다.
- changed src/components/feedback/list-navigation-pending.tsx 목록 진입 대기 시 전체 목록 셸을 표시하고 배경과 복제 컨트롤을 잠근다 → 상태 안내 하나와 도착 화면 포커스를 유지한다.

## 남은 것
- PR 68의 최종 통합 검사와 리뷰 상태를 확인한다.
- 실제 스크린리더의 음성 출력은 확인하지 않았다. 목록 대기 중 URL은 `/`이며 이동 완료 후 `/incidents`로 바뀐다.
- 앞선 두 gate는 테스트 308개가 통과했지만 명령이 비정상 종료됐다. 후속 테스트 안정화 반영 후 `756195b`에서 gate가 테스트 312개 통과로 종료됐다. 별도 리뷰어의 자체 전체 테스트는 읽기 전용 환경 제한으로 완료하지 못했으며 리뷰 시작 전 외부 gate는 통과했다.
