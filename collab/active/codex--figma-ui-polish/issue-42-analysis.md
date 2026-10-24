# 이슈42 확인

[원문](https://github.com/team-poem/saja-boyz-jinwoo/issues/42)은 UI/지도 오류가 아닌 sobaya-upstream 워크플로의 자동 버전 알림이다. 2026-10-19 생성 당시 main의 lock83af28d와 upstream1f22066이 달랐다.

2026-10-24 조회에서 기본 브랜치는 main이며 main lock은 여전히83af28d, dev와 이 작업 브랜치는 검토된 팀 pin0d05121이다. 일정 워크플로는 기본 브랜치 기준으로 비교하므로 dev만 갱신해도 main 쪽 알림이 자동 해소되지는 않는다. 자동 닫힘 조건은 비교한 lock과 upstream HEAD가 정확히 같을 때다.

이번 작업은 pin·소바야 엔진·업데이트 워크플로·이슈 상태를 변경하지 않았다. dev→main 통합과 업데이트 알림 처리는 별도 검토 사항이다. 이슈의 오래된 legacy attach/update 명령을 다시 실행하지 않는다. 현행 설치는 harness/sobaya/RULES.md를 따른다.
