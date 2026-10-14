# codex/figma-design-rebuild-plan · easter721 · 2026-10-14
- claim: collab/active/codex--figma-design-rebuild-plan/claim.md

## 이벤트
- added collab/active/codex--figma-design-rebuild-plan/design-rebuild-plan.md 전체 Figma 구조·12개 화면/상태 렌더·최신 dev 소스·공개 사이트 대조 및 단계별 재구축 계획 → UI 후속 구현의 범위·노드·예외·완료 판정을 참조할 것. 특정 노드 하나의 리스타일 요청으로 축소하지 말 것.
- added collab/active/codex--figma-design-rebuild-plan/brand-proposal.svg 흉흉 독자 SVG 로고와 brand-preview.html 미리보기 → 디자인 제안이며 아직 제품 헤더·favicon에 적용된 자산으로 취급하지 말 것.
- rule 지도 후속 요구는 고정 지역 대표점마다 기사 개수 원을 표시하고 1건도 숫자 원으로 통일하는 것 → 줌/화면 거리 클러스터나 정확한 사건 지점으로 해석하지 말 것. 크기 구간·지역 식별 키는 구현 명세에서 고정할 것.
- rule 사용자 링크의 45:3421은 파일 진입점이며 최종 화면 지정이 아님 → 지도·검색·목록·상세·제보·시트·공유의 전체 디자인을 대조할 것. 이 계획의 기준 노드 표는 밝은 제품 시안 계열의 제안임.

## 남은 것
- 제품 구현·새 테스트·폰트 의존성·운영 설정은 변경하지 않았다. 이 브랜치는 분석 계획만 공유하며 PR/리뷰/코멘트는 게시하지 않았다.
- 다음 구현은 dev 기반 별도 워크트리에서 공통 폰트·화면 틀·로고·헤더/메뉴의 spec-proposal과 정확한 테스트 초안을 먼저 준비하고 sobaya 승인·루프·gate·review를 거친다.
- 지역 단위·표준 label/대표점 안정성 및 region_id 필요 여부를 서버 카탈로그와 맞춘다. 카테고리·상태·타임라인 등 API가 없는 정보는 임의로 생성하지 않는다.
- 확인 순간 운영 map/articles는 44 unique 기사 중 지역 위치 1개(울산), unresolved 43개였다. 지역 원 여러 개와 개수별 비교는 고정 합성 검증 표본으로 한다.
- 검증: 전체 vitest 22개 파일·97개 테스트 통과, 기본 pnpm build(Turbopack) 통과, 계획 Markdown/미리보기 HTML Prettier 검사 통과, SVG XML 파싱·Chrome 크기별 로드/렌더 확인. 공개 사이트 조회는 읽기 전용이며 정확한 배포 SHA 검증 또는 제보 접수 저장 검증을 뜻하지 않는다.
- 기본 dev checkout의 기존 next-env.d.ts 변경을 보존했다. dev는 fc9b0af로 ff-only 갱신했다.
