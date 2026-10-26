import { createServer } from 'node:http';
import { writeFile, mkdir } from 'node:fs/promises';

export const ids = {
  single: 'a'.repeat(64),
  pairFirst: 'b'.repeat(64),
  pairSecond: 'c'.repeat(64),
  unavailable: 'd'.repeat(64),
  unsafe: 'e'.repeat(64),
  missing: 'f'.repeat(64),
};
export const port = Number(process.env.QA_API_PORT || 41043);
const dataDirectory = '/private/tmp/hyunghyung-detail-qa';
const created = '2026-10-23T09:00:00+09:00';
const make = (articleId, title, index = 0) => ({
  collection_id: 'local-detail-qa',
  article_id: articleId,
  image_status: 'ready',
  image_url: `/images/${articleId}.jpg`,
  article: {
    title,
    description: `${title}의 바텀시트·검색·공유 검증용 요약입니다. 실제 사건 정보가 아닙니다. ${'읽기 영역과 스크롤을 확인하는 검증 문장입니다. '.repeat(index === 0 ? 28 : 3)}`,
    pubDate: new Date(new Date(created).getTime() - index * 60000).toISOString(),
    originallink: `https://publisher.example.invalid/news/${articleId}`,
    link: `https://portal.example.invalid/news/${articleId}`,
  },
});
const single = make(ids.single, '검증용 기사 · 서울 단일 지역 도로 점검');
const pair = [
  make(ids.pairFirst, '검증용 기사 · 부산 같은 지역 첫 번째 보도', 1),
  make(ids.pairSecond, '검증용 기사 · 부산 같은 지역 두 번째 보도', 2),
];
const group12 = Array.from({ length: 12 }, (_, i) =>
  make((1000 + i).toString(16).padStart(64, '0'), `검증용 기사 · 대구 같은 지역 ${i + 1}번째 보도`, i + 3),
);
const others = Array.from({ length: 46 }, (_, i) =>
  make((2000 + i).toString(16).padStart(64, '0'), `검증용 기사 · 목록 검색 후속 보도 ${i + 1}`, i + 15),
);
const unsafe = make(ids.unsafe, '검증용 &lt;/script&gt;&lt;img src=x onerror=alert(1)&gt;', 0);
unsafe.article.description = '검증용 &lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;';
unsafe.article.pubDate = '2026-02-31T00:00:00Z';
unsafe.article.originallink = 'javascript:alert(1)';
unsafe.article.link = 'data:text/html,unsafe';
unsafe.image_status = 'disabled';
unsafe.image_url = null;
const items = [single, ...pair, ...group12, ...others];
const details = new Map([...items, unsafe].map((item) => [item.article_id, item]));
function located(item, label, latitude, longitude) {
  return {
    ...item,
    location_status: 'resolved',
    location_reason: null,
    location: {
      latitude,
      longitude,
      label,
      precision: 'region',
      evidence: { field: 'title', text: label },
    },
  };
}
const mapItems = [
  located(single, '서울', 37.5665, 126.978),
  ...pair.map((item) => located(item, '부산', 35.1796, 129.0756)),
  ...group12.map((item) => located(item, '대구', 35.8714, 128.6014)),
];
const requests = [];
let mode = 'ok';
// A local synthetic illustration, explicitly marked as QA; no remote image calls.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400"><rect width="720" height="400" fill="#e6edf3"/><rect x="40" y="45" width="640" height="310" rx="24" fill="#d9e3ec"/><path d="M70 300 L240 120 L350 250 L510 90 L650 300" stroke="#9caebf" stroke-width="25" fill="none"/><rect x="215" y="166" width="290" height="68" rx="16" fill="#ffffff"/><text x="360" y="209" font-family="sans-serif" font-size="34" text-anchor="middle" fill="#25354a">QA FIXTURE</text></svg>`;
const respond = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
};
await mkdir(dataDirectory, { recursive: true });
export const server = createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://fixture.invalid');
  const { pathname, searchParams } = url;
  // Only local fixture path/query are recorded. No headers, tokens, or real positions.
  if (!pathname.startsWith('/__qa')) requests.push({ method: req.method, path: pathname, query: url.search });
  if (req.method !== 'GET') return respond(res, 405, { error: 'QA_GET_ONLY' });
  if (pathname === '/__qa/health') return respond(res, 200, { ok: true, total: items.length, mapGroups: [1, 2, 12], ids, mode });
  if (pathname === '/__qa/requests') return respond(res, 200, { requests });
  if (pathname === '/__qa/reset') { requests.length = 0; mode = searchParams.get('mode') || 'ok'; return respond(res, 200, { ok: true, mode }); }
  if (/^\/images\/[a-f0-9]{64}\.jpg$/.test(pathname)) {
    res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
    return res.end(svg);
  }
  if (pathname === '/news') {
    if (mode === 'list-error' || searchParams.get('keyword') === '검증503') return respond(res, 503, { error: 'QA_PRIVATE_DIAGNOSTIC' });
    const keyword = (searchParams.get('keyword') || '').toLowerCase();
    const filtered = items.filter((item) => !keyword || item.article.title.toLowerCase().includes(keyword));
    const offset = Number(searchParams.get('offset') || 0);
    const limit = Number(searchParams.get('limit') || 20);
    return respond(res, 200, { total: filtered.length, items: filtered.slice(offset, offset + limit) });
  }
  if (pathname === '/map/articles') {
    const offset = Number(searchParams.get('offset') || 0);
    const limit = Number(searchParams.get('limit') || 100);
    return respond(res, 200, { total: mapItems.length, items: mapItems.slice(offset, offset + limit) });
  }
  if (pathname.startsWith('/news/')) {
    const id = pathname.slice('/news/'.length);
    if (id === ids.unavailable) return respond(res, 503, { error: 'QA_PRIVATE_DIAGNOSTIC' });
    if (id === ids.single && mode === 'detail-error') return respond(res, 503, { error: 'QA_PRIVATE_DIAGNOSTIC' });
    const item = details.get(id);
    return respond(res, item ? 200 : 404, item || { error: 'QA_NOT_FOUND' });
  }
  return respond(res, 404, { error: 'QA_NOT_FOUND' });
});
server.listen(port, '127.0.0.1', () => {
  console.log(JSON.stringify({ fixture: `http://127.0.0.1:${port}`, total: items.length, mapGroups: [1, 2, 12] }));
});
async function stop() {
  await writeFile(`${dataDirectory}/fixture-requests.json`, JSON.stringify(requests, null, 2));
  server.closeAllConnections();
  server.close(() => process.exit(0));
}
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
