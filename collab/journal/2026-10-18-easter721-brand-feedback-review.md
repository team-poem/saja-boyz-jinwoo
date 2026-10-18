# codex/brand-feedback · easter721 · 2026-10-18
- claim: collab/active/codex--brand-feedback/claim.md

## 이벤트
- touching src/features/map/ui/map-home/map-home.tsx 독립 리뷰에서 320×568 안내·하단 컨트롤 겹침과 위치 재시도 버튼 제거 시 포커스 유실을 발견 → 해당 부분 추가 편집 전 이 브랜치와 조율할 것.
- changed collab/active/codex--brand-feedback/review-fix-proposal.md 새 포커스 회귀 테스트 1개와 두 리뷰 보완점을 제안함 → 사용자 정확 초안 승인 이후에만 계획에 추가하고 소바야를 실행할 것.

## 남은 것
- 기존 구현과 승인 테스트 122개는 최종 gate 통과. 독립 리뷰는 f3599ec6ccd15a41dea55f3fec9d0ac09143ed1c에서 위 두 결함으로 review_pending. 기능 완료·PR 생성은 아직 아님.
- 사용자에게 review-fix-proposal.md 및 review-focus-test.ts.txt 승인 요청 중. 테스트 초안을 메모리상 기존 파일에 추가해 타입·린트·포맷·실제 소바야 계획 파싱(5개 항목, 헤더 일치) 검사 통과. 실제 보호 테스트는 미수정.
- 승인 후 failed-test.md에 기존 map-home 테스트와 동일 헤더를 쓰는 별도 섹션과 정확 신규 테스트를 추가·커밋하고 approve.sh --replace. 기존 122개 유지, 최종123개.
- 소바야 워커로 안내 높이·스크롤 및 재시도 중 포커스 유지·실패/성공 복원을 수정. 320×568 브라우저 검증을 추가하고 기존 45개 검사·빌드·123개 gate·독립 리뷰 후 plan 보관·푸시·dev PR.
- 로컬 하네스 timeout 진단: tests/loop.sh 동작 48개는 모두 통과하나 /usr/bin/git shim 반복 비용으로 제한 초과 발생. 이번 프로세스에서만 PATH 앞에 /Applications/Xcode.app/Contents/Developer/usr/bin, TMPDIR=/private/tmp를 적용하면 기존 제한 그대로 최종 gate 통과. 저장소 설정·하네스·테스트 제한은 변경하지 않음.
- 원본 체크아웃 next-env.d.ts 변경은 그대로 보존. GitHub 코멘트·멘션·리뷰 요청·승인·머지는 하지 않음.
