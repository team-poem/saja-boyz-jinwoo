# 지도 피그마 적용 검증

2026-10-14 · Node.js 24.19.0 / pnpm 10.34.6 · 단일 위치 이동 수정 `04159c7` 후속.

## 기준 디자인과 데이터 의미

파일 `TCSILMzViAVqeHRphoyHCH`의 지도 `18:2348`, 선택 화면 `19:2865`, 하단 패널 `19:2990`을 high fidelity 컨텍스트와 스크린샷으로 확인했다. 범위는 마커·하단 기사 패널이며 헤더/필터/기타 화면의 기존 차이는 수정하지 않았다. 드래그 제스처나 상태 필터를 추가하지 않았다.

- `18:2385`: 일반 빨간 기사 마커. `public/map/article-marker.svg`, 1,038바이트, 원본 24×24, 24px 슬롯/중심 12px.
- `18:2378`: 선택 링. `public/map/article-selected.svg`, 1,134바이트, 원본 28×28, 같은 24px 슬롯의 left/top -2px로 중심 유지.
- `19:3143`: 닫기. `public/map/sheet-close.svg`, 1,288바이트, 원본 40×40, 24px 버튼 슬롯의 left -8px/top -6px. 루트 SVG 속성을 수정하지 않았다.
- 숫자 원형은 동일 좌표의 **기사 수**이며 줌 클러스터/사건 수가 아니다. 2–5건/6–9건/10건 이상에 각각 38.4/48/72px 스타일을 적용했다.

원본 SVG는 Figma가 제공한 다운로드 URL에서 저장했고 임시 URL을 런타임에 사용하지 않는다. 지도 스크린샷이나 피그마의 예시 뉴스 사진을 제품 자산으로 넣지 않았다. 실제 API 이미지/이미지 없음 표시를 기존 ArticleImage로 출력한다. 기사 텍스트와 발행 시각 파싱도 기존 helper를 재사용한다.

제목 18px, 요약 13px/1.5, 80px 썸네일, padding/gap 16px, top radius 24px, 36×4px 핸들을 따른다. 화면 하단 포털은 폭 최대640px이며 기존 메뉴를 덮는다. 그룹/긴 기사는 최대65dvh 안에서 스크롤한다. 피그마의 샘플 상태·거리·발생 시각은 API에 없어 제외하고 `기사 발행` 및 지역 대표 위치 경고를 유지한다.

## 행동 검증

- 원본 일반 마커 → 선택 SVG → 닫기 후 일반 마커 복귀 RED→GREEN.
- 실제 기사 제목/이미지/발행 시각, 정확도 안내와 원본 닫기 SVG를 포함한 하단 패널 RED→GREEN.
- Enter/Space 선택 및 닫기 후 preventScroll 포커스 복원 RED→GREEN.
- 독립 검토에서 최초 선택 후 포커스가 마커에 남는 문제를 확인했다. 닫기 버튼으로 포커스를 옮기고 Escape로 닫아 원래 마커로 돌아오는 기대를 추가해 실제 RED→GREEN을 확인했다.
- 기존 동일 좌표 모든 기사 링크, API 실패/빈 결과, SDK 실패/언마운트 정리를 유지한다. 지도 영역 25 테스트 통과.

첫 전체 검증의 추천검색 90초 실패와 Turbopack 빌드 실패는 샌드박스가 루프백 포트 바인딩을 차단한 것이었다. 별도 최소 Node net.createServer probe도 `EPERM listen 127.0.0.1`을 반환했다. 테스트 제한·assertion을 변경하지 않고 로컬 소켓 허용 환경으로 다시 실행해 전체 테스트가 통과했다. Turbopack 빌드는 허용 실행에서도 이전 오류가 재현됐지만 생성된 `.next`를 임시 디렉터리로 보관한 뒤 깨끗하게 빌드하니 통과했다. 제품 코드나 번들러 설정을 바꾸지 않았다.

## 최종 검증

- `PATH=/tmp/poem-submission-worker:$PATH pnpm exec vitest run`: **22 파일 / 97 테스트 PASS**, 108.43초. 지도 영역 25개이며 기존 추천 검색 실제 Next/Chrome 검증·제보·협업 suite 포함.
- `pnpm run lint`, `pnpm run typecheck`, `pnpm run format:check`, `sh scripts/check-styles.sh`, `git diff --check`: PASS.
- `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=map-build-check NEWS_API_BASE_URL=https://poem-news.168.107.37.12.sslip.io pnpm run build`: 로컬 소켓 허용 및 깨끗한 `.next`에서 **PASS**. 홈 `/`는 dynamic(ƒ), 키는 합성 공개 값으로 실제 자격정보 없음.
- 로그: `verification/figma-final-suite.txt`, `figma-clean-build.txt`, `figma-red-*.txt`. 독립 읽기 전용 검토에서 포커스 보완 후 남은 수정 사항 없음.

## 실제 화면 확인 범위

독립 소스 검토에서 SVG 루트 치수·배치 오프셋·포털 쌓임 순서·실제 데이터 의미를 확인했다. 최종 배포의 393×852 화면, 실제 SDK 마커 클릭/키보드 선택, 링·패널·닫기 이미지 렌더링, 기사 상세 왕복은 부모 세션이 담당한다. 이 문서는 배포/실제 브라우저 검증 완료를 주장하지 않는다.
