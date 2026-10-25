# codex/figma-ui-polish · easter721 · 2026-10-24

- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- changed next.config.ts skipProxyUrlNormalize로 실제 RSC 헤더를 Proxy까지 유지 → 직접 문서404 확인과 내부 단일 조회 회귀를 함께 유지할 것
- changed src/features/article-detail/ui/detail-sheet/detail-sheet.tsx active=false인 시트는 숨긴 DOM·읽던 위치를 보존하고 포커스/스크롤 잠금 효과를 중지 → 그룹 선택을 상세 진입 때 unmount하지 말 것
- changed src/features/map/ui/map-home/map-article-sheet.tsx 포털 기사 링크도 공통 상세 진입으로 opener 보존 → 수정키·새 탭의 기본 링크 동작 유지
- removed src/components/layout/service-intro.tsx 디자인에 없는 홈 소개·목록 부가 링크 행과 캐러셀 배경 제거 → 공개about/archive·sitemap·메타데이터를 삭제하지 말 것
- added src/components/layout/site-structured-data/site-structured-data.tsx 시각 요소 없이 기존WebSite JSON-LD 보존 → 홈 준비/정상 화면에서 재사용
- changed src/features/map/ui/map-article-carousel/map-article-carousel.tsx 최근 카드4개만 표시 → 지도 원 집계에 쓰는 전체 기사를 제한하지 말 것
- changed src/features/search/ui/keyword-link-status/keyword-link-status.tsx idle 공간 제거·pending 오버레이 → 사용하는 링크의relative 컨테이너와 로딩 중 크기 보존 유지
- changed src/app/report/page.tsx 헤더/제출sticky 및 form의입력·첨부·버튼scroll-margin → 작은 화면Tab 포커스가 고정 UI에 가리지 않는지 확인할 것
- added src/features/map/ui/map-home/naver-map-sdk.ts 실제 네이버 SDK 타입·로드 주소 분리 → 일반 좌표/지역 집계/숫자원 UI를 공급자 타입과 결합하지 말 것
- rule docs/figma-analysis.md 최신노드·치수·미정화면 구분 갱신 → 빈508:637을 완료화면으로 발명하거나 과거 독립 상세를 복구하지 말 것
- done collab/active/codex--figma-ui-polish/issue-42-analysis.md 이슈42는 기본main의과거lock 기준 자동알림 → main통합/버전 검토와 UI버그를 구분할 것

## 검증
- 소바야 pin0d05121 전체gate135통과·실패0·생략0, Format/Lint·소스/Git불변 통과. 빌드TypeScript 포함 성공.
- 실제RSC1GET/5.375초·다건803px/scroll1917/10번째링크 복귀 등185브라우저검증, 디자인116, 최종Tab46, 실제Naver17 검증 통과. 근거는claim의evidence/에 보존.

## 남은 것
- dev PR 리뷰·승인 후 squash merge. 외부 코멘트는 사용자에게 문구를 먼저 보여준다.
- 실제 모바일OS 키보드/위치권한 창은 미검증. Google은 키·Map ID를 받은 뒤 실제SDK 연결·전환 검증 필요.
- main은 이 작업에서 갱신하지 않았다. 기본main의소바야pin과 이슈42는 별도 통합/버전 검토 범위다.
- 서비스소개 새 메뉴 위치·분류/상태 API 계약·빈제보 완료 디자인은 Figma/제품 측 미정이므로 임의 구현하지 않았다.
