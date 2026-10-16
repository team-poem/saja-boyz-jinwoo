---
branch: codex/release-figma-ui
owner: amazon
started: 2026-10-15
status: done
goal: chore(release): 지도·제보 최신 개발분을 충돌 없이 통합
next: main 대상 대체 통합 PR의 필수 리뷰·CI 확인 후 병합
base: main
---

## 범위

- 사용자 요청: PR24의 dev→main 충돌 해결. main ed92d23은 이전 dev119172a와 동일한 tree이며 이후 개발분은 PR22 bf29990·PR23 a924bdd다.
- main에서 두 PR의 코드·문서·테스트·완료 저널을 내용 변경 없이 반영한다. 다른 기능의 collab/active 작업 폴더는 dev의 원본 커밋에 보존하고 이 통합 PR에 복사하지 않는다.
- 기존 dev/main·작업 폴더의 미커밋 수정·보호 규칙·제품 동작을 변경하지 않는다. 필수 선형 이력·리뷰를 유지하는 main 대상 대체 통합 PR이다.
