# codex/search-prompt-focus · easter721 · 2026-11-16
- claim: collab/active/codex--search-prompt-focus/claim.md

## 이벤트
- supersedes collab/journal/2026-11-16-easter721-search-prompt-focus-2.md 검색·공유 수정은 PR 68에 통합하고 전체 검증 및 소바야 review를 마침 → 남은 원격 검사와 동료 재리뷰를 확인할 것.
- done src/features/search/ui/search-form/search-form.tsx 검색 입력 안내 롤링과 입력·IME 중 안내 숨김을 PR 68에 반영 → 입력값·키보드 접근성과 움직임 줄이기를 유지할 것.
- done src/app/incidents/[id]/detail-share.tsx 공유 링크 입력 포커스 정렬을 PR 68에 반영 → 클립보드 실패 시 직접 복사 경로를 유지할 것.

## 남은 것
- PR 68 기준 30bd0a2에서 통합 전체 Vitest 64개 파일·312개 테스트가 종료 코드 0으로 통과했다. 최신 소스를 반영한 이 브랜치에서 소바야 gate와 review도 통과했다.
- Chrome 320·393px에서 입력 안내 롤링, 빈 입력·초기화, IME 조합, 자동완성, 검색 제출, 움직임 줄이기와 공유 링크 직접 복사를 확인했다. 실제 스크린리더 음성 출력은 확인하지 않았다.
- 소바야 리뷰어의 선택 테스트 실행은 읽기 전용 환경에서 임시 디렉터리 생성이 거부돼 실행 전에 중단됐다. 리뷰어는 확인된 기능 결함이 없다고 보고했고, 빈 입력 안내 표시의 단위 테스트 보강을 선택 사항으로 제안했다.
