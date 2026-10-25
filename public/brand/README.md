# 흉흉 브랜드

- 파일: `hyunghyung.svg`
- 출처: `collab/active/codex--figma-ui-foundation/brand-proposal.svg`
- 사용 근거: 사용자가 이 프로젝트 적용을 승인한 창작 로고. 별도 외부 라이선스는 제공되지 않았다.
- 원본 SVG를 변경 없이 복사했다. `viewBox="0 0 128 48"`을 유지하며 헤더 표시 크기는 64×24px이다.
- Figma 원본 로고 대신 사용하는 승인된 예외이며, 폰트에 의존하지 않는다.

## 앱 아이콘

- `src/app/icon.svg`와 `favicon.ico`는 승인된 `collab/active/codex--brand-location/proposed-assets/` 자산을 유지한다. 작은 크기에서는 글자를 생략하고 짙은 윤곽·빨간 신호·흰 배경을 사용한다.
- SVG viewBox48×48, ICO16/32/48px, 검색용 PNG96×96, Apple180×180px. Next 파일 메타데이터의 자동 버전 쿼리와 head 링크를 사용한다.
- 2026-10-25 기존 Apple PNG의 반복 윤곽·하단 잘림을 확인해 같은 SVG에서 다시 생성했다. 검색에서 쓰기 좋은96px PNG도 추가했다. 원본 SVG·정상 ICO·OG와 과거 승인 자료는 보존한다.
- 재생성: Node24로 `node scripts/generate-brand-icons.mjs`. 기존 Next 의존성 sharp로 PNG96/Apple180을 만들며 ICO를 덮어쓰지 않는다.
- `src/app/brand-icons.test.ts`는 PNG96/Apple180/ICO 세 크기의 단일 윤곽·상하 반원·밝은 모서리·하단 여백을 검사한다. 실제 Next/Chrome 회귀는 head의 PNG96 선언과 ICO/PNG/SVG/Apple의 디코딩을 검사한다.
- 자산 디코딩은 네트워크 가로채기 없는 브라우저에서 확인한다. 자동화 가로채기가 있는 Next 테스트의 ICO 실패를 제품 결함으로 오인하지 않는다.
