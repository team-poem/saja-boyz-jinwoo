# codex/figma-ui-polish · easter721 · 2026-10-25
- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- changed src/features/article-detail/ui/detail-sheet/detail-sheet.tsx 정상기사고정height를auto·펼침max70dvh/접힘max53.52dvh로변경 → 짧은기사의아래공백이나거의전체화면height를복구하지말 것
- changed src/features/article-detail/ui/detail-sheet/detail-sheet.tsx reading을flex-auto/min-h-0·내용수축방지로두고공유mt-auto제거 → 긴본문만내부스크롤하고공유는본문자연흐름에둘 것
- rule docs/figma-analysis.md 사용자지시로정적456/803px를반응형상한으로해석·현행확장504:502는height없는flex → 기존asset/p16/gap16/이미지140/공유48과초기모드/포커스/높이observer를유지할 것
- done adaptive-sheets 제품9f33c54·Build3az_4QQ5E5r7rXctQkgo6·소바야151/gateexit0·빌드타입·Chrome120/미완료실패0/캡처11 → 현재정상기사높이는새adaptive-sheets증거로판단하고이전loading캡처를현재높이로해석하지말 것

## 남은 것
- PR45 사용자 리뷰 대기. 원격 최종 CI는 PR 최신 커밋의 체크를 기준으로 확인한다. 댓글·리뷰요청·승인·머지·Draft변경은 수행하지 않았다.
- 필터·공유주소·서버본문·SEO·실제404·네이버SDK는 유지했다. 직접주소첫HTML이전대기는기존대로다.
- QA31148/41148은소유확인후종료했고원래checkout의사용자next-env.d.ts와dev는보존했다. 모바일OS권한창/키보드/safe-area는이번데스크톱검증범위밖이다.
