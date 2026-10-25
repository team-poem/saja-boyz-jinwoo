# codex/figma-ui-polish · easter721 · 2026-10-25

- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- added src/components/ui/icon/icon.tsx 서버/클라이언트 공용 장식 SVG와8/12/14/16 역할 크기 → 일반 inline 아이콘에서 OS 이모지 대신 재사용하며 독립 자산 크기는 유지할 것
- added src/components/ui/icon-text/icon-text.tsx 중앙 정렬·수축 방지·텍스트 min-width0·gap4/6/8와 suffix 지원 → 아이콘/텍스트를 직접 공백으로 붙이지 말고 긴 문자열·접근 이름을 유지할 것
- changed src/app/globals.css 공통 아이콘 크기·간격 토큰 추가 → 메타정보/액션/좁은 표시 역할을 구분하고 전역 span/svg 크기로 덮지 말 것
- changed src/features/map/ui/map-unavailable-filter/map-unavailable-filter.tsx 고정82/60px 버튼의 표시8px·안쪽 패딩10px 적용 → 24시간 기간과 함께 실제 글자/아이콘 겹침을 확인할 것
- added src/app/icon.png 승인된 흉흉 심벌의96px 검색용 PNG와 head 메타데이터 → SVG·ICO·Apple·OG와 실제 브라우저 decode를 함께 유지할 것
- added scripts/generate-brand-icons.mjs 같은 SVG에서 PNG96/Apple180 재생성 → 정상ICO는 덮어쓰지 말고 새 패키지·수동PNG인코더를 추가하지 말 것
- changed src/app/apple-icon.png 중복 반원·하단 잘림 수정 → 브랜드 픽셀 회귀의 단일 윤곽/여백을 유지할 것
- rule src/proxy-navigation.test.ts favicon decode는 네트워크 가로채기 없는 일반 BrowserContext로 검증 → ICO의 가로채기 조건 실패를 제품 결함으로 오인하지 말 것
- rule docs/search-discovery-audit.md 운영 invalid200과 현재PR404·서버 본문/출처·파비콘 점검 구분 → 배포 후 실제404와 변경된 PNG/Apple을 확인할 것

## 검증
- 소바야 pin0d05121에서 추가 회귀3개 RED→GREEN, 전체143개 실패·생략0. 포맷·린트·소스/Git불변 통과.
- 제품e39f064, production BuildXRLrbvZf66XLorkUFX5Fp의 타입/빌드·새51개 실패0·pageErrors0·캡처19장. 실제 Naver와4형식 favicon HTTP/head/decode 확인.
- UI 치수116개는8393 후보의 별도 결과이며 최종UI TypeScript/TSX/CSS의 Git blob 동일성을 기록했다. 129/이전후보 수치를 최종51개와 합산하지 않는다.
- ICO 정상 바이트를 보존했다. 초안 버튼명·QA status API·가로채기 조건의 오인을 실제 제품RED와 분리하고 새 실패/성공 근거를 보존했다.

## 남은 것
- PR45 재검토·승인 후 dev squash merge. 외부 댓글·태그·재리뷰 요청은 게시하지 않았으며 문구를 먼저 사용자에게 보여준다.
- 운영 invalid200은 아직 PR 배포 전 상태다. 배포 후 실제 GET/HEAD404와 새PNG96/Apple HTTP·픽셀·아이콘 태그를 재확인한다.
- 실제 모바일OS 권한창·키보드·safe-area는 미검증. Naver 유지/Google키 후 전환 및 미정 API 계약은 기존 범위 그대로다.
