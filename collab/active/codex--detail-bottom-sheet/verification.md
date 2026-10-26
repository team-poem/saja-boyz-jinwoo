# 상세 바텀시트 최종 검증

- 앱: Next16.3.8 / React19.3.0 / Node24.19.0.
- Sobaya pin: 0d051213e7fc1bb869474c2ad144e08cd9a09dd2. 실제 step 워커 실행 이후 Canon 직접 RED→GREEN/refactor와 전체 contract_gate를 사용했다. 엔진은 수정하지 않았다.
- 전체 선언 테스트133개 통과, 실패/스킵0. 신규10개이며 기존 검증은 경로/404 메타 역할에 맞춰 보존했다. 최종 원본 결과는 evidence/final/sobaya-suite.json.
- 포맷 통과, 린트 오류0/기존 경고3, 타입 검사 및 실제 Turbopack production 빌드 통과.
- 최종 production build ID: 6nDbQNkL0u5Ahh6BxQ5Pf.
- Chrome headless:17개 시나리오178개 검증 통과, pageerror/SVG404/제외 항목0. 합성 기사61개와 격리 Naver SDK stub을 사용했다.
- 지도1/2/12건·SDK1개·기본456px/확장803px·드래그·Tab/Space·배경/포커스/스크롤/히스토리·같은 지역 기사 replace·공유 성공/취소/복사/수동복사·API 재시도·이미지 실패·320/393/768/1440px 검증.
- 일반·Google·Facebook·Twitter·Kakao 조건에서 기사별 서버 HTML/metadata 확인. 검색→상세 index와 닫힌 검색 noindex 복원, 실제404/통신오류 구분, JS 없는 유효 본문과 없는 기사 안내·퇴로·원주소/쿼리 보존 확인.
- 직접 유효 상세 GET/HEAD는 API2회(Proxy 확인1회 추가). 실제404는1회, 잘못된 ID는0회. 두 조회는 각각5초 제한이며 RSC는 Proxy 확인을 생략한다.
- Figma19:2865/504:269를 현재 개인 계정에서 다시 조회해393×852의 반경24·패딩/간격16·핸들36×4·이미지361×140·공유48을 대조했다. API에 없는 상태/분류/정확 위치/언론사 로고를 만들지 않았다.

## 재현

별도 터미널에서 fixture.mjs를 실행한 뒤 NEWS_API_BASE_URL=http://127.0.0.1:41043 및 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=qa-fixture로 앱을 빌드/31043 포트에 시작한다. QA_APP에 워크트리 절대 경로를 전달해 browser-qa.mjs를 실행한다. QA_RUN으로 결과 하위 디렉터리를 정하며 기본 출력은 /private/tmp/hyunghyung-detail-qa다. 로컬 Chrome과 앱의 playwright-core/jsdom을 사용하고 외부 지도/기사 요청은 차단한다.

## 검증 한계

운영 API·실제 Naver SDK 타일·물리 기기의 네이티브 공유창은 이번 합성 검증에 포함하지 않았다. 네이티브 공유는 브라우저 계약의 성공/취소/실패를 stub으로 검증했다. 운영 배포와 실제 기기 확인은 리뷰 후 별도로 진행한다.

## 수정 중 발견한 회귀

포커스 상실, 실제404 대신200, JS 없는 본문 숨김, 검색 noindex/메타 잔존, 닫기 hit 영역 겹침, NoJS404 빈 문서, rewrite404 hydration 오류를 각각 재현하고 수정했다. 중간 실패와 최종 성공은 browser-history.json에 구분했다. 단위 회귀의 두404 segment 형태와 실제 브라우저 무오류 확인을 함께 유지한다.
