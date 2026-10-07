# PR #6 이후 기능 현황 공동 점검

2026-10-07, 기준 dev `d1c0f0cc01783363ca569be1542b7fe60b464dab`. 점검 claim: `codex/product-gap-audit`, owner: easter721. 구현 착수 claim이 아닌 공동 현황 확인이다. GitHub 계정은 **amazon7737**, 협업 하네스 내부 handle은 **amazon**이다. 내부 이벤트를 GitHub 코멘트로 그대로 복사하지 않는다.

## 확인된 현황

| 영역                   | 현재 상태와 근거                                                                                 | 남은 작업                                                                | 기존 분담에 따른 제안                           |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------- |
| 지도 홈 `/`            | src/app/page.tsx는 FoundationPanel만 렌더                                                        | 지도 SDK·키·좌표 계약, 마커/클러스터·내 위치·선택 카드                   | easter721, 지도 제공자·데이터 선행 결정         |
| 검색 `/search`         | src/app/search/page.tsx는 설명만 렌더                                                            | 검색 입력·URL 상태·결과·빈 결과/실패/로딩, 최근 검색                     | easter721, 우선 후보                            |
| 기사 목록 `/incidents` | 실제 GET /news, offset=0/limit=20 고정. src/features/article-list/api/fetch-articles.ts          | keyword 연결·추가 페이지·총수/중복 기준 합의                             | amazon과 검색 담당이 API 공유 변경 순서 협의    |
| 상세 `/incidents/[id]` | src/app/incidents/[id]/page.tsx는 무조건 notFound()                                              | 기사 식별자 조회 계약·상세·출처·공유·뒤로가기. 타임라인 데이터 별도 필요 | amazon, API 단건 조회 가능 여부부터 확인        |
| 제보 `/report`         | src/app/report/page.tsx는 설명만 렌더                                                            | 입력·검증·첨부·저장·제출 결과·권한/검토 정책                             | amazon, 저장 API 및 정책 먼저 확인              |
| 공용 탐색/필터         | AppShell은 브랜드·검색 링크·고정 메뉴만 렌더. src/components/ui 없음                             | 검색/필터 UI, URL 어댑터, 경로별 메뉴 상태·상세/제보 레이아웃            | easter721, 실제 첫 사용 기능에 필요한 만큼 구현 |
| 사건 모델              | Incident와 filterIncidents는 있지만 실제 기사 조회에 미연결                                      | 기사와 사건 의미를 구분하고 없는 위치·분류·발생 시각을 추정하지 않을 것  | 양측 확인                                       |
| 오류/이미지/스타일     | PR #5/#6 및 기존 테스트 범위 구현. API 실패는 null+재진입 링크, 이미지 실패는 해당 이미지만 대체 | 기능 추가 시 현재 계약 보존. 오류 메시지 세분화는 별도 결정              | 완료 기반으로 재사용                            |

이는 주로 **미구현/미연결**이다. 코드로 확인한 준비 화면과 상세의 무조건 notFound를 새 회귀 버그로 부르지 않는다. 이번 점검에서는 새 사용자 상호작용 오류를 브라우저로 재현했다고 주장하지 않는다. 운영 프런트 URL·배포 상태는 별도 확인 필요다.

## API 직접 확인

읽기 전용 요청만 수행했다. 수집 POST·제보·운영 설정 변경 없음.

- `GET https://poem-news.168.107.37.12.sslip.io/health`: HTTP 200, status ok.
- `GET /openapi.json`: HTTP 200. `/news`에는 **keyword**(title/description, 대소문자 무시 검색), offset, limit이 명시되어 있다. 프런트는 아직 keyword를 보내지 않는다.
- `GET /news?offset=0&limit=20`: HTTP 200. 점검 시점 total=4, items=4, 고유 article_id=4. article 내부에 title/originallink/link/description/pubDate 존재. image_status는 disabled/ready 관측. 이 수치는 전체 운영 데이터 보장이 아니다.
- `GET /news?keyword=codex-no-match-20261007-83af28d&offset=0&limit=20`: HTTP 200, total=0, items=[]. 한 빈 검색 표본이며 검색 품질 전체 검증은 아니다.
- 명세에 image_status enum은 disabled/pending/generating/ready/failed이며, ready 상대 JPEG URL과 ID 64자리 패턴이 명시되어 있다.
- 공개 명세의 경로는 health, collections, collections/{id}, news, images/{articleID}.jpg이다. 기사 단건 조회·제보·좌표 검색 경로는 이 명세에서 확인하지 못했다. 서버에 절대 없다는 의미는 아니다. collections/{id}는 collection 조회이며 기사 상세 API로 동일시하지 않는다.
- article의 세부 필수 필드·날짜 형식, 페이지네이션 기본값/상한, 정렬/total, 인증·오류 정책은 여전히 문서 보강 필요. 기존 amazon 저널의 total=중복 포함 수집 행 규칙을 유지한다.

[Swagger](https://poem-news.168.107.37.12.sslip.io/docs), [현행 프런트 소비 계약](news-api-contract.md).

## 문서와 구현의 차이

- work-split.md와 ui-contract.md에 공용 검색 헤더·필터·URL 어댑터, 상세/제보에서 메뉴 숨김 등이 제공된다고 적혀 있으나 현재 dev에 구현되어 있지 않다. 두 문서는 이 부분에서 완료 사실이 아니라 목표로 읽어야 한다.
- work-split.md의 ‘amazon 시작 미확인’·CSS Modules 권장은 이후 PR 진행과 Tailwind 전환 이전 기록이다.
- project.md의 ‘현재 라우트는 개발 준비 화면’은 기사 목록에는 더 이상 맞지 않는다.
- 과거 분담과 상대 계획을 임의로 확정하지 않도록 기존 문서를 전면 수정하지 않았다. 공동 확인 후 현재 상태로 갱신할 항목이다.

## 공동 확인과 권장 순서

1. **양측 현황 확인**: 이 표에 누락된 서버 기능·미푸시 작업·운영 장애가 있는지 답변 받는다. 점검 당시 GitHub 열린 PR과 digest의 동료 활성 claim은 없었지만 로컬 작업 부재까지 보장하지 않는다.
2. **검색을 첫 사용자 흐름으로 완성**: 서버 keyword가 있어 진입점·결과·로딩/실패/빈 상태를 연결하기 가장 수월하다. easter721이 검색 화면을, amazon이 keyword/페이지네이션 계약과 목록 호출 영향도를 확인하는 분담을 제안한다. 기존 API 파일을 동시에 수정하지 말고 먼저 공유 API 변경 owner와 선행 PR을 정한다.
3. **목록→상세 흐름**: amazon이 단건 기사 조회 방법을 확인한 뒤 별도 구현 claim. 전체 목록을 뒤져 상세를 임시 복원하는 방식은 계약 없이 시작하지 않는다.
4. **지도**: SDK·좌표/위치 출처를 확정한 뒤 easter721 claim. 뉴스 title에서 위치를 임의 추정하지 않는다.
5. **제보**: 저장·첨부·권한·검토 정책이 준비되면 amazon claim. 실제로 저장되지 않는 제출 버튼을 완료로 표시하지 않는다.

이는 제안이며 상대의 claim을 대신 작성하거나 합의 완료로 간주하지 않는다. 신규 기능·테스트 초안은 기능별 sobaya 승인 절차로 진행한다. 테스트 통과와 제품 완성도는 별개다.

## 기준 검증

- 최신 dev 코드에서 `pnpm run build` PASS, `pnpm test` 7파일 28테스트 PASS.
- API ready 이미지 표본 1건 GET HTTP 200, image/jpeg, JPEG 시작 바이트 확인. 모든 이미지가 정상이라는 의미는 아니다.
- 소스·의존성·테스트 변경 없음. 브라우저 사용자 흐름/배포 프런트 검증은 이번에 수행하지 않았다.
