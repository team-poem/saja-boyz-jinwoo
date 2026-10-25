# Figma 기본·드래그 확장 시트와 AI 안내 · 최종 검증

제품 소스 `6c6c23b523079626d863c65446d2a8290df66737`, production Build `XqX4ZJdwETDiiPENL9Q0h`를 검증했다. 이후 변경은 검증 자료·계획 보관·인수인계만 포함한다.

## 최종 동작

지도·목록·검색·직접 공유 주소의 정상 기사 상세는 모두 기본 접힘이다. `height:auto`와 최대53.52dvh로 내용만큼 열리고, 사용자가 실제 핸들을 위로 드래그하면 상단49px/safe-area를 남긴 near-full 높이로 확장된다. 아래 드래그는 기본 상태로 돌아간다. 긴 본문은 내부만 스크롤하고 공유 앞 간격은16px이며 mt-auto로 밀어내지 않는다.

개인 계정으로 다시 조회한 Figma [기본19:2865](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2865)/504:441은852px 화면에서456px, [확장504:269](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=504-269)/504:502는 상단49px를 남긴803px이다. p16/gap16/반경24/이미지140/공유48과 기존 로컬 자산을 유지한다. 과거70/80dvh 후보는 현재 정책의 근거가 아니다.

“AI로 생성된 이미지입니다.”는 상세(10px/15px)·지도 선택(9px/12px) 시트의 실제 이미지 아래에만 작게 표시한다. 지도 하단 카드와 일반 목록에는 배지가 없다. 이미지 없음/실패에서는 캡션도 숨기고 이미지 로딩 영역은 캡션을 덮지 않는다.

## 소바야 RED→GREEN

[사이클](tdd-cycle.json) · [RED](red.json) · [집중3개 GREEN](focused-green.json) · [전체151개](gate151.json) · [읽기 리뷰](independent-review.md).

기존 기본 expanded=true/half 초과·수동 확장70 제한·카드 배지·이전 문구를 실제 RED로 확인하고 최종 정책을 구현했다. 최종151개 실패0·생략0, gate exit0·포맷·린트·소스/Git 불변 검사와 production 빌드·타입 검사를 통과했다. 기존 ESLint 경고3개 외 새 경고는 없다. 기존 이미지 성공/실패·URL 교체·캐시/크기·API·공유·포커스·404 검증은 유지했다.

중복 carousel 검사를 dummy SDK fixture에서 시도한 첫 실패와 교체된 DOM을 관찰해0치수를 얻은 첫 측정은 별도 JSON으로 보존한다. 기존 카드 unit과 실제 SDK QA로 요구를 유지하고 유효한 현재 DOM을 읽도록 관찰만 정정했다. 높이 기대값을 낮추지 않았다.

## 실제 Chrome · 같은 최종 빌드

[보고서](browser-report.json) · [캡처 목록](browser-manifest.json) · [PNG SHA256](capture-sha256.json) · [실행 스크립트](browser-qa.mjs.txt) · [합성 API](browser-fixture.mjs.txt) · [빌드](production-build.txt) · [서버 정리](cleanup.json).

4개 시나리오·224개 검사 모두 통과, 실패/미완료0·pageErrors0·대표 PNG14장이다. 합성 정상 기사15개·지역1/2/12건·고정 합성 위치를 사용하고 실제 Naver SDK/타일23개 응답을 확인했다. SDK 수정/스텁·개인 위치·실제 제보 없이 검사했다. 이 수치는 전체151개나 이전 로딩/아이콘/디자인 검사에 합산하지 않는다.

| @393×852 | 기본 높이 | 수동 위 드래그 |
| --- | ---: | ---: |
| 짧은 정상 기사 |451.5px| 사용자 조작 시803px |
| 중간/긴 정상 기사 |455.984375px|803px |

내용이 상한보다 짧으면 작게 열리며 기본 모드 아래 불필요한 공백은0px이다. 사용자가 수동 확장하면 짧은 내용도 넓게 펼쳐지고, 공유 앞 흐름 간격은 계속16px다. 실제 지도 [긴 기사 기본](app/map-long-default.png)과 [위 드래그 확장](app/map-long-expanded.png)은 같은 기사·같은 readingTop0의 한 쌍이다.

- 지도·목록·검색·직접 주소의 초기 상태, 실제 위/아래 드래그와 내부 스크롤·공유 도달을 확인했다.
- 일반 목록/carousel의 AI 표시 없음, 상세/선택 시트의 정확한 문구·이미지 아래 bbox를 확인했다. 실패 이미지 시 캡션 숨김은 단위 회귀에서 검증하며 이번 성공 이미지 브라우저 실행과 구분한다.
- 수동 URL 추가와320×320/1440×320, 기본 상한·수동 확장·원문/공유 접근을 유지했다.12건의10번째 링크에서 resize 후 상세를 닫으면 확장·scrollTop3429·같은 링크 포커스를 복원한다.
- 실제 지도 DOM/SDK 수명과 최신 마커 복귀, Figma 전체 필터의 기존90dvh·비활성 옵션·낮은 화면 적용·Escape 복귀를 유지했다.
- NoJS 긴 본문은 실제 native End/wheel로 원문까지 접근하고 bbox/hit-test를 통과한다. 서버 본문·canonical·정상 색인·실제404/noindex·원주소·퇴로를 유지했다. 전체151개 회귀는 기존 GET/HEAD404·OG/JSON-LD도 검증한다.
- 앱 origin 쓰기 요청0, 외부 Naver telemetry POST1은 origin으로 구분했다. QA31151/41151은 소유 확인 후 종료했고 브라우저도 닫았다. 모바일 OS 권한 창·실기기 safe-area는 이 데스크톱 검사 범위 밖이다.

직접 주소의 첫 HTML 이전 Proxy/metadata 대기는 기존대로이며 이 변경이 첫 HTML 전 앱 스피너를 제공한다고 주장하지 않는다. 서버 본문·SEO·실제404 우선 계약을 유지한다. 원래 checkout의 사용자 next-env.d.ts와dev는 수정하지 않았다. 댓글·리뷰 요청·승인·머지·Draft 변경은 수행하지 않았다.
