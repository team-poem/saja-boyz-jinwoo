# 누락 로딩 보완 · 최종 검증

제품 소스 `56d4c1c60d5558d08e5495d1a31b21903b83f213`, production Build `pRhNY7upYLIiB9oD27vRG`를 검증했다. 이후 인수인계는 기록·계획 보관만 포함한다.

## 변경과 계약

- 목록/지도 카드/상세 이미지: 공통 URL별 다운로드 상태, 예약된 영역의 장식 스켈레톤. 성공·실패·src 교체·캐시 완료 시 종료하며 실제 이미지 뒤에 두어 NoJS 이미지와 AI 캡션을 보존한다.
- 최초 지도 기사 조회: 홈 전용 `(map)` route group의 전체 높이 스켈레톤·스피너. 데이터 준비 후 실제 MapHome이 SDK/위치를 시작한다. 기존 Figma 필터·비활성 선택지와 지도 마커 코드는 변경하지 않았다.
- 수동 검색: native GET form + client transition, 버튼 스피너·결과 스켈레톤·중복 방지. 명시적 submit만 revision을 갱신해 같은 query도 카드/offset/hasMore를 초기화하고 상세 복귀는 유지한다. 검색 route loading을 client pending UI로 옮겨 NoJS GET 결과를 숨기지 않는다.
- 상세 재시도: 오류 안내·기존 href와 수정키/새 탭을 유지하며 spinner/busy/중복 방지를 제공한다. 검색 오류의 같은 주소 Link 재시도도 실제503 재실패→200 복구를 확인했다.

## 소바야

팀 pin `0d051213`의 Canon TDD로 다음 구체 테스트 하나씩 RED→구현→전체 스위트를 실행했다. 이미지147 → 서버 대기148 → 검색/재시도149 → 같은 검색어 재제출150이다. [사이클별 증거](tdd-cycles.json), [최종 전체150개](gate150.json), [실행 상태](verification-status.json).

최종 gate는 exit0이며150개 통과·실패0·생략0, 포맷·린트·소스/Git 불변 검사를 통과했다. 기존 ESLint 경고3개를 유지하고 새 경고는 없다. 빌드·TypeScript도 통과했다.

첫 전체 실행에서 재검색1개가 실패한 결과는 `gate150-first-attempt.json`, 동일 브라우저 파일9개 통과는 `navigation-nine-green.json`에 남겼다. 관측을 해당 keyword 요청과 실제 렌더 완료로 한정한 뒤150개가 통과했다. 별도 실행은 suite JSON이 출력된 직후 증거 저장을 너무 일찍 시작해 최종 불변 검사에서 exit1이었으며 `gate150-before-invariant-recheck*.json`으로 구분한다. 기록을 수정하지 않은 최종 게이트의 exit0만 완료 근거로 사용한다.

## 실제 브라우저

[최종 보고서](browser-report.json) · [캡처 목록](browser-manifest.json) · [실행 스크립트](browser-qa.mjs.txt) · [합성 API](browser-fixture.mjs.txt) · [빌드 로그](production-build.txt).

Chrome393×852, reduced-motion reduce에서16개 시나리오·91개 검사 모두 통과, 미완료0·pageErrors0·새 캡처31장이다. 합성 기사7개·지역1/2/4·고정 합성 위치를 사용했다. 실제 Naver SDK/타일80개 응답을 확인했으며 SDK 수정/스텁·개인 위치·실제 제보 제출은 없다. 새 결과를 이전 디자인 측정/캡처 수치에 합산하지 않는다.

- 세 이미지 표면의 API 보류→성공/실패, 같은 context 새 페이지에서 무가로채기 HTTP 캐시를 확인했다. 캡션과 이미지 영역 치수는 유지된다.
- 최초 홈 기사 API 보류 동안 h-dvh fallback이 보이고, 해제 후 SDK script가 한 번 추가되며 실제 원과 카드로 바뀐다.
- 검색 Enter/버튼: 즉시 busy·disabled·readonly·버튼 spinner와 단일 결과 skeleton, 원래 입력 유지·결과 도착 후 복구.
- 검색 오류: 공백 포함 q를 server에서 정규화해 같은 href Link를 두 번 재시도한다. 실제 upstream 요청·pending spinner·503 후 대기 종료·200 결과를 확인했다.
- 목록/archive의 실제 NextLink RSC 상세 loader는 upstream1회다. archive 출발만으로 standalone이라고 부르지 않는다. 내부 상세 재시도는 중복 Enter 차단·200/503 종료를 확인했다.
- 직접 공유 주소: 존재 확인과 상세/metadata 조회2개를 각각 보류해 응답 단계를 관찰했다. JSoff 실제 제목·요약·출처·이미지, Googlebot 제목/canonical/색인, 실제 upstream404/noindex/원주소·쿼리/안전한 퇴로를 확인했다. 정식 회귀는 GET/HEAD404·OG/JSON-LD도 검증한다.

첫 QA의 제품 동작90개는 통과했지만 origin을 기록하지 않은 쓰기 감시가 외부 SDK의 POST `/_store`4개를 앱 요청으로 분류했다(`browser-first-attempt.json`). 동일 빌드 재실행에서 실제 origin `https://kr-col-ext.nelo.navercorp.com`을 기록하고 앱 origin 쓰기0·외부 SDK 요청4를 분리해 최종91개를 통과했다. 앱의 POST를 허용하거나 제품을 변경하지 않았다.

## 직접 주소의 응답 전 대기

공유 주소에 `loading.tsx`를 무조건 추가하면 JS 없는 본문이 숨겨진 Suspense 세그먼트에 남았다. 모든 UA의 metadata를 기다리게 하면 본문/404는 보존되지만 첫 로더는 보이지 않았다([별도 실험](direct-loading-experiment.json)). 따라서 직접 상세의 loading 파일·전역 metadata 정책은 추가하지 않는다.

Proxy의 존재 확인과 metadata는 첫 HTML 이전 단계다. 이 구간은 앱 spinner로 표시할 수 없으며 기존 HTTP 대기가 남는다. 이를 해결했다고 주장하지 않는다. 완성된 서버 본문·공유 주소·SEO·실제404를 보존하고 내부 이동/재시도 로딩을 보완했다. 관련 [불변 계약 blob](preserved-contracts.json), [UI 계약](../../../../../docs/ui-contract.md), [구조](../../../../../docs/architecture.md)를 참고한다.

소유권을 확인한 QA 서버31147/41147은 SIGTERM 종료했고 포트가 닫혔다([정리 기록](cleanup.json)). 실제 모바일 OS 권한 창·키보드·safe-area는 이번 데스크톱 Chrome 검증에 포함하지 않는다. PR Draft 상태를 유지하고 외부 댓글·리뷰 요청·승인·머지는 수행하지 않는다.
