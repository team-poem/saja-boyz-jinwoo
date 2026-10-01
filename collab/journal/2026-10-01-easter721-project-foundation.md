# codex/project-foundation · easter721 · 2026-10-01
- claim: collab/active/codex--project-foundation/claim.md

## 이벤트
- dep package.json Next.js 16.3.8·React 19.3·TypeScript·Vitest·ESLint·Prettier 기반 추가 → Node 24와 npm ci 사용, 잠금 파일 유지
- added src/features/incidents/types.ts 사건 위치·출처·타임라인과 필터 계약 추가 → 기능 구현에서 공용 모델과 라벨 재사용
- added src/app/ 지도·검색·목록·상세·제보 경로와 준비 화면 추가 → 실제 Figma 화면은 이 경로에 구현
- added src/app/globals.css Figma의 밝은 배경·슬레이트·빨강 색상 토큰 추가 → 스타일에서 공용 토큰 사용
- rule harness/config.sh package·잠금 파일·루트 레이아웃·전역 CSS·사건 타입을 허브로 지정 → 편집 전에 동료 상태 확인
- changed AGENTS.md npm test 전체 스위트와 lint·format 명령 선언 → 구현 뒤 앱과 기존 하네스 함께 검증
- changed tests/hooks.sh 온보딩 테스트가 템플릿 fixture를 직접 생성 → 초기화된 앱에서도 setup 전이를 검증
- added docs/project.md Figma 화면별 노드와 후속 결정 기록 → 최종 시안·지도 SDK·뉴스 API 연결 전에 참고

## 검증
- lint, typecheck, format:check, Next.js 프로덕션 빌드 통과.
- 사건 필터 4개, 훅 84개, 협업 루프 48개, sobaya 연동 32개 통과.
- 로컬 프로덕션 서버에서 /, /search, /incidents, /report는 200, 없는 사건 상세는 404 확인.

## 남은 것
- Figma 화면을 실제 인터랙션과 로컬 자산으로 구현. 준비 화면은 디자인 완성본이 아님.
- 지도 제공자와 API 키, 뉴스 수집·위치 추출·중복 제거 정책, 제보 저장과 인증 결정.
- 흉흉/위험추적 이름과 여러 Figma 시안 중 최종 노드 확인.
- GitHub 저장소 보호·squash 정책은 gh CLI 부재로 설정하지 않음. 로컬 git 훅은 활성화.
- ESLint 10은 현재 Next.js React 플러그인에서 실패하므로 9.39.5 유지. 호환성 확보 후 갱신.
- 이 Mac의 npm os=linux 설정은 전역 변경 없이 설치 명령의 --os=darwin --cpu=arm64로 처리.
