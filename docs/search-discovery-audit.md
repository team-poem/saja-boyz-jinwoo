# 검색·공유 발견성 재점검 · 2026-10-25

현재 운영 `https://hyunghyung.vercel.app/`의 공개 HTTP 응답과 PR45를 비교했다. 최초 대조 소스는 ee0526b이며 미머지 코드와 운영 배포를 구분한다. UA를 지정한 요청은 실제 검색엔진 색인·AI 서비스 내부 파싱을 확인한 결과와 다르다.

## 조치

- Apple PNG의 원형 윤곽이 두 번 반복되고 하단이 잘리는 결함을 확인해 승인된 흉흉 SVG에서 재생성했다. 실제 픽셀 회귀와 재생성 스크립트를 추가했다. 기존 ICO16/32/48·SVG·OG는 정상이며 유지한다. 검색용96px PNG를 추가해 head의 image/png·96x96 선언과 실제 브라우저 디코딩을 회귀로 확인한다.
- 운영의 `/incidents/invalid`는 Googlebot 요청에서200+noindex다. 현재 PR의 문서404 처리를 배포한 뒤 실제 GET/HEAD 상태를 재확인해야 한다. 같은 기능을 중복 구현하거나 운영에 배포됐다고 주장하지 않는다.
- 나머지 확인 범위에서 새 필수 SEO/AEO/GEO 기능을 추가해야 할 결함은 발견하지 못했다. 사용자에게 보이는 사실·출처·서버 본문과 연결 경로를 유지한다.

## 아이콘과 배포

`/favicon.ico`·`/icon.svg`·`/apple-icon.png`·`/og/site.png`는 모두200이며 올바른 이미지 MIME을 반환했다. 점검 당시 라이브 바이트와 기존 로컬 자산의 SHA256은 같았다. 따라서 Apple 결함은 배포 전 래스터에도 존재했다. 생성 코드가 남아 있지 않아 특정 인코더 원인은 단정하지 않는다.

| rel              | 운영에서 확인한 href                         | sizes / type         |
| ---------------- | -------------------------------------------- | -------------------- |
| icon             | /favicon.ico?favicon.36ylx-q_7sg8z.ico       | 48x48 / image/x-icon |
| icon             | /icon.svg?icon.3zs-tz6hchnc6.svg             | any / image/svg+xml  |
| apple-touch-icon | /apple-icon.png?apple-icon.3ps9c2tys3jwq.png | 180x180 / image/png  |

쿼리가 있는 URL도200이며 `Cache-Control: public, max-age=0, must-revalidate`다. 파일 연결 누락이나 장기 HTTP 캐시 설정은 재현되지 않았다. 특정 사용자의 브라우저 파비콘 저장 상태는 미확인이다. 수정 배포 후 Apple의 새 버전 쿼리·ETag·실제 픽셀을 먼저 확인한다.

### 브라우저 검증에서의 정정

자동화에서 Next 응답을 가로챈 컨텍스트는 ICO 디코딩에 실패했다. 일반 HTTP의 두 MIME·압축 조건과 가로채기 없는 실제 Next/Chrome에서는 기존 ICO의 바이트·디코딩이 정상임을 확인했다. 실패 컨텍스트를 수정한 회귀에서96px PNG 누락만 RED로 다시 확인한 뒤 생성 후 GREEN을 관찰했다. 따라서 정상 ICO나 Next 설정을 우회·변경하지 않는다. 최종 기본 브라우저 HTTP 검증과 초기 진단 자료를 구분한다.

Google 가이드가 권장하는48px보다 큰 이미지로96px PNG를 제공한다. PNG는 공식 지원 형식이며 SVG·ICO·Apple 파일도 유지한다. 파일 메타데이터의 PNG 우선 선택과 기존 SVG 엔드포인트 보존을 구분한다. 이 조치가 실제 검색결과 노출을 보장하는 것은 아니다.

## 서버 본문·공유·출처

실제 기사 표본을 일반·Googlebot·GPTBot·OAI-SearchBot·카카오 UA로 요청했다. 모두200이며 전체 서버 HTML에 제목·본문·canonical·JSON-LD를 확인했다. 카카오에서는 OG가 닫는 head 앞에 있고, 나머지 표본은 전체 HTML에 메타데이터가 존재한다. 스트리밍 위치 차이만으로 색인 실패나 AI 서비스 내부 처리를 단정하지 않는다.

JSON-LD는 `WebPage`와 원문의 `CreativeWork` 인용으로 제목·원문 URL·유효한 발행일을 담는다. 흉흉을 원문 취재 주체로 표시하는 가짜 `NewsArticle`이나 직접 진입에서 확인하지 못하는 사건 위치는 추가하지 않는다. 홈 `WebSite`도 서버 HTML에서 확인했다.

| 경로            | 관찰                                                         |
| --------------- | ------------------------------------------------------------ |
| /robots.txt     | 200, User-Agent:* Allow:/, 올바른 sitemap 절대 URL           |
| /sitemap.xml    | 200 XML, 서비스 페이지와 실제 기사 URL. 표본18개 기사        |
| /archive        | 200, 자기 canonical·제목·실제 기사 링크·페이지 이동          |
| /archive?page=2 | 표본200, noindex/follow·해당 페이지 canonical                |
| /about          | 200, 서비스·발행일/사건 시각·AI 이미지·위치 정확도·원문 안내 |
| /search?q=test  | 200, noindex/follow·검색 루트 canonical                      |
| /report         | 200, noindex/follow·제보 canonical                           |

## 근거와 해석

- [Google 검색결과 파비콘](https://developers.google.com/search/docs/appearance/favicon-in-search): 홈 아이콘 링크와 크롤링 가능한 자산을 안내하며 검색결과 표시를 보장하지 않는다.
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): Google AI Overviews·AI Mode에 별도 필수 기술 요건이나 특수 최적화가 추가되는 것은 아니며 기존 SEO 기본을 적용한다. 이를 다른 AI 서비스의 내부 동작 증거로 일반화하지 않는다.
- [Next app icons](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons): app 파일 기반 아이콘에서 head 태그를 생성한다. 현재 배치는 이 방식과 일치하며 실제 태그는 위 응답으로 확인했다.

특수 파일·키워드 랜딩 페이지·허위 구조화 데이터를 늘리는 대신 검증 가능한 본문·출처·링크를 보존한다. 이 점검은 검색 순위·AI 답변 채택·파비콘 노출 보장이 아니다. 배포 후 잘못된 기사 주소의 실제404와 Apple 자산 변경을 재확인한다.
