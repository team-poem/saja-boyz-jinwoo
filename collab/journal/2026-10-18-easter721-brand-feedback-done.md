# codex/brand-feedback · easter721 · 2026-10-18
- claim: collab/active/codex--brand-feedback/claim.md

## 이벤트
- added src/components/feedback/notice.tsx 공통 상태 안내에 제목·본문·액션과 status/alert/group 역할 및 선택적 h1을 제공 → 새 빈 상태·오류 안내는 기존 컴포넌트를 재사용하고 오류 사유와 액션을 한 그룹으로 유지할 것.
- changed src/features/map/ui/map-home/map-home.tsx 위치 오류에서 직접 재요청하고 pending 중 중복 요청을 막으며 액션·포커스를 유지, 안내는 하단 컨트롤 위 가용 높이에서 스크롤 → 기존 최초 요청·StrictMode·뷰포트 복원·SDK 수명·지연 응답 차단과 포커스 소유권을 유지할 것.
- removed src/features/map/ui/map-home/map-home.tsx 지도 출처·기사 위치 보기 행과 fitArticles 동작 제거 → UI나 자동 fit을 다시 추가하지 말 것.
- changed src/app/about/page.tsx 기상청 지역 대표 좌표 출처 링크를 서비스 소개로 이동 → 지도에서 삭제했어도 이 출처와 기사 선택 시트의 위치 한계 안내는 유지할 것.
- changed src/app/report/page.tsx 상태 안내 표현만 공통화 → 입력·첨부·재시도 키·불확실 상태와 실제 접수 확인 이후 성공 계약은 유지할 것.
- supersedes collab/journal/2026-10-18-easter721-brand-feedback-review.md 리뷰 보완 승인 대기·review_pending 기록은 새 승인과 구현·검증으로 해소됨 → 이 최종 기록과 증거를 기준으로 리뷰할 것.
- supersedes collab/journal/2026-10-18-easter721-brand-feedback-review-2.md 로딩 중복 보완 승인 대기·review_pending 기록은 새 승인과 구현·검증으로 해소됨 → 이 최종 기록과 증거를 기준으로 리뷰할 것.
- done 위치 재시도·전반 상태 표현·지도 행 제거 및 리뷰 보완 구현, 전체123·Chrome64·빌드·소바야 독립 리뷰 통과(184f6ca4c45200d779c0654030a058dd6c76eb63) → dev PR에서 리뷰할 것.

## 남은 것
- dev PR 필수 CI와 사람 리뷰·머지. GitHub 코멘트·멘션·리뷰 요청·승인·머지는 수행하지 않음.
- 실제 기기 OS 권한창·실제 제보 전송은 이번 테스트 대상이 아님.
- 소바야 plan을 최종 메타데이터 커밋에서 보관하므로 이 브랜치에서 이후 소바야 명령을 실행하지 말 것.
