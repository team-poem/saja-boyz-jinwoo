# codex/detail-bottom-sheet · easter721 · 2026-10-23
- claim: collab/active/codex--detail-bottom-sheet/claim.md

## 이벤트
- migrated src/app/(browse)/ 지도·목록·검색 실 UI를 @background로 이동하고 children이 일반 메타데이터/기사 가로채기를 소유함 → 배경 슬롯에 metadata/catch-all을 추가하지 말고 실제 UI·로딩 import는 새 경로를 사용할 것.
- changed src/app/layout.tsx RouteShell이 browse 중복 shell을 방지하고 404 subtree의 shell 경로를 고정함 → /_not-found와 _not-found를 함께 처리해 rewrite hydration 일치를 유지할 것.
- added src/features/article-detail/ 공통 DetailSheet·ArticleRouteHost·실제 위치/동일 지역 보도 문맥 → 새 기사 진입은 기존 /incidents/{id}와 공통 시트를 재사용하고 원래 링크 포커스·배경 inert/스크롤 복구를 유지할 것.
- changed src/features/map/ui/map-home/ 단건은 URL 상세를 열고 2/12건 그룹 선택은 보존하며 실제 시트 높이로 조작 영역을 비움 → SDK를 재생성하거나 지도 중심·줌을 임의 변경하지 말 것.
- changed src/app/incidents/[id]/ 동일 서버 본문·메타/JSON-LD를 직접/내부 진입에서 재사용하고 목록 loading을 별도 배경에 둠 → 상세의 실제404·JS 없는 제목/요약/발행/출처와 검색 noindex 복원을 함께 검증할 것.
- added src/proxy.ts Next16.3.8의 NoJS 빈404를 직접GET/HEAD의 actual404/invalid만 정적 root404로 rewrite하여 우회함 → 정상 직접 접속 추가GET1회/각 조회5초 비용을 고려하고 RSC·503·설정/네트워크 실패는 없는 기사로 바꾸지 말 것. Next 수정 후 회귀를 통과시켜 제거할 수 있음.
- removed public/article-detail-close.svg 및 public/map/sheet-close.svg 대체된 상세 탐색/개별 시트 외형과 구형 아이콘을 제거함 → 공통 public/article-detail/close.svg를 사용할 것.
- migrated src/features/search/ui/keyword-link-status/ 배경 화면과 최근 검색이 공유하는 상태 표시를 기능 UI로 이동함 → app/search의 삭제된 모듈을 가져오지 말 것.
- changed tsconfig.json 불변 collab 제안/산출물의 과거 import를 제품 타입 검사에서 제외함 → 실제 src와 모든 src 테스트 검사는 유지할 것.
- rule docs/figma-analysis.md 10/17·10/22 히스토리와 현재19:2865/504:269 기준을 갱신함 → 삭제된 독립 상세11:2043/공유34:3311을 새 시안 기준으로 사용하지 말 것.
- done collab/active/codex--detail-bottom-sheet/evidence/final/ 선언 전체133개·hygiene·타입·productionbuild와17시나리오178검증/pageerror0을 확인함 → 최종 캡처·원본 결과와 검증 한계를 verification.md에서 확인할 것.

## 남은 것
- dev PR 리뷰 후 운영 API·실제 Naver SDK·물리 기기 네이티브 공유창을 배포 환경에서 확인한다. 이번 검증은 합성 기사61개와 격리 SDK/공유 stub이다.
- 직접 유입의 상세 API에는 위치가 없어 위치/같은 지역 보도 문맥을 생성하지 않는다. API 확장 없이 임의 주소·분류·상태·언론사·조회수를 채우지 않는다.
- Proxy 우회는 현재 Next 결함이 수정되면 JS 활성/비활성 실제404·원주소·퇴로·무오류 회귀를 먼저 통과시킨 뒤 정리할 수 있다.
