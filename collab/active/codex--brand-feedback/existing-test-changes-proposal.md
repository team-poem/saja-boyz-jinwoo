# 기존 테스트3개 교체

사용자가 삭제를 요청한 지도 출처/기사 위치 보기 UI 계약만 변경한다. 다른118개 테스트 본문과 fixture는 유지한다. 정확 diff와 제안 전체 파일은 proposed-tests에 있다.

1. `shows all article positions only on request without overriding the saved viewport` → `mapRemovedOverviewControlKeepsMultiArticleViewportUntouched`: 서로 다른2기사 마커를 유지하고, 삭제한 버튼/출처가 없으며 자동 fit/center/zoom이 발생하지 않는지 검증한다. 삭제된 버튼 클릭 동작을 유지하는 검사는 더는 맞지 않는다.
2. `attributes the representative coordinate catalog beside the region marker summary` → `mapCoordinateSourceLivesInServiceInfoWithoutMapOverlay`: 지도 출처는 없어지고 서비스 안내에 실제 출처 링크가 존재하며, 마커를 선택했을 때 대표 위치 주의 문구가 그대로인지 확인한다.
3. `centers a single unique article position instead of sending a degenerate array to fitBounds` → `mapRemovedOverviewControlDoesNotRecenterSingleOrDuplicatePositions`: 단일/중복 좌표 모두 마커1개를 유지하고 제거된 컨트롤이 없으며 center/zoom/fitBounds를 호출하지 않는지 확인한다. 기존 각 fixture 정리 순서는 유지한다.

등록 baseline에서는 위3개만 분리한다. 신규 위치 재시도1개와 교체3개는 소바야가 정확 본문으로 복원한다. 121개 → baseline118개 → 최종122개. skip·mock 변경·전체 명령 변경 없이 진행한다.
