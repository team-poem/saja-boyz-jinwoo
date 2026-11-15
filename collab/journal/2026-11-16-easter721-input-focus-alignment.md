# 검색·제보 입력 포커스 인계 · easter721 · 2026-11-16
- claim: collab/active/codex--input-focus-alignment/claim.md

## 이벤트
- supersedes collab/journal/2026-11-15-easter721-input-focus-attempt.md 검색 입력 포커스 수정의 미커밋 상태와 남은 검증 안내는 이번 인계로 정정한다.
- done src/features/search/ui/search-form/search-form.tsx 검색 입력 폼의 키보드 포커스 윤곽을 경계에 맞췄다 → 검색 안내 롤링과 초기화·한글 입력 동작을 유지할 것.
- done src/app/report/page.tsx 제보 입력 포커스와 첨부 영역은 별도 제보 작업에서 수정해 PR 68에 통합했다 → 오류 상태와 키보드 포커스 표시를 유지할 것.

## 남은 것
- 보관한 계획의 두 시나리오는 실패한 시도의 재시작 기록을 보존하기 위해 미체크로 두었다. `searchKeyboardFocusKeepsTheFormOutlineAndClearControl`과 `reportFieldFocusAndErrorsRemainAccessible`은 최신 PR 68의 전체 테스트에서 통과했고, 제보 별도 작업에서도 Chrome 테스트와 전체 gate가 통과했다.
- PR 68과 소스가 동일한 `19fa057`에서 소바야 gate와 review가 정상 종료했다. review 워커 자체는 읽기 전용 제한으로 브라우저·하네스 테스트를 실행하지 않았으며, 사전 전체 gate와 별도의 Chrome 검증은 통과했다.
- PR 68의 원격 필수 검사와 리뷰를 확인한다. 실제 스크린리더 음성은 확인하지 않았다.
