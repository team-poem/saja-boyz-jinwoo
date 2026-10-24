# Figma 분석과 노드 찾아보기

## 2026-10-24 PR45 리뷰 보완

같은 날의 추가 실제 캡처에서 남은 작은 차이를 다시 확인했다. 치수 검사를 통과했다는 사실을 전체 픽셀 일치로 해석하지 않는다.

- 목록 실제 제목·원문 링크에 상단124px/하단84px와 safe-area 스크롤 여백을 적용한다. 320/393/1440px의 양방향 Tab과 상세 복귀에서 고정 헤더·하단 메뉴에 가리지 않는지 확인한다.
- 검색14px 시계, 오른쪽 정렬 삭제X, 입력 시작점과 아이콘 추천칩89px를 대조한다. 실제 검색44px·삭제32px 클릭 영역과 pending 오버레이는 유지한다. 소수점 테두리의 브라우저 반올림은1px 이내로 구분한다.
- 상세 공유와 복사 실패 URL은 관련 보도 뒤의 동일 본문 스크롤에 둔다. 짧은 확장 화면에서는 남는 공간의 아래로 배치하고 기본/긴 본문에서는 흐름을 따라 스크롤한다. 확장 시 배경 검색 헤더만 숨기며 지도 DOM은 보존한다.
- 출처는 라벨·원문 도메인·장식 아이콘을 분리한다. 밑줄은 링크 텍스트에만2px offset으로 두고 긴 도메인은 안전한 실제href와 접근 가능한 전체 이름을 유지한 채 말줄임한다. 날짜·위치·공유 아이콘의 고정 크기와 관련 카드 행간도 대조한다.
- 제보 닫기는 현재508:695의24px SVG를 사용하고 회색 배경과 textarea 크기조절 표시를 제거한다. 닫기44px 영역과 입력/첨부/접수 계약은 유지한다.

API에 없는 분류·상태·정확 주소·언론사 로고는 추가하지 않는다. 지도 타일과 native 날짜 컨트롤, 승인된 브랜드 SVG, iOS 상태바·safe-area 차이는 웹 CSS 결함과 구분한다.

## 2026-10-24 전체 화면 세부 대조

개인 계정으로 현재 노드의 디자인 컨텍스트·스크린샷·치수를 다시 확인했다. 아래 내용은 10/23 상세 시트 갱신을 보완하며, 과거 독립 상세 화면을 복원하지 않는다. 이번 조회만으로 편집 시각이나 별도 버전 히스토리를 새로 확정하지는 않는다.

| 화면           | 현재 기준                                                                                                                                                      | 대조·반영                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 지도·필터      | [18:2348](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2348), [45:3317](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3317) | 캐러셀 배경 제거, 카드 200px·사진80px·gap10, AI 표시8px/검정80%, 날짜는 작은 글자 대비를 유지하도록 기존 muted 사용. 최근 카드4개와 지도 전체 집계는 분리       |
| 숫자 원        | 18:2390/2392/2394                                                                                                                                              | 12건72px·7건48px·5건38.4px, 빨강 rgba(232,25,44,.6), 흰 테두리40%. 기존 크기/색 기준을 유지하고 실제 렌더로 확인                                                |
| 검색 시작·결과 | [11:1797](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1797), [11:1864](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1864) | 시각 검색바37px/back36px, 검색 버튼 실제44px 영역 유지. 최근행33·gap8, 추천13px·높이32. 결과에는 추천층을 반복하지 않음. 대기 중 오버레이 스피너로 칩 너비 유지 |
| 목록           | [11:2123](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2123)                                                                                 | 부가 링크 행 삭제, 헤더·필터 sticky, 카드 p12·가로gap12·세로gap6·요약12/16. API 발행 시각·원문 링크는 유지하여 시안의 가짜 분류/주소를 넣지 않음                |
| 상세 시트      | [19:2865](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2865), [504:269](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=504-269) | 기본456/확장803 @852px, p16·gap16, 제목18·요약13/1.5·이미지140·공유48. 날짜/공유 아이콘과 관련 카드 표면 정렬. 다건 선택의 읽던 위치·포커스 보존                |
| 제보           | [11:2221](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2221)                                                                                 | 헤더·하단 제출 sticky, 입력41·textarea120·첨부100·버튼52. 필드 scroll-margin으로 고정 헤더/버튼 아래 포커스 가림 방지. 입력·첨부·오류·성공·재시도 키 계약 유지  |

현재 회의 메모 [501:2](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=501-2)는 서비스 안내 섹션 숨김, 최근 배너 배경 제거, 카드4개, 목록 헤더 및 모바일 제보 헤더/버튼 고정을 명시한다. 홈 서비스 소개 UI와 목록의 추가 소개·아카이브 행을 제거했다. 공개 `/about`·`/archive`·sitemap·공유 메타데이터·WebSite JSON-LD는 유지한다. 소개 메뉴의 새 위치는 미정이므로 임의 메뉴를 만들지 않는다.

신규 [508:637](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=508-637)은 헤더·닫기 버튼 외 본문이 비어 있다. 접수 완료 화면의 확정 디자인으로 해석하지 않는다. 상태·분류·정확 주소·언론사 로고·발생 시각은 API가 제공하는 사실만 표시한다. OS 상태바를 웹에 복제하지 않으며 지도 타일·기사 이미지·긴 본문의 차이는 레이아웃 오차와 구분한다.

## 2026-10-23 상세 시트 기준 갱신

개인 계정으로 10/17 버전2411299549958662012와 10/22 버전2413159906452030482를 비교하고 현재 화면을 다시 확인했다. 이번 상세 구현의 기준은 아래 v0.2 시트다. 이후의 이전 상세/공유 노드와 치수는 과거 탐색 기록이며 현재 구현 기준으로 사용하지 않는다.

| 구분             | 현재 노드                                                                                    | 치수/기준                                                            |
| ---------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 지도 기본 상세   | [19:2865](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2865) / 패널504:441 | 화면393×852, 패널456px                                               |
| 확장 상세        | [504:269](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=504-269) / 패널504:502 | 패널803px, 상단49px                                                  |
| 공통 시각 기준   | 패널 내부                                                                                    | 반경24, 패딩/주요 간격16, 핸들36×4, 제목18, 사진361×140, 공유 높이48 |
| 삭제된 과거 화면 | 독립 상세11:2043, 공유34:3311                                                                | 새 상세/공유 화면으로 재구현하지 않음                                |

최종 대조는 지도 기본/확장·목록·검색·직접 공유 진입과320/393/768/1440px 화면에서 수행한다. OS 상태바는 웹에 복제하지 않는다. 시안의 임시 분류·상태·언론사 로고·조회수·정확 주소를 샘플로 채우지 않는다. 위치 근거가 있는 경우만 정확도와 같은 지역 보도를 표시하고, 공유 문구는 서비스가 제공하는 기사 요약을 가리킨다. 실제 지도 타일·사진/기사 길이 차이는 합성 검증 데이터와 구분한다.

확인일: 2026-10-01 · 개인 계정 `easter721@gmail.com`으로 조회.

[전체 캔버스](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=0-1) · 파일 키 `TCSILMzViAVqeHRphoyHCH` · 페이지 `0:1` (`사건사고 사이트 v0.1`).

노드 링크는 화면이나 해당 섹션을 직접 선택한다. 도구에 전달할 때는 `18:2348`처럼 콜론 형식, URL에는 `18-2348`처럼 하이픈 형식을 사용한다. `p`와 `t` 매개변수는 문서 탐색에 필요하지 않아 생략했다.

이 문서는 디자인 탐색용 인덱스다. **최종 시안 승인을 의미하지 않는다.** 노드 이름과 구조는 메타데이터에서 확인했고, 지도 기본·필터 선택·사건 바텀시트·상세·목록은 디자인 컨텍스트와 렌더도 확인했다. 나머지는 구조 기준 분석이다. 디자인이 바뀌면 구현 직전에 대상 노드를 다시 조회한다.

## 1. 서비스 느낌과 사용자 흐름

393px 모바일 화면을 중심으로, 실제 지도를 배경에 두고 검색·필터·카드·내비게이션을 띄우는 구조다. 흰색과 옅은 슬레이트, 반투명 표면, 둥근 모서리와 얕은 그림자에 빨강을 포인트로 사용한다. 지도에서는 공간 맥락을 유지하고, 목록·상세에서는 정보를 읽는 데 집중한다.

의도한 흐름은 화면 이름과 버튼을 바탕으로 한 해석이며 프로토타입 연결을 검증한 결과는 아니다.

- 지도 → 검색 또는 기간·카테고리·상태 필터 → 마커 선택 → 사건 바텀시트 → 사건 상세.
- 지도의 핫한 사건·전체보기 또는 하단 목록 → 사건 목록 → 상세.
- 하단 제보 버튼 → 제보 입력 → 제출.
- 사건 상세 → 공유 시트 또는 공유 기능. 공유 방식은 추가 확인 필요.

## 2. 주요 화면 인덱스

| 화면                    | Figma 이름                   | 노드 링크                                                                      | 크기       | 앱 대응             | 읽을 포인트                               |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------ | ---------- | ------------------- | ----------------------------------------- |
| 지도 기본·상태 드롭다운 | screen-map-main              | [18:2348](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2348) | 393 × 852  | /                   | 흉흉 로고, 상태 드롭다운이 열린 시안      |
| 지도 필터 선택          | screen-map-main              | [45:3317](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3317) | 393 × 852  | /의 필터 상태       | 위험추적 로고, 선택 필터의 빨강 테두리    |
| 검색 시작               | screen-search                | [11:1797](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1797) | 393 × 852  | /search             | 최근 검색어·추천 알림                     |
| 검색 입력               | screen-search-typing         | [11:1864](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1864) | 393 × 852  | /search의 입력 상태 | 주소 결과와 사건 결과 분리                |
| 사건 바텀시트           | screen-incident-bottom-sheet | [19:2865](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2865) | 393 × 852  | 지도 위 선택 상태   | 사건 요약·주변 사건                       |
| 사건 상세               | incident-detail-white        | [11:2043](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2043) | 393 × 1045 | /incidents/[id]     | 출처·타임라인·발생 위치·공유              |
| 상세 대안               | incident-detail-white        | [19:3061](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-3061) | 393 × 1045 | 상세 비교용         | 같은 이름의 별도 프레임, 최종 여부 미확정 |
| 공유 시안               | Frame 2                      | [34:3311](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3311) | 393 × 957  | 상세 위 공유 상태   | 공유대상과 기간 선택 문구가 혼재          |
| 사건 목록               | list-page-white              | [11:2123](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2123) | 393 × 918  | /incidents          | 썸네일과 사건 정보의 세로 목록            |
| 제보                    | report-popup-white           | [11:2221](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2221) | 393 × 852  | /report             | 카테고리·발생 일시·위치·첨부·제출         |

## 3. 화면 내부 섹션 링크

### 지도 기본

상위 화면: [18:2348](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2348)

| 섹션            | 노드 링크                                                                      | 레이어 이름               |
| --------------- | ------------------------------------------------------------------------------ | ------------------------- |
| 검색 헤더       | [18:2360](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2360) | floating-header-pill      |
| 필터 행         | [18:2368](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2368) | filters-row               |
| 상태 드롭다운   | [45:3691](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3691) | FilterDropdown            |
| 내 위치 버튼    | [18:2387](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2387) | my-location-button        |
| 핫한 사건 영역  | [18:2400](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2400) | carousel-gradient-wrapper |
| 사건 카드 목록  | [18:2404](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2404) | cards-list                |
| 하단 내비게이션 | [18:2428](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=18-2428) | nav-bar-body              |

### 지도 필터 선택

상위 화면: [45:3317](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3317)

| 섹션            | 노드 링크                                                                      | 레이어 이름          |
| --------------- | ------------------------------------------------------------------------------ | -------------------- |
| 검색 헤더       | [45:3329](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3329) | floating-header-pill |
| 필터 행         | [45:3337](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3337) | filters-row          |
| 선택된 카테고리 | [45:3341](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3341) | filter-chip-카테고리 |
| 선택된 상태     | [45:3344](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3344) | filter-chip-상태     |
| 미선택 기간     | [45:3416](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3416) | filter-chip-기간     |
| 핫한 사건 카드  | [45:3352](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3352) | cards-list           |
| 하단 내비게이션 | [45:3376](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3376) | nav-bar-body         |

### 검색 시작

상위 화면: [11:1797](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1797)

| 섹션            | 노드 링크                                                                      | 레이어 이름              |
| --------------- | ------------------------------------------------------------------------------ | ------------------------ |
| 검색 헤더       | [11:1808](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1808) | search-bar-header        |
| 검색 입력       | [11:1811](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1811) | search-input-field       |
| 최근 검색어     | [11:1814](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1814) | recent-searches-section  |
| 추천 알림       | [11:1837](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1837) | suggested-alerts-section |
| 하단 내비게이션 | [19:2558](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2558) | nav-bar-body             |

### 검색 입력

상위 화면: [11:1864](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1864)

| 섹션           | 노드 링크                                                                      | 레이어 이름           |
| -------------- | ------------------------------------------------------------------------------ | --------------------- |
| 검색 입력      | [11:1878](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1878) | search-input-field    |
| 주소 검색 결과 | [11:1884](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1884) | matches-section       |
| 사건 검색 결과 | [34:3149](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3149) | matches-section       |
| 진행 사건 결과 | [34:3158](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3158) | match-incident-active |
| 종료 사건 결과 | [34:3167](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3167) | match-incident-ended  |

### 사건 바텀시트

상위 화면: [19:2865](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2865)

| 섹션          | 노드 링크                                                                      | 레이어 이름                 |
| ------------- | ------------------------------------------------------------------------------ | --------------------------- |
| 바텀시트 패널 | [19:2990](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2990) | incident-bottom-sheet-panel |
| 상단 핸들     | [19:2991](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2991) | sheet-header                |
| 배지·닫기     | [19:2993](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-2993) | sheet-meta-row              |
| 위치·시간     | [19:3001](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-3001) | location-time-row           |
| 사진·요약     | [19:3006](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-3006) | brief-details               |
| 주변 사건     | [19:3009](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=19-3009) | nearby-incidents-section    |

### 사건 상세

상위 화면: [11:2043](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2043)

| 섹션           | 노드 링크                                                                      | 레이어 이름      |
| -------------- | ------------------------------------------------------------------------------ | ---------------- |
| 상세 헤더      | [11:2054](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2054) | detail-header    |
| 배지           | [11:2061](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2061) | badge-row        |
| 제목·위치·일시 | [11:2066](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2066) | title-info       |
| 대표 이미지    | [11:2075](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2075) | hero-image       |
| 출처·인용      | [11:2076](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2076) | source-row       |
| 타임라인       | [11:2084](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2084) | timeline-section |
| 발생 위치      | [11:2114](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2114) | map-preview      |
| 공유 버튼      | [11:2121](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2121) | share-btn        |

### 공유 시안

상위 화면: [34:3311](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3311)

| 섹션          | 노드 링크                                                                      | 레이어 이름         |
| ------------- | ------------------------------------------------------------------------------ | ------------------- |
| 공유 시트     | [34:3259](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3259) | filter-bottom-sheet |
| 공유대상 헤더 | [34:3262](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3262) | sheet-header        |
| 기간 선택     | [34:3268](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3268) | section-period      |
| 공유 버튼     | [34:3304](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=34-3304) | apply-btn           |

### 사건 목록

상위 화면: [11:2123](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2123)

| 섹션            | 노드 링크                                                                      | 레이어 이름          |
| --------------- | ------------------------------------------------------------------------------ | -------------------- |
| 검색 헤더       | [11:2135](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2135) | floating-header-pill |
| 필터 행         | [11:2143](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2143) | filters-row          |
| 사건 목록       | [11:2153](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2153) | incident-list        |
| 첫 카드         | [11:2154](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2154) | incident-card        |
| 첫 썸네일       | [11:2155](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2155) | thumbnail            |
| 첫 카드 내용    | [11:2156](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2156) | card-right-content   |
| 하단 내비게이션 | [11:2210](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2210) | nav-bar-body         |

### 제보

상위 화면: [11:2221](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2221)

| 섹션        | 노드 링크                                                                      | 레이어 이름           |
| ----------- | ------------------------------------------------------------------------------ | --------------------- |
| 팝업 헤더   | [11:2232](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2232) | popup-header          |
| 입력 폼     | [11:2237](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2237) | report-form           |
| 카테고리    | [11:2238](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2238) | form-section-category |
| 발생 일시   | [11:2243](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2243) | form-section-date     |
| 제목        | [11:2248](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2248) | form-section-title    |
| 발생 위치   | [11:2252](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2252) | form-section-location |
| 상세 내용   | [11:2257](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2257) | form-section-desc     |
| 사진·동영상 | [11:2261](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2261) | form-section-upload   |
| 제출 버튼   | [11:2267](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2267) | submit-btn            |

## 4. 디자인 수치와 공용 요소

다음은 확인한 밝은 시안에서 읽은 대표값이다. 모든 노드의 동일값을 보장하는 전역 토큰 정의는 아니다.

| 요소             | 관찰값                     | 코드베이스 대응       |
| ---------------- | -------------------------- | --------------------- |
| 본문·제목        | #0f172a                    | --color-text          |
| 보조 텍스트      | #64748b                    | --color-muted         |
| 강조 빨강        | #e8192c, 일부 #e81a2b      | --color-brand         |
| 진행 상태        | #ff4a5a                    | --color-progress      |
| 종료 상태        | #10b981                    | --color-closed        |
| 구분선           | #e2e8f0                    | --color-border        |
| 떠 있는 표면     | 흰색 약 88%, blur 20px     | --color-floating      |
| 화면 좌우 간격   | 16px                       | 화면 레이아웃 기준    |
| 검색 헤더        | radius 16px                | 공통 검색 헤더 후보   |
| 카드             | radius 14px                | --radius-card         |
| 하단 메뉴        | 높이 68px, radius 28px     | --radius-pill         |
| 중앙 제보 버튼   | 54 × 54px                  | 강조 액션 후보        |
| 지도 카드        | 너비 200px, 카드 간격 10px | 가로 스크롤 카드 후보 |
| 목록 썸네일      | 80 × 80px                  | 목록 카드 후보        |
| 상세 대표 이미지 | 361 × 190px                | 상세 이미지 비율 기준 |

Inter와 Pretendard 표기가 함께 나온다. 실제 웹 폰트와 라이선스, 한글 폴백은 구현 때 확정한다. Figma의 iOS 시각·배터리·홈 인디케이터는 기기 목업 요소인지 서비스 UI인지 구분하고 웹에 그대로 복제할지 확인한다.

공통 요소 후보는 검색 헤더, 필터 칩·드롭다운, 상태·카테고리 배지, 카드, 하단 메뉴, 바텀시트다. 지도 카드와 목록 카드는 크기·정보 밀도가 달라 하나의 고정 레이아웃으로 억지 통합하지 않는다.

## 5. 구현 전에 확인할 차이

- **브랜드**: 지도 기본은 `흉흉`, 지도 선택·목록·바텀시트는 `위험추적` 표기가 있다. 현재 코드 기반은 `흉흉`이다.
- **카테고리**: 목록에는 사회·안보·정치·국제, 바텀시트 컨텍스트에는 소방·교통 표기도 보인다. 공용 모델을 넓히기 전에 최종 분류를 정한다.
- **상태**: 진행 중·공론화 성공·종결 외에 종료·미제·신규·수사중·답변대기 등 여러 시안의 표현이 공존한다. 현재 모델은 ongoing/publicized/closed이며 최종 데이터 계약이 아니다.
- **공유**: `Frame 2`는 공유대상 헤더와 기간 선택 섹션이 함께 있다. 기존 필터를 재사용한 임시 시안일 가능성이 있으나 확정할 수 없다.
- **시안 선택**: 캔버스 좌표나 노드 번호가 뒤라고 최종 시안으로 단정하지 않는다. 화면별로 선택한다.
- **데이터**: 디자인의 사건명·수치·날짜·뉴스 출처는 예시다. 실제 기사·실시간 정보로 취급하지 않는다.
- **레이어와 렌더**: 바텀시트 배지 등 반환 코드의 문구와 렌더 문구가 일부 달랐다. 실제 구현 시 해당 하위 노드의 컨텍스트와 렌더를 다시 대조한다.

뉴스 수집 메모: [데이터 수집 방식 · 네이버 뉴스 API](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=94-2). 아직 수집 주기, 위치 추출, 중복 제거와 서버 설계는 정해지지 않았다.

## 6. 이전·비교 시안과 작업 메모

| 용도                    | 노드 링크                                                                      |
| ----------------------- | ------------------------------------------------------------------------------ |
| 초기 지도               | [11:1017](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1017) |
| 초기 검색               | [11:1102](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1102) |
| 초기 검색 입력          | [11:1191](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1191) |
| 초기 전체 필터          | [11:1261](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1261) |
| 초기 사건 시트          | [11:1332](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1332) |
| 초기 상세               | [11:1393](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1393) |
| 초기 목록               | [11:1502](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1502) |
| 초기 제보               | [11:1632](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-1632) |
| 사회·안보 시안 A        | [5:2](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=5-2)         |
| 사회·안보 시안 B        | [6:270](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=6-270)     |
| 사회·안보 시안 C        | [10:772](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=10-772)   |
| 사회·안보 별도 시안     | [45:3420](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3420) |
| 태그 묶음 A             | [11:2270](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2270) |
| 태그 묶음 B             | [17:2344](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=17-2344) |
| 작업내역                | [11:2274](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2274) |
| 전체 필터·돋보기 메모 A | [11:2277](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=11-2277) |
| 전체 필터·돋보기 메모 B | [48:2](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=48-2)       |
| 공유 수정 메모          | [45:3740](https://www.figma.com/design/TCSILMzViAVqeHRphoyHCH?node-id=45-3740) |

## 7. 다음 작업에서 쓰는 방법

1. 주요 화면 인덱스에서 대상 화면과 상태를 고른다.
2. 해당 화면 링크를 열고 최종 시안 여부를 확인한다.
3. 화면 내부 섹션 링크로 필요한 부분만 조회한다. 일부 지도 프레임은 메타데이터에서 자식이 생략되므로 디자인 컨텍스트를 사용한다.
4. 화면 구현 시 디자인 컨텍스트와 스크린샷을 다시 받고, 필요한 실제 자산을 로컬로 다운로드한다. 이 문서의 분석만으로 자산이나 인터랙션을 추측하지 않는다.
5. 구현 결과를 대상 화면의 렌더와 비교한다. 디자인 변경 시 이 인덱스의 노드·확인일을 갱신한다.

위 인덱스는 초기 탐색 기록이다. 현재 구현 범위와 승인한 시안은 아래 갱신 내용을 따른다.

## 8. 2026-10-14 전체 재구축 기준 갱신

전체 파일을 다시 확인하고 개인 계정으로 주요 화면의 컨텍스트·렌더와 공통 원본을 조회했다. 링크45:3421 하나를 전체 기준으로 삼지 않는다. 밝은 계열 기준은 지도18:2348/선택45:3317, 검색11:1797/11:1864, 목록11:2123, 상세11:2043, 제보11:2221, 선택 시트19:2865, 공유34:3311이다.

브랜드는 사용자 지시에 따라 창작 SVG 흉흉으로 통일한다. Inter v4.1과 Pretendard v1.3.9를 로컬로 적용하고 실제 브라우저 로드를 확인한다. 메뉴는 실제 경로에 맞는 활성 상태를 사용한다. 검색 문구는 기사 키워드 검색이며 주소 검색을 약속하지 않는다.

웹 비교에서는 Figma 상단 iOS 목업37px와 하단 홈 인디케이터 영역을 제외한다. 지도393×790, 검색393×790, 목록393×856, 상세393×1008, 제보393×790의 브라우저 캡처를 원본과 대조한다. 실제 Naver 지도 타일·SDK 표시를 유지하고 시안 이미지를 캔버스에 넣지 않는다.

첫 PR은 공통 폰트·로고·헤더·메뉴·준비 중 필터·화면 틀이다. 후속 지역 원은 **고정 대표 좌표의 지역별 고유 기사 수**를 표현하며 1건부터 숫자 원, 수가 많을수록 큰 크기로 구현한다. 줌 클러스터와 혼동하지 않는다. 기사 카드·상세/시트·제보 본문은 이후 맞추고 API에 없는 사건 정보를 만들지 않는다.

일치 항목과 남은 차이는 collab/active/codex--figma-ui-foundation/visual-verification.md, 실제 계약은 [공용 UI 계약](ui-contract.md)을 따른다.

## 9. 2026-10-15 지도 홈 실측과 재대조

개인 계정 MCP는 정상이며 지도18:2348/45:3317뿐 아니라 사용자 지정 검색11:1864·공유34:3311·목록11:2123·제보11:2221을 모두 컨텍스트/렌더로 다시 조회했다. 워커 CLI의 별도 Figma 인증과 이 앱의 연결은 구분한다. 부모가 실제 원본을 조회해 컨텍스트·렌더·하위 실측을 전달하고 실제 브라우저에서 대조했다.

- 18:2368 필터 row30px. 아이콘42×30, 기간60×27, 카테고리82×27, 상태60×27, gap6. 기존 공통 기반의 모든 칩32px 강제값이 원본과 달랐음을 정정했다.
- 18:2405 카드200×152, header176×38, 이미지176×80(x12/y60), padding12/radius14. CSS의 물리적 border 대신 내부 stroke를 고려해 콘텐츠 폭이174로 줄지 않게 했다.
- 18:2399 carousel221px(pt32/title17/gap12/cards152/pb8), 메뉴와10px 간격. 기존 웹 메뉴 bottom8 유지 때문에 원본 iOS 목업 제외값과는 세로1px 차이가 있다. 550px 이하 높이는 compact 카드로 가림을 방지한다.
- 지도 원은 서버의 고정 지역 대표점에 고유 기사 수를 표시한다. 1건도 숫자 원이며 줌 클러스터가 아니다. 기간은 발행일 기준 실제 필터다.
- 인기도/분류/진행 상태 계약은 없으므로 최근 보도 기사·미제공 안내로 표현한다. 실제 Naver 타일·기사 이미지/내용, 창작 흉흉 브랜드, 전체 필터의 승인한 밝은 공통 시트 적용안은 원본 예시와의 명시적 차이다.

초기 소바야 독립 리뷰와 실제 Chrome에서 필터 줄바꿈 겹침·가로 화면 내 위치 버튼 가림을 발견해 보정했다. 구체 수치와 예외는 `collab/active/codex--figma-map-home/figma-measurements.json`, 최종 확인은 같은 폴더의 verification.md를 따른다. 검색·공유·목록의 본문은 이 지도 PR에서 완료되지 않았고, 제보는 이미 올라온 PR22를 별도로 확인해야 한다.

## 추가 화면 실측과 사용자 피드백

검색 초기11:1797·결과11:1864·목록11:2123·상세19:3061을 같은393px 폭의 실제 Chrome 캡처와 다시 비교했다. 검색 전용 텍스트 카드와 강조, 최근/추천 간격, 목록 정보 계층, 상세190px 사진·출처/본문/공유 배치를 보정한다. iOS 상태바를 웹에 복제하거나 예시 사건 메타데이터를 생성하지 않는다. 구체적인 차이/제약과 보정 전후 근거는 codex--figma-map-home의 all-screen-gaps.md와 관련 캡처를 따른다.
