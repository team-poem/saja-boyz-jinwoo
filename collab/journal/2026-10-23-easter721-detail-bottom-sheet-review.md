# codex/detail-bottom-sheet · easter721 · 2026-10-23
- claim: collab/active/codex--detail-bottom-sheet/claim.md

## 이벤트
- added collab/active/codex--detail-bottom-sheet/scope-review.md 실제 Figma10/17·10/22 버전 기록과 현재 v0.2 상세 시트를 대조한 범위·SEO 검토 → 예전 독립 상세/공유 시안을 새 구현 기준으로 사용하지 말 것.
- added collab/active/codex--detail-bottom-sheet/scenario-plan.md 지도 다건 선택·목록/검색 복귀·서버 직접 유입을 포함한 문장 시나리오 → Sobaya에서 다음 테스트 하나씩 구체화하며 중복 상세 통합 작업을 시작하지 말 것.
- rule src/app/incidents/[id]/ 기존 기사 URL·최초 서버 본문·canonical·공유·출처를 유지하며 공통 시트로 표현할 계획 → UI 삭제 표식을 기사 주소 삭제나 가짜 뉴스 구조화 데이터 생성으로 해석하지 말 것.
- rule harness/sobaya.lock 이 클론의 별도 소스 checkout·sourceRoot·관리 훅을 팀 pin0d051213에 정렬하고 기존 훅 백업·기존 실행 상태14개의 해시 일치를 확인함 → 엔진 변경이나 feature GREEN의 증거로 해석하지 말 것.

## 검증
- 최신 origin/dev ca3c01d 기반 새 워크트리. 사용자 루트 next-env.d.ts 변경 보존.
- Figma 앱의 10월17일22:53, 10월22일21:20 이력 실제 열람, MCP의 현재 기본/확장 시트 디자인 컨텍스트와 렌더 확인, 현재 버전 복귀.
- 열린 PR 목록 비어 있음 확인. 동료의 현재 편집 허브 파일 없음.
- pnpm frozen-lockfile 오프라인 설치 완료. 포맷 통과, 린트 오류0/기존 경고3.
- Node24.19.0의 전체 Vitest:29개 파일·123개 통과,149.84초. 구현 전 기준 상태이며 신규 기능 검증이 아니다.
- Node24.3 실행은 진행 확인 중 중단했다. 그 중단을 제품 실패나 TDD RED로 계산하지 않는다.
- 제품 코드·테스트 변경이 없어 이번에는 타입/빌드/제품 브라우저 검증을 새로 수행하지 않았다.

## 남은 것
- 사용자가 요청한 재검토 결과 보고 후 문서의 순서로 실제 상세 통합을 구현한다. 이번 커밋은 계획/작업 선언뿐이며 기능 완료나 PR 준비 완료를 뜻하지 않는다.
- 인간 소유 spec.md는 수정하지 않았다. 현재 루트 spec.md·failed-test.md는 없으며 feature 문서는 제품 의도에 맞게 준비한 뒤 다음 시나리오 하나씩 RED→GREEN을 관찰한다.
- 우선 서버 상세 본문·확장 시트, 다음 목록/검색 URL 시트와 배경 상태, 그다음 지도 단건·다건·카드/제스처를 연결한다.
- 실제 위치·분류·조회수·언론사 로고/관련 기사 계약을 추측하지 않는다. 미정인 필터·브랜드·제보·PC/목록 재설계는 이 기능 범위에 포함하지 않는다.
- 구현 후 Figma 캡처 대조·전체 테스트·포맷·린트·타입·빌드·직접 유입/봇 HTML을 검증하고 dev 대상 기능 PR을 준비한다. 외부 코멘트는 사용자 확인 없이 게시하지 않는다.
