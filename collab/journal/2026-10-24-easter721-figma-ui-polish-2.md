# codex/figma-ui-polish · easter721 · 2026-10-24 후속

- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- changed src/components/layout/app-shell/app-shell.tsx 목록 실제 링크의 고정 헤더·하단 메뉴 스크롤 여백 적용 → 제목·원문과 상세 복귀의 양방향 키보드 포커스 가림을 함께 확인할 것
- changed src/app/(browse)/@background/search/page.tsx 검색 결과 기사 링크의 상단12px/하단84px+safe-area 여백 적용 → 검색어·opener·스크롤 복귀와 하단 메뉴 가림 회귀를 유지할 것
- changed src/features/article-detail/ui/detail-sheet/detail-sheet.tsx footer가 관련 보도 뒤 동일 본문 scroller에 위치하며 onHeightChange의 선택적 두 번째 인자로 expanded를 보고 → 고정 공유 영역을 복구하거나 높이 임계값으로 펼침을 추정하지 말 것
- changed src/features/article-detail/ui/article-route-host/article-route-host.tsx 홈 상세 확장 중 배경 검색 헤더만 숨김 → 지도 DOM·접기·닫기·포커스와 body lock 수명을 유지할 것
- changed src/app/incidents/[id]/page.tsx 출처 라벨·도메인·아이콘 분리와 텍스트만 밑줄·긴 도메인 줄임 → 안전한 실제 href·전체 접근 이름과 새 탭 보호를 유지할 것
- added public/report/close.svg 최신 Figma508:695의24px 닫기 SVG → 제보에서 재사용하며44px 조작 영역과 투명 배경을 보존할 것
- changed src/proxy-navigation.test.ts 실제 Next 빌드를 재사용하는 fixture에 목록·검색 키보드/상세 복귀와 검색 정렬 회귀 추가 → 기존 RSC·404·요청 수·시간 제한 기대값을 약화하지 말 것

## 검증
- 소바야 pin0d05121에서 회귀5개를 RED→GREEN으로 추가해 전체140개 통과, 실패·생략0. 포맷·린트·소스/Git 불변 통과.
- 제품 소스36ac745, production Build0yLuwuFKYffar7_ftmQYn에서 타입·빌드 통과. 최종 실제 브라우저 시각/동작37개 실패0·page error0·실제 Naver 타일200 응답133개·원본 캡처17장.
- 초기 QA의 검색 하단 가림은 신규 회귀로 수정했다. fixture 근거 field 오류와 잘린 inline bounding hit-test 오탐은 최종 제품 결함/합격 수와 구분했다.
- 근거는 collab/active/codex--figma-ui-polish/evidence/review-followup/에 보존한다. 이번140개와 이전 후보135개·이전 브라우저 수치를 혼합하지 않는다.

## 남은 것
- PR45 재검토·승인 후 dev로 squash merge. 외부 코멘트·태그·재리뷰 요청은 게시하지 않았으며 사용자에게 문구를 먼저 보여준다.
- 모바일 OS 키보드·권한 창·실기기 safe-area는 미검증. OS 이모지·합성 데이터·API 미제공 정보 차이를 픽셀 일치로 주장하지 않는다.
- 기존 공유 URL·서버 본문·SEO·실제404와 Naver 지도는 유지한다. Google 전환은 키·Map ID를 받은 뒤 별도 실제 SDK 검증이 필요하다.
- 이슈42와 main 통합·Figma 미정 API/완료 화면은 이전 인수인계 범위 그대로다.
