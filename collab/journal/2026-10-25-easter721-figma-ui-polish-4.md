# codex/figma-ui-polish · easter721 · 2026-10-25
- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- supersedes loading-feedback 이전 완료 뒤 ab52ab4 원격CI 재검색1개가60초timeout → 최종후속검증과현재PR의CI를완료기준으로사용할 것
- changed src/proxy-navigation.test.ts 테스트마다context를닫고재검색은RSC200응답·실제새결과/offset20/끝/busy종료로완료확인 → 무기한스트림EOF대기와테스트간열린페이지공유를복구하지말 것
- rule src/proxy-navigation.test.ts 재검색전체60초상한·모든기존기대값유지,실패phase/진행중요청진단추가 → 시간상한확대/검증생략으로CI를통과시키지말 것
- done loading-feedback-ci 제품런타임파일은56d4c1c와동일·회귀9개/전체150개gateexit0·포맷린트소스Git불변통과 → 기존BuildpRhNY7upYLIiB9oD27vRG의91개브라우저/31캡처를같은제품근거로사용할 것

## 남은 것
- PR45 사용자 리뷰 대기. 외부댓글·리뷰요청·승인·머지·Draft변경은 수행하지 않는다.
- 직접 공유 주소의 첫HTML이전 HTTP대기는기존대로유지한다. NoJS본문/SEO/실제404를약화하지않는다.
- 원래 checkout의 사용자 next-env.d.ts 변경과 dev는 보존했다. QA31147/41147은이미종료했다.
