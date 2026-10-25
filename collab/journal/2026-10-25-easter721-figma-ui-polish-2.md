# codex/figma-ui-polish · easter721 · 2026-10-25
- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- changed src/features/map/model/map-display-groups.ts 현재 viewport 안 최종 그룹의 고유 기사 수로 diameter를 계산하고 병합 후 재계산 → 특정 숫자 버킷을 복구하지 말고 실제 최종 지름으로 충돌·렌더·anchor를 함께 유지할 것
- changed src/features/map/ui/map-home/map-home.tsx Naver 이동 pane offset을 현재 카메라 중심과 canvas 반폭/반높이로 정규화 → raw offset을 외부 viewport 원점과 같다고 가정하지 말고 실제 pan·resize를 확인할 것
- changed src/features/map/ui/map-home/map-home.tsx 대표점과 기사 ID 집합이 그대로인 선택은 시트·읽던 위치·포커스를 유지하고 닫힌 commit 뒤 최신 마커로 복귀 → 조기 focus나 시트 unmount로 선택을 초기화하지 말 것
- rule docs/figma-analysis.md 사용자 후속 요청으로 과거38.4/48/72 고정 구간을 폐기하고 현재 분포의38.4–88px 상대 크기를 적용 → 예시1/2/12를 고정 크기표로 해석하지 말 것
- added collab/active/codex--figma-ui-polish/evidence/relative-circles 실제 지도71개·캡처7장과 전체146개 및3회 RED→GREEN 기록 → 초기 이동 실패와 최종 결과를 구분하고 새 원 크기는 최신 캡처를 확인할 것
- done src/features/map/ui/map-home/map-home.tsx 상대 숫자 원 보완과 선택·SDK 회귀 검증 완료 → 같은 영역의 후속 작업은 PR45 상태와 최신 dev를 먼저 확인할 것

## 남은 것
- PR45는 사용자가 정한 Draft 상태를 유지한다. 댓글·리뷰 요청·승인·머지는 하지 않았다. PR 리뷰와 dev/운영 배포는 후속이다.
- 실제 Naver 타일·합성 기사38건·고정 합성 위치로 검증했다. 모바일 OS/권한 창 실기기는 별도 확인 대상이다.
- 이전 아이콘·파비콘·SEO 검증은 기존 기록을 유지한다. 새 제품 변경은 지도 크기/viewport/선택 보존에 한정한다.
- 초기 raw pane offset 후보는 실제 pan6.5초 뒤에도 화면 밖8을 포함하는 실패가 있었다. 카메라 중심 정규화 후 같은 실제 동작71개와 전체146개가 통과했다. 초기 결과는 별도 보존했다.
- 소바야 엔진·의존성·동료 claim·보호 브랜치를 수정하지 않았다. 내 원본 dev checkout의 next-env.d.ts 사용자 변경을 보존했다.
