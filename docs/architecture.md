# 개발 기반

Node.js 24, pnpm 10.34.6, Next.js App Router, React, TypeScript strict 모드와 일반 CSS를 사용한다. Figma의 Tailwind 예시 코드는 그대로 붙이지 않고 프로젝트 CSS로 옮긴다.

## 실행

```sh
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm run dev
```

환경변수 없이 개발 준비 화면을 실행할 수 있다. `.env.example`을 참고하며 비밀키는 커밋하지 않는다. `pnpm run build` 후 `pnpm start`로 프로덕션 서버를 실행한다.

## 구조

- `src/app`: 라우트, 메타데이터, 전역 디자인 토큰.
- `src/components/layout`: 화면 간 공유 레이아웃.
- `src/features/incidents`: 사건 모델, 라벨, 순수 필터 함수와 단위 테스트.
- `src/lib`: 후속 공용 유틸리티를 위한 위치. 외부 서비스 어댑터는 실제 연결 시 추가한다.

사건 모델은 위치, 출처, 발생 시각과 타임라인을 포함한다. ISO 8601 날짜에는 시간대를 명시한다. 카테고리와 상태는 영어 식별자, 화면 표시는 공용 한글 라벨을 사용한다. 뉴스 수집과 비밀키 사용은 서버 전용 모듈에서 처리할 예정이다. 지도 SDK는 선택 전이라 의존성을 추가하지 않았다.

## 검증

```sh
pnpm run lint
pnpm run typecheck
pnpm test
pnpm run build
pnpm run format:check
```

`pnpm test`는 사건 단위 테스트와 기존 협업 하네스 세 스위트를 모두 실행한다. `pnpm run check`는 lint, 타입, 전체 테스트, 빌드를 순서대로 실행한다. CI는 앱 검사와 기존 하네스 검사를 실행한다.

Figma 이미지와 SVG는 실제 화면 구현 시 해당 노드에서 받아 로컬 자산으로 보관한다. 참조 스크린샷을 화면 이미지로 사용하지 않는다. 현재 준비 화면은 디자인 완성본이 아니다.

## 환경 참고

패키지 매니저는 `package.json`의 `packageManager`로 pnpm 10.34.6에 고정한다. Corepack을 사용하는 환경에서는 `corepack enable` 후 실행한다. 이 Mac의 Corepack 0.33은 pnpm 12 실행 형식과 호환되지 않아 pnpm 10 계열을 사용한다.

`pnpm-lock.yaml`을 유일한 잠금 파일로 유지하고 CI에서는 `pnpm install --frozen-lockfile`로 재현성을 검사한다. 다른 패키지 매니저의 잠금 파일을 추가하지 않는다.

Next.js의 React lint 플러그인이 ESLint 10에서 실패하므로 현재 호환되는 ESLint 9.39.5를 사용한다. 플러그인 호환성이 확보되면 함께 갱신한다.
