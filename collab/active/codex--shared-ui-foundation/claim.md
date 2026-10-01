---
branch: codex/shared-ui-foundation
owner: easter721
started: 2026-10-01
status: active
goal: feat(ui): Figma 공용 UI와 협업 구현 계약 추가
next: src/app/globals.css src/components/layout/app-shell.tsx src/features/incidents/
base:
---

## 메모
- 사용자 승인 분담: easter721은 공용 UI·데이터 계약 선행 PR 후 지도·검색·필터·마커·사건 바텀시트 구현.
- amazon은 사건 목록(/incidents)·상세(/incidents/[id])·공유·제보(/report)와 화면별 CSS 담당. 아직 상대의 작업 시작은 확인되지 않음.
- 이 선행 PR은 공용 검색 헤더·필터·배지·하단 메뉴·안정된 사건 계약을 제공. 지도 SDK·뉴스 API·제보 저장과 최종 화면 구현은 후속 범위.
- sobaya 미연결 상태이므로 직접 구현 후 pnpm 검사 루프를 collab.sh run으로 실행.
