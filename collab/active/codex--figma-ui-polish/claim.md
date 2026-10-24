---
branch: codex/figma-ui-polish
owner: easter721
started: 2026-10-24
status: done
goal: fix(ui): 상세 복귀 회귀와 최신 Figma 화면 세부 스타일 정렬
next: dev PR 검토·승인 대기. Google 전환은 키·Map ID 확보 후 별도 구현
base: dev
---

## 메모
- 최신 dev 2df6903에서 시작한다. 머지된 PR44 브랜치는 수정하지 않는다.
- 개인 Figma 계정으로 업데이트와 모든 제품 화면을 대조한다. Figma 파일 자체는 수정하지 않는다.
- 네이버 지도는 유지하고 구글 SDK·키·의존성은 미리 연결하지 않는다.
- 이슈42는 과거 sobaya 업데이트 알림이다. 최신 팀 pin과 비교하며 엔진을 수정하지 않는다.
- 외부 코멘트는 게시 전에 사용자에게 초안을 보여준다.

- 검증: 최종 소바야135개·빌드·브라우저185개·디자인116개·키보드46개·실제Naver17개 통과.
- main의 과거 pin으로 이슈42 알림이 유지되는 것을 확인했다. 이슈 상태와 main은 변경하지 않았다.
