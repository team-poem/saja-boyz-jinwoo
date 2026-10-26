# PR 45 SEO·AEO·GEO 및 아이콘 기술 점검 초안

- 점검일: 2026-10-25 KST. 라이브 https://hyunghyung.vercel.app/ 공개 HTTP 응답과 PR 45 작업 트리를 읽기 전용으로 비교했다.
- 최초 소스 검토 기준: ee0526b. 이후 협업 재개 커밋은 제품 변경과 구분했다. 미머지 PR 코드와 현재 운영 배포가 같다고 가정하지 않았다.
- 이 문서는 크롤링·서버 HTML·메타데이터·출처·이미지의 기술적 점검이다. 검색 순위, AI 답변 채택 또는 파비콘 노출을 보장하지 않는다. UA를 지정한 공개 HTTP 요청은 실제 검색엔진의 크롤링·색인 결과 확인과 다르다.

## 결론과 조치 범위

1. **확정 결함: Apple PNG가 잘렸다.** 승인된 SVG는 단일 원형 관측 심벌인데 현재 180×180 PNG는 위쪽 반원이 두 번 나타나고 아래가 잘린다. PNG만 정확하게 재생성하고 픽셀 회귀를 추가하는 것이 적절하다.
2. **ICO와 OG는 정상이다.** 기존 ICO의 16/32/48px 프레임과 OG 1200×630 이미지를 직접 열어 정상임을 확인했다. 정상 ICO/SVG/OG를 불필요하게 교체할 근거는 없다.
3. **라이브 잘못된 기사 주소는 아직 HTTP 200이다.** `/incidents/invalid`의 Googlebot UA 응답은 200 + noindex였다. PR에는 문서 요청의 404 우회 코드가 이미 있으므로 중복 구현하지 않고 배포 후 상태코드를 확인한다.
4. 이외 확인 범위에서 새 필수 SEO/AEO/GEO 기능을 추가해야 하는 결함은 찾지 못했다.

## 아이콘 HTTP·head·캐시 근거

다음 네 경로는 모두 200이며 올바른 이미지 MIME을 반환했다. 라이브 바이트 SHA256 앞 16자리와 작업 트리 파일이 일치했다.

| 경로 | Content-Type | 바이트 | SHA256 앞 16자리 |
| --- | --- | ---: | --- |
| /favicon.ico | image/vnd.microsoft.icon | 2685 | 5b49509823e8de59 |
| /icon.svg | image/svg+xml | 635 | 2f77f035dfac18c1 |
| /apple-icon.png | image/png | 4151 | e238db3c29542df6 |
| /og/site.png | image/png | 42892 | 8a2552d73cc267bf |

라이브 홈 HTML에서 확인한 정확한 태그:

```html
<link rel="icon" href="/favicon.ico?favicon.36ylx-q_7sg8z.ico" sizes="48x48" type="image/x-icon"/>
<link rel="icon" href="/icon.svg?icon.3zs-tz6hchnc6.svg" sizes="any" type="image/svg+xml"/>
<link rel="apple-touch-icon" href="/apple-icon.png?apple-icon.3ps9c2tys3jwq.png" sizes="180x180" type="image/png"/>
```

정확한 쿼리 포함 URL도 모두 200이다. 세 응답 모두 `Cache-Control: public, max-age=0, must-revalidate`, `x-vercel-cache: HIT`였다.

| 자산 | ETag | Last-Modified |
| --- | --- | --- |
| ICO | "c5fe02287e7fcc3c4b07345d3281dd0b" | Tue, 20 Oct 2026 02:25:49 GMT |
| SVG | "1b3da1314c4252c50c6afa94a37a9d3e" | Mon, 19 Oct 2026 07:18:39 GMT |
| Apple PNG | "6ee88c545d6152ffdf129e5714255d05" | Mon, 19 Oct 2026 07:18:39 GMT |

자동 버전 쿼리가 이미 존재하므로 태그 누락·리소스 404·장기 브라우저 HTTP 캐시 설정은 재현된 원인이 아니다. 특정 사용자 브라우저의 별도 파비콘 저장 상태는 이 점검으로 확정하지 못했다. Apple 교체 배포 뒤 태그 쿼리·ETag·실제 픽셀 변경을 확인하고, 여전히 특정 환경에서만 안 보일 때 그 환경을 별도로 조사한다. 수동 캐시 버전 추가나 정상 ICO 교체를 선행할 이유는 없다.

## Apple 래스터 결함과 재현 자료

- 기존 Apple의 짙은 윤곽 행 구간: 29–92, 122–179. 윤곽이 두 구간으로 끊기며 마지막 행까지 이어져 잘림을 확인했다.
- SVG에서 재생성한 후보: 29–160의 단일 연속 윤곽, 밝은 모서리와 하단 여백 유지.
- 기존 ICO 및 후보 ICO 모두 안티앨리어싱을 고려한 연속 윤곽·상하 반원·모서리·하단 여백 검사 통과.
- 기존 앱 파일과 승인 proposal 파일이 같은 바이트다. 손상은 배포 전 proposal 래스터 단계에 이미 있었다. 생성 스크립트가 남아 있지 않아 특정 인코더나 생성 코드의 원인은 단정하지 않는다.
- OG는 로고·한글 제목·지도 핀을 직접 열어 정상 확인했다. Apple의 반복·잘림과 같은 결함은 관찰하지 못했다.

임시 준비물: `/private/tmp/pr45-favicon-fixed/`의 `apple-icon.png`, `favicon.ico`, `icon-16.png`, `icon-32.png`, `icon-48.png`, `comparison.png`, `rasterize.cjs`, `check.cjs`.

기존 Next 의존성의 sharp 0.35.5 / libvips 8.18.7을 사용했다. 새 패키지는 추가하지 않았다. `rasterize.cjs`는 후보를 임시 폴더에만 쓰며 제품 파일을 덮어쓰지 않는다. 최종 적용은 root의 승인된 Apple 픽셀 테스트 RED→GREEN 절차로 진행할 예정이다. 이 초안은 아직 적용·배포 완료 보고가 아니다.

## 기사 본문·공유·구조화 데이터

라이브 표본:
`/incidents/aecf5640897fa7dcb78afadd63962f385f57196c03da82b945f9d46acc9170e2`

| 요청 User-Agent | HTTP | 서버 HTML 제목·h1·canonical·JSON-LD | OG가 닫는 head 태그 이전에 존재 |
| --- | --- | --- | --- |
| Mozilla/5.0 | 200 | 있음 | 아니오 |
| Googlebot | 200 | 있음 | 아니오 |
| GPTBot | 200 | 있음 | 아니오 |
| OAI-SearchBot | 200 | 있음 | 아니오 |
| kakaotalk-scrap | 200 | 있음 | 예 |

일반·Googlebot·OpenAI UA의 전체 HTML에는 메타데이터와 본문이 내려온다. OG의 최초 head 위치 차이만으로 색인 실패나 AI 검색 실패를 단정하지 않는다. 카카오 공유 UA는 OG가 head 안에 내려옴을 확인했다. 실제 색인 여부·AI 서비스 내부 파싱 결과·공유 캐시는 이번 검사 범위 밖이다.

기사 JSON-LD는 `WebPage`와 `citation: CreativeWork`이며 기사 제목, 원문 URL, 유효한 발행 시각을 포함한다. 흉흉을 원문 취재·발행 주체로 주장하는 가짜 `NewsArticle` 데이터는 추가하지 않는다. 직접 진입에서는 지도 문맥에서만 확보되는 위치를 임의로 채우지 않는다. 홈의 `WebSite` JSON-LD도 라이브 HTML에 존재한다.

## 크롤링 경로와 색인 정책

- `/robots.txt`: 200, `User-Agent: *`, `Allow: /`, 올바른 `/sitemap.xml` 절대 URL.
- `/sitemap.xml`: 200 XML. 홈·목록·아카이브·안내 및 실제 기사 URL을 포함한다. 표본에서는 기사 18개 URL이 있었다. 소스는 최근 수집 20행을 ID로 중복 제거한다.
- `/archive`: 200, 자기 canonical·페이지 제목·실제 기사 링크가 서버 HTML에 존재한다. 소스에 이전/다음 페이지 링크가 있으며 수집 total에 따라 다음 페이지를 제공한다.
- `/archive?page=2`: 점검 시 200 + noindex, follow 및 해당 페이지 canonical. 이 표본만으로 다른 시점의 데이터 총량이나 모든 아카이브 페이지 정상 여부를 일반화하지 않는다.
- `/about`: 200, 서비스 설명·기사 발행일과 사건 시각 구분·AI 이미지·위치 정확도·원문 확인 안내가 서버 HTML에 있다.
- `/search?q=test`: 200, noindex, follow, 검색 루트 canonical.
- `/report`: 200, noindex, follow, 제보 canonical.
- 라이브 `/incidents/invalid`: 200 + noindex. 현재 PR의 404 문서 우회와 운영 배포 차이를 명시하며, 배포 후 실제 GET/HEAD·오류 본문·캐시를 확인한다.

## 공식 문서와 해석 범위

1. [Google Search Central — 검색결과 파비콘](https://developers.google.com/search/docs/appearance/favicon-in-search): 홈의 아이콘 링크와 크롤링 가능한 자산을 안내한다. 조건을 충족해도 검색결과 파비콘 표시는 보장되지 않는다. 현재 HTTP 확인과 검색결과 실제 노출 여부를 구분한다.
2. [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): Google AI Overviews·AI Mode에는 추가 기술 요건이나 특수 최적화가 필수라고 하지 않으며 기존 SEO 기본을 적용한다. 이 문서는 Google에 관한 근거이고 모든 외부 AI 서비스의 내부 동작을 증명하지 않는다.
3. [Next.js — favicon, icon, and apple-icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons): app 파일 기반 아이콘에서 head 태그를 생성하며 favicon은 app 최상단에 둔다. 현재 `src/app/`의 배치는 이 방식과 일치한다. 실제 버전별 동작은 위 라이브 태그로 확인했다.

특수 AEO/GEO 파일·무분별한 키워드 랜딩 페이지·허위 구조화 데이터 추가는 이번 점검의 결론이 아니다. 순위나 AI 답변 채택을 보장하지 않으며, 필수 수정은 확인된 Apple 픽셀 오류에 집중한다.

## 남은 최종 확인

root가 전체 gate 뒤 Apple 픽셀 회귀 RED→GREEN 및 실제 production 구성의 최종 브라우저 QA를 수행할 예정이다. 최종 증거에는 Apple 새 URL/ETag/픽셀, 기존 정상 ICO/SVG 보존, 실제 기사 공유 head, invalid 기사 HTTP 404 배포 확인을 구분해 남긴다. 이 감사 작성 중 제품·테스트·Git·원격에는 변경하지 않았다.
