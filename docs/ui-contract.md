# 공용 UI와 사건 데이터 계약

## 컴포넌트

| 컴포넌트 | 경로 | 입력과 용도 |
| --- | --- | --- |
| SearchHeader | src/components/ui/search-header.tsx | query?, brand?; 검색 화면으로 연결. 기본 브랜드 흉흉 |
| FilterBar | src/components/ui/filter-bar.tsx | value: IncidentFilterSelection, onChange(value); 화면 상태로 제어 |
| IncidentFilterControls | src/components/ui/incident-filter-controls.tsx | URL 필터를 읽고 변경. useSearchParams를 쓰므로 Suspense 안에 배치 |
| IncidentBadges | src/components/ui/incident-badges.tsx | category, status; 공용 한글 라벨과 색상 |
| BottomNav | src/components/ui/bottom-nav.tsx | 현재 경로에 따른 활성 표시·지도/목록/제보 이동 |
| AppShell | src/components/layout/app-shell.tsx | 공용 레이아웃. 지도·목록에 검색/필터, 상세·제보에서는 검색/메뉴 숨김 |

Figma 기준 노드: 검색 헤더 `18:2360`, 필터 행 `18:2368`, 상태 드롭다운 `45:3691`, 배지 `18:2408`·`18:2410`, 메뉴 `18:2428`. 정적 SVG는 `public/figma/shared/`에 로컬 보관하며 원본 치수를 유지한다.

확인용 `/ui-preview`는 공용 요소를 보여주는 개발 미리보기다. 서비스 메뉴에는 노출하지 않는다.

## URL 필터와 사건 필터

`src/features/incidents/filter-selection.ts`의 API를 사용한다.

| URL 키 | 허용값 | 의미 |
| --- | --- | --- |
| q | 문자열 | 검색어. 앞뒤 공백 제거 |
| category | society, security, politics, international | 사건 카테고리 |
| status | ongoing, publicized, closed | 진행 중·공론화 성공·종결 |
| period | 1w, 1m, 3m | 최근 7·30·90일. 달력 월이 아닌 고정 일수 |

- `readFilterSelection(params)`: URL을 읽고 알 수 없는 분류·상태·기간을 무시한다.
- `writeFilterSelection(value, existing?)`: 선택을 URL로 만들고 나머지 파라미터를 보존한다. 입력 params를 변경하지 않는다.
- `toIncidentFilters(value, now?)`: 기간을 ISO UTC since로 변환한다.
- `filterIncidents(incidents, filters)`: 검색·카테고리·상태·시작 일시를 적용한다.

```tsx
const selection = readFilterSelection(new URLSearchParams(searchParams));
const results = filterIncidents(incidents, toIncidentFilters(selection));
```

상태 변경 시 페이지 번호처럼 필터 결과에 종속되는 파라미터는 호출하는 화면에서 초기화한다. 일반 어댑터는 화면별 파라미터를 지우지 않는다. API에서도 같은 필터 계약을 쓰되 서버에서 입력과 접근 권한을 별도 검증한다.

필터 아이콘 버튼은 기간·카테고리·상태를 초기화하며 검색어는 보존한다. 검색 전체 삭제는 검색 화면에서 처리한다. 드롭다운은 라디오 선택, Escape, 바깥 클릭·포커스 이동으로 닫힌다.

## 사건 모델

`src/features/incidents/types.ts`의 기존 Incident와 IncidentFilters를 유지한다. id, title, summary, category, status, occurredAt, location, source, timeline이 필수이며 imageUrl은 선택이다. 날짜는 시간대가 있는 ISO 8601 문자열이다. 출처 URL은 실제 기사 링크가 확인됐을 때 사용한다.

한글 라벨은 `labels.ts`에서 가져온다. 소방·교통·미제 등 다른 시안의 표현을 독립적으로 enum에 추가하지 않고 공용 계약 변경으로 조율한다. 브랜드도 최종 확인 전까지 흉흉을 기본값으로 유지한다.

지도 SDK·뉴스 수집·API 응답 형식·제보 저장소는 이번 계약에 포함하지 않는다.
