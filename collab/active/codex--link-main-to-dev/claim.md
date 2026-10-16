---
branch: codex/link-main-to-dev
owner: amazon
started: 2026-10-16
status: done
goal: fix(release): main 조상 연결 (Merge commit 필수)
next: dev 대상 PR 최신 CI와 타인 승인 확인 후 Create a merge commit으로 병합
base: dev
---

## 범위

- 사용자 요청: 최신 dev에서 복구 브랜치를 만들고 main을 merge하여 dev 대상 PR을 올린다. 보호 규칙과 main은 그대로 유지한다.
- 시작 dev a347ed87e78ea17ce866d4bf0ad07c7a77b4d744, main 4fdbd4e3d52bb2ebc3c38ed161152bf64eae6086.
- 기존 #27은 squash되어 파일 내용과 검사기 수정은 dev에 들어갔으나 main 조상 연결은 빠졌다. 이 브랜치는 최신 dev를 시작점으로 하여 strict up-to-date 조건을 충족한다.
- git의 정상 merge로 main을 연결한다. 제품·검사기·테스트·설정·기존 협업 기록을 모두 보존하고 새 작업 기록만 추가한다.
- 최종 PR도 반드시 Create a merge commit으로 병합해야 한다. squash/rebase는 이 작업 목적을 잃는다.
- main 변경, 보호 규칙 변경, #24/#28 변경·닫기, 배포, 강제 push, 자동 merge, 직접 dev push는 범위에 포함하지 않는다.
