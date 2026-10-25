# 정상 기사 상세의 내용 기반 높이 · 최종 검증

제품 소스 `9f33c546c1ef5894d3351e7bf0496f1b8278dfc1`, production Build `3az_4QQ5E5r7rXctQkgo6`를 검증했다. 이후 커밋은 검증 자료·계획 보관·인수인계만 포함한다.

## 정상 기사 상세의 동작

고정 높이를 없애고 `height:auto`와 최대70dvh를 사용한다. 짧은 기사는 내용만큼, 긴 기사는 상한에서 본문만 스크롤된다. 기존 지도 접힘53.52dvh는 고정 height가 아닌 미리보기 상한으로만 유지하며 펼침도70dvh를 넘지 않는다. 공유 앞 `mt-auto`를 제거해 내용 뒤 빈 공간을 채우지 않는다.

실제 Figma [기본19:2865](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2865)/504:441과 [확장504:269](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=504-269)/504:502를 개인 계정으로 다시 조회했다. 확장 패널은 고정height 없는 flex다. 사용자 지시에 따라 정적인 프레임 높이는 반응형 상한으로 해석하고 p16/gap16/반경24·이미지140·공유48·기존 자산을 유지했다.

새 높이 측정 상태·observer·의존성은 추가하지 않았다. `flex-auto/min-h-0`, 내용 수축 방지와 기존 높이 보고 observer를 사용한다. body lock·포커스/읽던 위치·선택 시트 보존, 드래그·접기/펼치기와 초기 모드는 유지한다. 이미 내용 높이+90dvh인 전체 필터는 변경하지 않았다.

## 소바야 RED→GREEN

[사이클](tdd-cycle.json) · [구현 전 실패](normal-article-red.json) · [집중 검증](normal-article-focused-green.json) · [전체151개](gate151.json).

정상 짧은/중간 기사가 목록·검색·직접·NoJS에서 모두803px로 열리고 짧은 내용 뒤에 약370.5px의 불필요한 공간이 남는 실제 RED를 확인했다. 기존150개를 유지하고 정상 기사 길이별 자연 높이·70dvh·긴 본문 스크롤·공유·접기·낮은 화면·닫기 복귀를 추가한 최종151개가 실패0·생략0으로 통과했다. gate exit0·포맷·린트·소스/Git 불변 검사와 production 빌드·TypeScript를 확인했다. 기존 ESLint 경고3개 외 새 경고는 없다.

## 실제 브라우저 · 같은 최종 빌드

[최종 보고서](browser-report.json) · [캡처 목록](browser-manifest.json) · [측정 설명](browser-results.md) · [스크립트](browser-qa.mjs.txt) · [합성 API](browser-fixture.mjs.txt) · [빌드](production-build.txt).

4개 시나리오·120개 검사 모두 통과, 미완료0·pageErrors0·대표 PNG11장이다. 합성 정상 기사15개·지역1/2/12건·고정 합성 위치를 사용하고 실제 Naver SDK/타일23개를 확인했다. SDK 수정/스텁·개인 위치·실제 제보 없이 확인했다. 이 수치는 전체151개 또는 이전 로딩/아이콘/디자인 검사 수에 합산하지 않는다.

| 정상 기사 @393×852 | 실제 시트 높이 | 내용 뒤 불필요한 공백 |
| --- | ---: | ---: |
| 짧음 | 451.5px | 0px |
| 중간 | 490.5px | 0px |
| 아주 긴 본문 | 596.390625px | 본문 스크롤 끝에서 약0px |

70dvh는 이 viewport에서596.4px이며 특정 기사에 고정 크기를 배정한 표가 아니다. 실제 내용/줄바꿈에 따라 달라진다. 정식 RED와 이 브라우저 표는 서로 다른 합성 기사 자료이므로 같은 원본의 픽셀 전후 비교로 표현하지 않는다.

- 수동 공유 URL 추가 시451.5→533.5px로 자연스럽게82px 커진다. 본문 흐름과 링크를 유지하고320×320/1440×320에서는224px 상한 안에서 입력과 공유에 접근한다.
- 실제 지도1건은 바로 정상 상세로,2/12건은 선택 시트 후 정상 상세로 진입한다. 지도 DOM/SDK1회 유지,12건의10번째 링크를 읽고 resize·상세 닫기 뒤 확장 상태·scrollTop3319·같은 링크 포커스를 복원했다. 마지막 닫기 후 현재 마커로 돌아간다.
- 전체 필터는 기존90dvh·비활성 분류/상태를 유지하며 낮은 화면에서 적용/닫기/포커스 복귀를 확인했다.
- NoJS 긴 본문은 실제 native 키보드/휠로 원문에 도달하고 bbox/hit-test를 통과한다. 서버 본문·메타데이터/canonical·정상 색인, 실제404/noindex/원주소·퇴로를 유지했다. 정식151회귀는 GET/HEAD404와 기존 OG/JSON-LD도 유지한다.

첫 결과49개 중3개 실패·2개 미완료는 `browser-first-attempt.json`으로 보존했다. 실행 중 fixture가 수정 전 evidence를 보유해 지도15건이 거부된 자료 문제는 [당시 API](first-fixture-api.json)와 [진단](first-fixture-diagnostic.json)에 남겼고 해당 API만 최신 파일로 재시작했다. NoJS `scrollIntoViewIfNeeded`의 stable 대기는 [native 입력 진단](nojs-helper-diagnostic.json)에서 실제 스크롤/원문 hit로 분리했다. 실제 가시성 기대를 유지하며 native 입력으로 확인하고 외부 Naver telemetry와 앱 origin 쓰기를 구분해 같은 제품/빌드120개를 통과했다. 제품 코드를 바꾸거나 검증을 생략하지 않았다.

## 보존과 인수인계

[필터·SEO·공유·라우트 불변 blob](preserved-contracts.json). 메타데이터·서버 기사 HTML·주소·실제404 처리와 지도 SDK는 변경하지 않았다. 직접 주소 첫 HTML 이전의 Proxy/metadata 대기는 기존대로 남는다. 이를 새 로더로 해결했다고 주장하지 않는다. 이전 로딩 캡처는 이전 높이 빌드의 근거이며 현재 시트 높이는 이11개 캡처를 기준으로 한다.

소유권을 확인한 QA31148/41148은 SIGTERM 종료했고 포트가 닫혔다([기록](cleanup.json)). 모바일 OS 권한 창·키보드·기기 safe-area는 데스크톱 Chrome 검증과 구분한다. PR45의 Draft를 유지하고 댓글·리뷰 요청·승인·머지는 수행하지 않는다.
