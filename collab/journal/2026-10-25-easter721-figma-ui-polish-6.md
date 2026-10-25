# codex/figma-ui-polish · easter721 · 2026-10-25
- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- supersedes collab/journal/2026-10-25-easter721-figma-ui-polish-5.md 사용자 최종 지시가70/80dvh 후보를 대체함 → 아래 기본·수동 확장 정책과 sheet-snap 증거를 기준으로 판단할 것
- changed src/features/article-detail/ui/detail-sheet/detail-sheet.tsx 모든 진입은 내용 auto/max53.52dvh로 기본 접힘, 실제 위 드래그는100dvh−max(49px,safe-top) 높이·아래 드래그는 기본 복귀 → 초기 near-full이나 공유 mt-auto 공백을 복구하지 말 것
- changed src/features/article-list/ui/article-image/article-image.tsx showAiCaption 기본false, 지도 선택 시트만true이며 이미지 아래 작은 안내 표시 → 일반 목록/carousel 배지를 추가하지 말고 이미지 실패·없음에는 캡션도 숨길 것
- rule docs/ui-contract.md 시트에서만 “AI로 생성된 이미지입니다.” 표시, 이미지 wrapper 밖 캡션을 스켈레톤이 덮지 않음 → 공통 이미지 사용처는 표시 범위와 크기를 유지할 것
- changed src/app/incidents/article-detail-sheet.test.ts 기본 접힘 기대값과 시트 전용 안내 정책을 반영하고 기존 공유·복귀·404 조건 유지 → @amazon 월간 인기 기사 브랜치와 합칠 때 해당 정책을 보존할 것
- done collab/active/codex--figma-ui-polish/evidence/sheet-snap 소바야151/gate exit0·production 빌드/타입·실제 Naver224개/실패·미완료·pageErrors0/캡처14 → 현재 높이와 문구는 소스6c6c23b/BuildXqX4ZJdwETDiiPENL9Q0h의 새 증거로 확인할 것

## 남은 것
- PR45 사용자 리뷰 대기. 최종 원격 CI는 최신 head의 실제 체크를 확인한다. 댓글·리뷰 요청·승인·머지·Draft 변경은 하지 않았다.
- 아마존 codex/article-monthly-popularity와 목록·일부 테스트 파일의 미머지 커밋 겹침이 있다. 현재 편집 충돌은 없으며 먼저 머지된 쪽을 기준으로 뒤쪽에서 통합·재검증해야 한다. 동료 claim은 수정하지 않았다.
- 필터·공유 주소·서버 본문·SEO·실제404·네이버SDK를 유지했다. 직접 주소의 첫 HTML 이전 대기는 기존대로다.
- QA31151/41151을 소유 확인 후 종료했다. 원래 checkout의 dev/사용자 next-env.d.ts는 보존했다. 모바일 OS 권한 창·실기기 safe-area는 이번 데스크톱 검증 범위 밖이다.
