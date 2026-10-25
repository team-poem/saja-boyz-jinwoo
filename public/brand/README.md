# 흉흉 브랜드

- 파일: `hyunghyung.svg`
- 출처: `collab/active/codex--figma-ui-foundation/brand-proposal.svg`
- 사용 근거: 사용자가 이 프로젝트 적용을 승인한 창작 로고. 별도 외부 라이선스는 제공되지 않았다.
- 원본 SVG를 변경 없이 복사했다. `viewBox="0 0 128 48"`을 유지하며 헤더 표시 크기는 64×24px이다.
- Figma 원본 로고 대신 사용하는 승인된 예외이며, 폰트에 의존하지 않는다.

## 앱 아이콘

- `src/app/icon.svg`와 `favicon.ico`는 승인된 `collab/active/codex--brand-location/proposed-assets/` 자산을 유지한다. 작은 크기에서는 글자를 생략하고 짙은 윤곽·빨간 신호·흰 배경을 사용한다.
- SVG viewBox48×48, ICO16/32/48px, Apple180×180px. Next 파일 기반 메타데이터로 제공하며 자동 버전 쿼리와 head 링크를 사용한다.
- 2026-10-25 픽셀 대조에서 기존 Apple PNG의 윤곽 반복·하단 잘림을 확인했다. 이 파일은 승인된 `src/app/icon.svg`에서 기존 Next 의존성 sharp로 다시 생성했다. 원본·ICO·OG와 과거 승인 자료는 변경하지 않는다.
- 재생성: 저장소에서 Node24로 `node scripts/generate-apple-icon.mjs`. 새 패키지나 수동 PNG 인코더는 사용하지 않는다.
- 회귀: `src/app/brand-icons.test.ts`에서 Apple과 ICO 세 크기의 정사각 크기·단일 윤곽·상하 반원·밝은 모서리·하단 여백을 검사한다.
