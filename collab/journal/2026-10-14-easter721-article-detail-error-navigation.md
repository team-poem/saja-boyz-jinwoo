# codex/article-detail-error-navigation · easter721 · 2026-10-14
- claim: collab/active/codex--article-detail-error-navigation/claim.md

## 이벤트
- added src/app/incidents/[id]/detail-navigation.tsx 정상·API 오류가 공유하는 전용 탐색 → 상세에서 목록으로(/incidents)·닫기(/) 경로와 접근성 이름을 유지할 것
- changed src/app/incidents/[id]/page.tsx API 오류에도 전용 탐색을 제공하고 기존 오류 안내·재시도를 유지 → 오류 화면에 전역 검색/주 메뉴를 추가하지 말 것
- added src/app/incidents/article-detail-error-navigation.test.ts 실제 상세+AppShell의 정상/오류6종 복귀 회귀 → 기존101개와 이 테스트를 함께 유지할 것
- done codex/article-detail-error-navigation Sobaya RED/GREEN102개·최종 gate·새 독립 리뷰·실제 브라우저 검증 완료 → 검증 소스 d974e9b34909e9f806fb9d39a5b76ecfdf185ccd의 세 src 파일을 PR19에 반영할 것

## 남은 것
- 별도 PR은 만들지 않는다. 원 PR19에 검증 src를 그대로 반영하고 소스 트리 일치·GitHub CI를 확인한다.
- 코멘트는 사용자에게 초안만 보여주며 게시/태그/재리뷰 요청은 승인 없이 하지 않는다.
- 상세 API·5초 제한·404·이미지·공유는 변경하지 않았다. 전체 디자인 본문 재구축과 미선택 메뉴 대비 권고는 후속 범위다.
- 독립 리뷰 source HEAD d974e9b34909e9f806fb9d39a5b76ecfdf185ccd 뒤 이 마지막 커밋은 저널·claim·검증 증거·계획 보관만 변경한다. 보관 뒤 Sobaya 명령을 다시 실행하지 않는다.
