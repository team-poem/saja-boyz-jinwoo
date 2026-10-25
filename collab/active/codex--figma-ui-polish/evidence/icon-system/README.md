# PR45 공통 아이콘·브랜드·검색 발견성 보완

- 제품 소스: `e39f064d49c4aa10daed38c221c95389620b1156`
- 최종 production Build: `XRLrbvZf66XLorkUFX5Fp`
- 소바야 pin0d05121: 이전140개에 회귀3개를 RED→GREEN으로 추가해 **전체143개 통과·실패0·생략0**. 포맷·린트·소스/Git 불변 통과. 기존 ESLint 경고3개 외 신규 오류·경고는 없다.
- 실제 지도 설정을 포함한 production 빌드·TypeScript와 새51개 검사 실패0·5묶음 완료·브라우저 오류0. 최종 UI18장·자산표1장을 보존했다.

## 구현과 디자인 기준

`Icon`·`IconText` 두 컴포넌트와 `globals.css` 토큰으로 일반 inline 아이콘을 관리한다. 폰트 이모지·문자 공백에 의존하지 않는다. 표시용8px, 날짜/출처12px, 일반14px, 공유16px와 gap4/6/8px를 구분한다.

상세 날짜·위치·출처·공유부터 지도 선택 위치·최근 기사, 검색·최근/추천 키워드·필터·제보 위치에 적용했다. 중앙 정렬·수축 방지·긴 문자열 줄바꿈/말줄임을 공통화하며 실제44/32px 조작 영역과 접근 이름·안전 원문 URL·공유·제보 계약을 보존한다. 좁은 필터의 화살표는8px로 분리하고 안쪽 패딩을 조정했다. 브랜드·지도 마커·메가폰·독립버튼·스피너·네이티브 날짜 선택기는 목적별 기존 크기를 유지한다.

Figma504:502의 컬러 이모지에서 공통 SVG로 변경한 것은 사용자의 추가 요청에 따른 의도적 보완이다. OS 상태바·데이터/API 미제공 정보와 CSS 차이를 구분하며 완전한 픽셀 일치로 주장하지 않는다. [디자인 계약](../../../../../docs/ui-contract.md)과 [Figma 분석](../../../../../docs/figma-analysis.md)을 따른다.

## 로고와 favicon

승인된 흉흉 SVG에서96px PNG를 새로 만들고 반복/잘림이 있던 Apple180을 다시 생성했다. 정상 ICO16/32/48·SVG·OG는 보존했다. 생성기는 `node scripts/generate-brand-icons.mjs`이며 PNG96/Apple180만 쓴다.

최종 일반 BrowserContext에서 ICO/SVG/PNG96/Apple은 모두HTTP200·유효한 MIME·정사각 자연 크기48/48/96/180·실제 decode 성공이다. PNG96의 head 선언은image/png·96x96이다. [원본 자산표](app/favicon-assets.png), [PNG96](favicon-96.png), [Apple 전후](apple-before-after.png).

초기 네트워크 가로채기 컨텍스트의 ICO 실패를 제품 결함으로 오인했다. 일반 HTTP·Next 무가로채기 컨텍스트의 성공과 분리해 회귀를 수정했고, PNG96 누락만 RED로 다시 확인했다. 원래 ICO·Next 설정을 우회하지 않았다. [일반 HTTP 진단](ico-http-transport-diagnostic.json)·[Next 진단](ico-next-http-diagnostic.json).

## 검증 기록

- [회귀3개 RED→GREEN](tdd-cycles.json) · [전체143개](sobaya-suite.json) · [독립 검토](independent-review.md).
- [최종51개와 자산 decode](qa-report.json) · [캡처19장](capture-manifest.json) · [Figma 비교](comparison/).
- [UI 치수116개](ui-geometry.json)는 이전8393d30/BuildfwzXRin30pZvx7lF2HIuC의 결과다. 최종e39f의 UI TypeScript/TSX/CSS는 [Git blob 동일성](ui-source-equivalence.json)으로 확인했고, 자산만 바뀐 뒤 불필요한 치수 반복 없이 최종 캡처와51개를 새로 확인했다. 이전129개 및 다른 후보 수치를 최종51개와 합산하지 않는다.
- [빌드 출력](build-output.txt) · [서버/브라우저 정리](cleanup.json) · [재현 fixture](fixture.mjs.txt)·[브라우저 스크립트](browser-qa.mjs.txt). 실제Naver 타일200 응답133개를 확인했다.
- 고정 합성 위치·합성 기사61건(좌표15건)을 사용했다. 실제 제보 전송·개인 위치 사용은 없다. 모바일 OS 권한창·키보드·실기기 safe-area는 별도 확인 대상이다.

## SEO·AEO·GEO

[점검 기록](../../../../../docs/search-discovery-audit.md)에 실제 운영 HTTP·봇별 서버 본문/canonical/출처 JSON-LD·공유 메타데이터·robots/sitemap/archive/about·색인 정책과 공식 문서를 정리했다. 허위 기사 구조화 데이터나 임의 키워드 랜딩 페이지는 추가하지 않았다.

운영의 잘못된 기사 주소200+noindex는 현재 PR의404 처리가 아직 배포되지 않은 차이다. PR/로컬의404·JS 없는 본문과 운영 상태를 구분한다. 배포 후 실제404와 새 PNG/Apple 자산을 재확인해야 한다. 검색 순위·AI 답변 채택·검색결과 파비콘 노출을 보장하는 점검이 아니다.
