# 기사 선택 시트 조회 대상 정정

## 원인

`mapCoordinateSourceLivesInServiceInfoWithoutMapOverlay` 초안에서 기사 선택 후 `container.textContent`를 검색했다. 기존 `MapArticleSheet`는 `createPortal(..., document.body)`로 렌더링되므로 지도 컨테이너의 자식이 아니다. 기존 회귀 테스트는 문서에서 해당 시트를 조회하고 있다. 단독 실행과 전체 지도 파일 실행 모두 이 잘못된 조회에서 실패함을 확인했다.

## 정확한 변경

신규 테스트 `mapCoordinateSourceLivesInServiceInfoWithoutMapOverlay`에서 기사 선택 뒤 안내 문구를 확인하는 부분만 아래처럼 바꾼다. `failed-test.md`와 실제 테스트 파일, 승인 제안 사본을 같은 본문으로 정렬한다.

```diff
   await act(async () => fixture.selected[0]());
-  expect(container.textContent).toContain(
+  expect(
+    document.querySelector('[aria-label="선택한 기사"]')?.textContent,
+  ).toContain(
     '지역 대표 위치 · 실제 발생 지점과 다를 수 있습니다',
   );
```

같은 안내 문구를 정확히 확인하며, 지도 출처가 없어야 한다는 검증과 서비스 소개의 출처 링크·위치 한계 안내 검증은 유지한다. 테스트 이름·개수·fixture·기대값은 변경하지 않는다. 다른 기존 테스트, 제품의 포털 구조, 전체 테스트 명령, 소바야는 변경하지 않는다.

## 후속 검증

공식 재승인 후 해당 테스트와 남은 단일·중복 좌표 테스트를 검증한다. 최종 122개 전체 gate·기존 브라우저 45개 검사의 소스 동일성·독립 리뷰 후 dev PR까지 진행한다.
