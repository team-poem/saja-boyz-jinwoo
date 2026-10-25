# PR45 정상 기사 적응형 시트 실제 QA 결과

- 제품 source: 9f33c546c1ef5894d3351e7bf0496f1b8278dfc1
- production Build ID: 3az_4QQ5E5r7rXctQkgo6
- 실제 실행: 4시나리오, 120 checks 통과, false0, 미완료0, pageErrors0
- PNG11장, 실제 Naver raster tile200 응답23건
- 합성 정상 기사15개/지역1·2·12건, 고정 합성 브라우저 위치
- SDK 스텁·SDK/제품 state/observer 조작 없음
- 부모 전체151 테스트 결과와 이 브라우저120 checks는 별도 집계

## 정상 기사 높이와 읽기 흐름
393×852, expanded70dvh 상한596.4px에서:
- 짧음451.5px / 중간490.5px / 아주 긴 본문596.390625px
- 짧음·중간: reading 하단 여백0px
- 긴 본문: reading scrollHeight2621px/client503px, 실제 공유 버튼까지 내부 스크롤
- 긴 본문 맨 아래 도달 후 여백-0.109375px(소수점 반올림 범위)
- 수동 공유 URL 추가:451.5→533.5px로 자연스럽게82px 증가
- 높이320px의 모바일/데스크톱 viewport: 실제 시트224px(70%) 이내,
  수동 URL 입력까지 도달·실제 hit 확인

## 실제 지도와 복귀
- 실제 SDK/타일에서1/2/12건 숫자 원 모두 관측
- 정상 단일 기사와2/12건 선택→상세→닫기 흐름 통과
- 12건 선택 시트에서10번째 링크를 읽은 뒤1440×500 resize:
  같은 링크 DOM·포커스 유지
- 상세 닫기 후 expanded 상태와 scrollTop3319→3319 복원
- 최종 선택 닫기 후 최신 마커 포커스·inert/스크롤 lock 해제
- 같은 지도 컨텍스트의 SDK script1개 유지
- 기존 전체 필터의 낮은 화면90dvh 상한·적용 버튼 hit·닫기 포커스 복귀 통과

## NoJS/SEO
- NoJS 긴 본문 실제 CSS 내부 스크롤, 원문 링크의 clip 안 가시성 및 elementFromPoint hit 통과
- 정상 기사 title/canonical/index 유지
- 실제 upstream404의 HTTP404/noindex/가시 안내/지도 퇴로/원주소와 쿼리 유지
- 앱 origin 및 합성 API write 요청0
- SDK가 보내는 외부 telemetry POST1건은
  https://kr-col-ext.nelo.navercorp.com/_store 로 분리 기록

## 초기 실패와 진단 보존
첫 실행은49 checks 중3 false/2시나리오 미완료였으며 first-run/에 원본 전체를 보존했다.
1. 먼저 시작된 fixture 프로세스가 수정 전 evidence.text를 메모리에 보유해15건 모두 API검증 실패.
   API 재시작 뒤 실제 응답15/15가 제목과 일치함을 확인.
2. NoJS에서 Playwright scrollIntoViewIfNeeded의 stable 대기가 timeout.
   실제 native End/wheel 입력에서는 scrollTop2117, 원문 y753.109375/h15,
   clip 안 가시성·hit가 확인되고 bbox4회가 동일했다.
   최종 실행은 실제 입력과 동일한 원문 가시성/hit 기대를 유지했다.
3. 외부 SDK telemetry를 앱 write로 분류했던 QA 기록을 origin 기준으로 정정했다.
   외부 요청 자체도 최종 report에 남아 있다.

최종 원본:
- final/report.json
- final/manifest.json
- final/fixture-observations.json
- final/app/*.png

초기/진단 원본:
- first-run/report.json 및 app/*.png
- running-fixture-diagnostic.json
- restarted-fixture-diagnostic.json
- nojs-diagnostic/report.json 및 source-visible-native-scroll.png

PNG의 붉은 outline은 실제 키보드/읽기 영역 포커스 표시다.
브라우저는 모든 실행의 finally에서 종료했다. 앱·fixture 서버는 부모 소유로 유지했다.
