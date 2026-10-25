# 최신 시트 변경 읽기 리뷰

독립 에이전트가 detail-sheet·detail-image·공통 ArticleImage·map-article-sheet·map-carousel-image의 다섯 파일을 읽고 확정 회귀를 찾지 못했다. 이 기록은 전체 테스트나 브라우저 실행 결과를 대신하지 않는다.

- 모든 진입의 기본 접힘과 내용 auto/53.52dvh 상한, 수동 확장의 실제 viewport−49px/safe-top 높이를 확인했다.
- 공유 앞 mt-auto가 없고, 사용자가 짧은 기사를 수동 확장했을 때의 남는 공간은 명시적 확장 정책에 따른다.
- NoJS 본문·내부 스크롤은 유지하며 포커스·선택 상태·높이 observer의 기존 로직은 바꾸지 않았다.
- 안내는 상세/선택 시트에만 이미지 아래 표시하고 목록/carousel에서는 제거했다. 실패·이미지 없음에는 캡션이 없고 선택 시트 스켈레톤은80px 이미지 wrapper 안에 제한된다.
