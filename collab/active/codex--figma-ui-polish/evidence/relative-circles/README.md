# 지도 숫자 원의 상대 크기 검증

제품 소스 `5202747b4df848c540f144b0e83de84137dfe7c0` · production Build `OlCnnH7LrNmRV-5J37cIH`.

현재 지도 안의 최종 그룹 건수를 비교해38.4–88px에 배치한다. 로그 비율과 최소 시각 간격으로 작은 차이·큰 이상치를 함께 읽으며 특정 숫자에 크기를 고정하지 않는다. 같은 건수는 같고 단일/모두 동률은48px다. 많은 고유 건수에서는 유한한 크기 범위의 간격을 나눈다. 원 면적의 통계적 정비례를 주장하지 않는다.

## 검증 결과

- 소바야 `0d051213`: 신규3개를 차례로 RED→GREEN으로 추가하고 전체146개 통과·실패0·생략0. 포맷·린트·소스/Git 불변 검사 통과. 기존 ESLint 경고3개 외 새 경고 없음. [단계별 기록](tdd-cycles.json), [최종 전체 결과](gate146.json).
- production 빌드·TypeScript 통과. [빌드 로그](build-output.txt).
- 실제 Naver SDK/타일과 합성 기사38건·고정 합성 위치 사용. 기사 API만 로컬이며 SDK를 수정하거나 스텁하지 않았다. 최종71개 검사·4개 시나리오 완료, 실패0·pageErrors0·타일200 응답100개. [보고서](browser-report.json), [캡처 조건](browser-manifest.json).
- 새 캡처7장과 과거 후보의1/2/12 참고1장을 분리했다. 과거 전국 지도와 새 합성 지역은 카메라/지리가 다르며 동일 픽셀 비교가 아니다.
- 200/350/500지역 등8개 합성 입력에서 대표점·고유 기사 합계·최종 비겹침·역순 결정성·빈 입력/동률/단일·재산정 후 연쇄 병합을 확인했다. 이는 정식 성능 벤치가 아니다. [기하 검증](properties.json).
- QA 서버31146/41146 종료와 포트 닫힘 확인. [정리 결과](cleanup.json). 개인 위치/실제 제보는 사용하지 않았다.

## 실제 DOM 측정

| 화면 | 건수 → 지름 |
| --- | --- |
| 기본 화면 | 3→38.39px, 4→54.59px, 8→88px. 두4건은 같은 크기 |
| 8건을 화면 밖으로 이동 | 3→38.39px, 4→88px. 화면 밖8/19는 비율에서 제외 |
| 선택 중 넓은 화면으로 변경 | 8건 재진입, 같은4건은54.59px. 같은 시트·기사 링크 포커스·scrollTop20 보존 |
| 최근24시간 | 2/3/4/4, 현재 최대4건은88px |
| 줌 축소/복귀 | 겹치는19건 병합 뒤 원래3/4/4/8로 복귀 |
| 예시1/2/12 | 이번 화면에서는38.39/54/88px. 고정된 숫자별 치수가 아님 |

캡처는 [기본](app/relative-baseline.png) · [8건 밖 이동](app/relative-max8-outside.png) · [기간](app/relative-period24h.png) · [선택 중 resize](app/relative-selection-resize.png) · [현재 마커로 복귀](app/relative-close-latest-marker.png) · [줌 병합](app/relative-zoom-merged.png) · [1/2/12 예시](app/relative-comparison-1-2-12.png)에서 확인한다.

## 실제 SDK에서 추가로 발견한 문제

초기 후보는 Naver의 이동 DOM pane offset을 바깥 canvas 원점과 같다고 해석했다. 실제 pan 후8건 중심이431px로 화면 밖에 나가도6.5초/resize 뒤 크기 분포에 남았다. [초기 보고서](initial-browser/report.json)와 [별도 대기 진단](initial-browser/pan-diagnostic.json)을 보존했다. 초기 실패 수치를 최종71개에 섞지 않았다.

현재 카메라 중심의 projected offset을 빼고 canvas 반폭/반높이를 더해 정규화했다. 이 변환은 공통 평행이동이므로 충돌 거리를 보존한다. [공식 좌표계 문서](https://navermaps.github.io/maps.js.ncp/docs/tutorial-Projection.html) · [판단 메모](projection-review.md). 자동화도 최소1.5초와 양수 크기/연속 안정화를 확인해 줌 중간의 숨겨진 DOM을 완료로 간주하지 않는다. pan 기대값을 완화하지 않고 최종 실제 지도에서 GREEN을 확인했다.

## 재현

`fixture.mjs.txt`, `qa.mjs.txt`는 실행 당시 스크립트다. 임시 폴더에`.mjs`로 복사해 사용한다. Node24, 로컬 playwright-core/Chrome, 사용자가 제공한 공개 Naver client ID가 필요하다.

1. fixture를 `QA_API_PORT=41146 QA_OUTPUT=<임시결과>`로 실행한다.
2. `NEWS_API_BASE_URL=http://127.0.0.1:41146 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=<공개ID>`로 빌드하고 같은 환경으로31146에서 start한다.
3. `QA_APP=<checkout> QA_ORIGIN=http://localhost:31146 QA_API=http://127.0.0.1:41146 QA_OUTPUT=<결과> QA_EXPECT_BUILD_ID=<새BUILD_ID>`로 QA를 실행한다.
4. 실제 SDK와 타일을 유지하고 종료 후 소유 서버만 정리한다.
