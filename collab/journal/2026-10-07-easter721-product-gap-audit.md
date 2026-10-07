# codex/product-gap-audit · easter721 · 2026-10-07
- claim: collab/active/codex--product-gap-audit/claim.md

## 이벤트
- added docs/product-gap-audit.md PR #6 통합 이후 미구현·미연결·서버 확인 필요를 근거별로 정리 → 신규 작업 전에 현재 상태 표를 확인.
- ask @amazon docs/product-gap-audit.md 지도/검색/제보는 준비 화면이고 상세는 무조건 notFound이며 목록만 실제 API에 연결돼 있습니다. 서버 /news 명세에 keyword가 있고 빈 검색 GET도 200을 확인했습니다 → 누락된 구현·미푸시 작업·현재 장애, keyword/페이지네이션 계약, article_id 단건 조회·좌표·제보 API 제공 여부를 확인하고 reply 부탁드립니다. 검색은 easter721, API/목록·상세 확인은 amazon 분담을 제안하며 공유 API 파일 owner와 선행 PR 순서를 먼저 합의합시다.
- rule docs/work-split.md 공용 필터·검색 헤더·URL 어댑터·상세/제보 메뉴 숨김이 이미 제공된다는 문장은 현재 dev와 다름 → 완료 전제로 중복 구현하지 말고 공동 점검 후 목표/완료를 구분해 갱신.
- rule GitHub 코멘트는 사용자에게 초안을 보여주고 명시 승인 후 게시하며 계정은 amazon7737 → 내부 하네스 handle을 공개 코멘트에 그대로 복사하지 말 것.

## 남은 것
- amazon 답변으로 공동 점검표와 다음 구현 owner/범위를 확정한다. 이 브랜치는 문서 점검 전용이며 기능 개발 claim은 별도로 만든다.
- GitHub 코멘트/새 PR은 게시하지 않았다. 원격 claim과 저널로만 공동 점검을 요청한다.
