# Figma 화면 정렬·상세 회귀 검증

검증일: 2026-10-24. 합성 기사와 고정 테스트 좌표만 사용했고 실제 제보 POST는 보내지 않았다. 스텁 검사와 실제 Naver SDK 검사를 구분했다. 공개 SDK 식별자는 JSON 보고서에서 생략했다.

| 범위 | 결과 | 근거 |
| --- | --- | --- |
| 소바야 팀 pin 0d05121 전체 gate | 135통과·실패0·생략0, Format/Lint·소스/Git 불변 검사 통과 | [결과](sobaya-suite.json) |
| 전체 browse 회귀 | 17시나리오·178검증 통과 | [보고서](browse/report.json) |
| 실제 production NextLink·12건 복귀 | 7/7 통과, RSC GET1회·무응답5.375초 | [보고서](regressions/report.json) |
| 4개 viewport 디자인 대조 | 116/116 통과, PNG36개, pageerror0 | [보고서](design/report.json), [치수](design/audit.md) |
| 실제 Naver SDK·타일·숫자 원 | 17/17 통과, 타일200·오류0, 고정 테스트 위치 | [보고서](real-map/report.json) |
| 최종 제보 키보드 Tab | 46개 모두 가림0·pageerror0, 임시 CSS 없음 | [보고서](keyboard/report.json) |
| 독립 코드 리뷰 | 날짜 대비 보완 후 남은 수정 요청 없음 | [리뷰](independent-review.md) |

최종 production 빌드 `9Ou5Qm-kpoM0Vi-Klf4QG`는 TypeScript 포함 성공했다. 지도·상세 회귀와 디자인 자료는 후보2 `aLz3Fa4JK5XpPPpjv5k2W`까지 확인했으며, 이후 변경은 제보의 scroll-margin 대상을 버튼까지 넓힌 것뿐이다. 최종46개 Tab 검사는 후보3 소스 그대로 재실행했다. 전체 browse 원본은 같은 상세 동작을 가진 첫 후보에서 수집했다.

## 전후 확인

PR44 기준 실제 NextLink는 기사 API2회·무응답10.420초였고, 그룹의 10번째 기사에서 돌아오면 확장803→456·스크롤1917→0·포커스가 닫기로 이동했다. [수정 전 기록](before/report.json)과 [수정 후 기록](regressions/report.json)을 함께 보존했다. 현재는 확장803·스크롤1917·원래10번째 링크 포커스가 유지된다.

작은 제보 화면의 제목은 고정 헤더에 가려진 y0~41에서 y80~121로 복구됐다. 첨부 삭제 버튼도 실제 Tab 이동에서 전부 보이며, input/select/textarea/button에만 scroll-margin과 safe-area를 적용한다.

실제 지도에서 같은 지역1·2건은38.4px,12건은72px다. 서로 다른 지역 원이 겹쳐 합쳐진10건 미만 집계는48px다. 같은 지역2건과 서로 다른 지역의 겹침2건을 혼동하지 않는다. 숫자 원의 색·폰트·테두리도 실제SDK DOM에서 확인했다.

## 대표 화면

- [실제 Naver 홈](real-map/real-naver-home-fixed-qa-location-synthetic-articles.png)
- [검색 시작](design/393x852-search-empty.png) / [최근 검색](design/393x852-search-recent.png) / [검색 결과](design/393x852-search-results.png)
- [목록](design/393x852-list-top.png) / [스크롤한 목록](design/393x852-list-scrolled.png)
- [제보](design/393x852-report-top.png) / [작은 화면 제목 포커스](design/320x568-report-focus-title.png)
- 상세·JS 없는 공유 주소·실제404는 browse/에 기록했다.

## 범위와 재현

실제 모바일 OS 키보드·위치 권한 시스템 창은 검사하지 않았다. Naver 실지도 검사는 고정 합성 좌표를 허용했으며 개인 위치를 요청하지 않았다. Google SDK는 아직 연결하지 않았고 교체 경계는 docs/architecture.md에 정리했다.

CI 회귀는 src/proxy-navigation.test.ts와 src/features/map/ui/map-home/map-articles.test.ts에 있으며 전체 선언 명령으로 실행한다. scenario-sources/는 검증 당시 브라우저 스크립트를 .txt로 보존한 기록이다. 원래 임시 디렉터리 경로가 포함되므로 재사용할 때 .txt를 제거하고 QA_APP/POLISH_APP·출력 경로·SDK 스텁 위치를 해당 환경에 맞춰야 한다. 자동 제품 코드로 실행하지 않는다. 실제 Naver 검사에는 유효한 공개 지도 설정이 필요하다.

중간 전체 검사에서 기존 harness_loop가 한 번 실패했다. 테스트/하네스/시간 제한을 수정하지 않았으며 분리 검사는74초에 통과했고, 다른 QA 프로세스를 종료한 최종 소바야 gate에서 전체135개가 모두 통과했다. 기존 ESLint 경고3개는 그대로이며 신규 오류/경고는 없다.
