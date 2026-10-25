# codex/figma-ui-polish · easter721 · 2026-10-25
- claim: collab/active/codex--figma-ui-polish/claim.md

## 이벤트
- added src/components/feedback/image-loading.tsx URL별 다운로드·캐시완료와 장식 skeleton 공통화 → 목록/지도카드/상세에서 이미지 뒤 skeleton·기존캡션·실패복구·NoJS가시성을 유지할 것
- added src/features/map/ui/map-home/map-home-loading.tsx 최초서버기사조회 h-dvh fallback → MapHome을 이중마운트하거나 API전 SDK/위치요청을 시작하지 말 것
- migrated src/app/(browse)/@background/(map)/ 홈 page/loading을 URL변경없는 전용 route group으로 이동 → 검색/다른화면에 지도fallback을 상속하지 말 것
- added src/features/search/ui/search-form/search-form.tsx native GET·transition·검색spinner/skeleton·중복방지·명시submit revision → 같은query재검색은 새페이지로 교체하고 상세복귀에서는 pagination을 보존할 것
- migrated src/features/search/ui/search-loading/search-loading.tsx 자동route loading을 client pending뷰로 이동 → JS없는 GET결과본문을 숨기는 상위 Suspense경계를 복구하지 말 것
- changed src/features/article-detail/ui/detail-retry/detail-retry.tsx 실제href·수정키/새탭을보존한transition spinner/busy/중복차단 → 성공과재실패후대기종료를 유지할 것
- rule src/app/incidents/[id] 직접loading파일·전역metadata대기를추가하지않음 → HTTP응답전proxy/metadata대기는앱로더로가릴수없으며 NoJS본문/공유SEO/실제404를우선보존할 것
- rule src/components/layout/article-filters Figma필터·지도비활성선택지는불변 → 동작미제공을이유로삭제하지말 것
- done loading-feedback 소스56d4c1c·BuildpRhNY7upYLIiB9oD27vRG·소바야150/실패생략0·최종gateexit0·빌드타입·Chrome91/실패0·캡처31 → 같은evidence의후속자는초기실패/계측수정과최종결과를구분할 것

## 남은 것
- 기존 PR45 사용자 리뷰 대기. Draft·댓글·리뷰요청·승인·머지는 변경하지 않았다.
- 직접 공유 주소의 첫 HTML 이전 대기는 기존대로다. 로딩 파일만 추가하면 NoJS본문이숨는 실제실험과 느린SSR/404 회귀를 함께 참고한다.
- 원래 checkout의 사용자 next-env.d.ts 변경과 dev를 수정하지 않았다. 동료허브파일충돌은 없었다.
- QA31147/41147은 소유확인후종료했다. 실제모바일OS권한창/키보드/safe-area는이번검증범위밖이다.
