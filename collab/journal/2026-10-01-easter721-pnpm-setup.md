# codex/pnpm-setup · easter721 · 2026-10-01
- claim: collab/active/codex--pnpm-setup/claim.md

## 이벤트
- dep package.json 패키지 매니저를 pnpm 10.34.6으로 고정 → pnpm install --frozen-lockfile과 pnpm 스크립트 사용
- migrated pnpm-lock.yaml npm 잠금 파일에서 직접 의존성 버전을 유지해 전환, package-lock.json 제거 → pnpm 잠금 파일만 갱신
- changed .github/workflows/app-check.yml pnpm 설치·캐시·검증으로 전환 → CI에서 고정된 pnpm 버전 사용
- changed AGENTS.md 테스트·lint·format 명령을 pnpm으로 전환 → 전체 검증은 pnpm test
- rule AGENTS.md 커밋 제목은 type(scope): 한국어 설명, scope 선택 → 변경 목적에 맞는 Conventional Commits 타입 사용
- changed harness/config.sh 잠금 파일 허브를 pnpm-lock.yaml로 전환 → 수정 전 동료 상태 확인
- changed README.md docs/architecture.md 실행·설치·검증 문서 갱신 → 이전 npm 명령 대신 pnpm 명령 참고

## 검증
- npm 잠금 파일과 pnpm importer 비교로 직접 의존성 버전 유지 확인.
- pnpm install --frozen-lockfile, lint, typecheck, 사건 테스트 4개, format:check, Next.js 프로덕션 빌드 통과.
- pnpm test 전체 통과: 사건 4개 + 훅 84개 + 협업 루프 48개 + sobaya 연동 32개 = 168개.

## 남은 것
- pnpm 전환 브랜치의 main 반영.
- 현재 Corepack 0.33은 pnpm 12 실행 형식과 호환되지 않아 지원되는 pnpm 10 계열 사용.
