# codex/brand-feedback · easter721 · 2026-10-18
- claim: collab/active/codex--brand-feedback/claim.md

## 이벤트
- changed src/features/map/ui/map-home/map-home.tsx 작은 화면 안내 높이를 하단 컨트롤 위로 제한하고 재시도 중 액션·포커스를 보존함 → ResizeObserver·내부 스크롤과 사용자 포커스 소유권을 유지할 것.
- supersedes collab/journal/2026-10-18-easter721-brand-feedback-review.md 기존 두 리뷰 결함과 신규 테스트 승인 대기는 해소됨. 재리뷰의 로딩 중복 보완은 이 기록을 기준으로 이어갈 것.
- touching src/features/map/ui/map-home/map-home.tsx 재시도 중 제목·본문·버튼과 기존 내 위치 status의 로딩 중복을 보완할 예정 → 해당 부분 추가 편집 전 조율할 것.

## 남은 것
- a90ca70cfedbeb5766adfaa7f723c97567a18778: 전체123개 및 최종 gate 통과. 빌드·Chrome62개·캡처23개 통과. 기존27개 테스트 파일 동일, 지도18개 본문 승인안 동일. 원본 체크아웃 next-env.d.ts 사용자 변경은 보존.
- 재리뷰는 로딩 표현/status 중복 P2 하나로 review_pending. 기존 320×568 겹침·재시도 포커스 유실·빈 안내 탭 영역은 수정 및 실제 Chrome에서 검증됨.
- pending-announcement-proposal.md와 pending-announcement-test.ts.txt의 정확 수정 승인 요청 중. 새 테스트는 늘리지 않고 기존 포커스 테스트에 단일 status·중복 로딩 문장 금지 검증2개를 추가. 최종123개 유지. 메모리상 타입·ESLint·Prettier·소바야 파서 검증 통과, 실제 보호 파일 미변경.
- 승인 후 동일 포커스 항목의 테스트·계획·제안 사본 본문 정렬, 그 항목만 미완료로 변경하고 커밋·공식 approve --replace. 소바야 구현에서 진행 표시는 스피너 중심으로 정리하고 동일 요청의 로딩 접근성 안내를 한 곳에서 제공. 기존 포커스·중복 요청 차단·오류 사유·작은 화면 스크롤 유지.
- coordinator QA adapter는 done을 /tmp/brand-feedback-qa-gate/ready.json에서 보류하므로 빌드·Chrome 검증 후 release-<run_id>를 생성. 현재 기존62개 QA는 /tmp/brand-feedback-qa-review.mjs. 로딩 중복 검증도 추가하고 source hash를 다시 확인할 것.
- 검증 환경은 프로세스 한정 PATH=/Applications/Xcode.app/Contents/Developer/usr/bin:$PATH, TMPDIR=/private/tmp. 기존 테스트·하네스·제한 시간·저장소 설정은 변경하지 않음.
- 123개 gate·독립 리뷰 완료 뒤에만 /tmp/brand-feedback-handoff.py를 실행해 증거/새 저널/claim을 정리하고 plan 보관 최종 메타데이터 커밋·푸시·dev PR. 보관 후 Sobaya 명령 금지. GitHub 코멘트·멘션·승인·머지는 하지 않음.
