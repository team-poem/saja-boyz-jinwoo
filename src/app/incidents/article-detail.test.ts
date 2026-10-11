// file: src/app/incidents/article-detail.test.ts
// @vitest-environment jsdom
import { afterEach, assert, beforeEach, expect, test, vi } from 'vitest';
import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import DetailPage from './[id]/page';

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('TEST_ARTICLE_NOT_FOUND');
  },
}));

const id = 'a'.repeat(64);
const apiOrigin = 'https://news.example.invalid';
const item = {
  collection_id: 'test-collection',
  article_id: id,
  article: {
    title: '교통 <b>안내</b> &amp; 점검',
    description: '도로 점검으로 우회가 필요합니다.',
    pubDate: '2026-10-10T09:00:00+09:00',
    originallink: 'https://publisher.example.invalid/article',
    link: 'https://portal.example.invalid/article',
  },
  image_status: 'ready',
  image_url: `/images/${id}.jpg`,
};
const fetchMock = vi.fn<typeof fetch>();
const detailRoute: (props: {
  params: Promise<{ id: string }>;
}) => ReactNode | void | Promise<ReactNode | void> = DetailPage;
let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubEnv('NEWS_API_BASE_URL', apiOrigin);
  vi.stubGlobal('fetch', fetchMock);
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  window.history.replaceState(null, '', '/');
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  fetchMock.mockReset();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  window.history.replaceState(null, '', '/');
});

async function detailTree(articleId = id) {
  return (
    (await detailRoute({ params: Promise.resolve({ id: articleId }) })) ?? null
  );
}

async function detailMarkup() {
  const outcome = await detailTree().then(
    (tree) => ({ tree }),
    (error: unknown) => ({ error }),
  );
  expect(outcome).not.toHaveProperty('error');
  assert('tree' in outcome);
  const view = document.createElement('div');
  view.innerHTML = renderToStaticMarkup(outcome.tree);
  return view;
}

test('articleDetailRequestAndContent', async () => {
  fetchMock.mockResolvedValueOnce(Response.json(item));
  const view = await detailMarkup();
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [input, init] = fetchMock.mock.calls[0];
  const url = new URL(input instanceof Request ? input.url : String(input));
  expect(url.href).toBe(`${apiOrigin}/news/${id}`);
  expect(init?.method).toBe('GET');
  expect(init?.cache).toBe('no-store');
  expect(init?.body).toBeUndefined();
  expect(init?.signal).toBeTruthy();
  expect(view.querySelector('h1')?.textContent).toBe('교통 안내 & 점검');
  expect(view.textContent).toContain('기사 요약');
  expect(view.textContent).toContain(item.article.description);
  expect(view.textContent).toContain('기사 발행');
  expect(view.textContent).toContain('2026-10-10 09:00 KST');
  expect(view.querySelector('time')?.dateTime).toBe('2026-10-10T00:00:00.000Z');
  expect(
    view.querySelector('a[href="https://publisher.example.invalid/article"]')
      ?.textContent,
  ).toContain('원문');
  expect(
    view.querySelector(`img[src="${apiOrigin}/images/${id}.jpg"]`),
  ).not.toBeNull();
  expect(view.textContent).toContain('AI 생성 이미지');
  expect(view.textContent).not.toMatch(/사건 위치|발생 시각|타임라인/);
  expect(view.querySelector('a[href="/incidents"]')).not.toBeNull();
  expect(view.querySelector('a[href="/"]')).not.toBeNull();
});

test('articleDetailFailureStates', async () => {
  for (const invalidId of [
    'short',
    'A'.repeat(64),
    '../news',
    'a'.repeat(65),
  ]) {
    await expect(detailTree(invalidId)).rejects.toThrow(
      'TEST_ARTICLE_NOT_FOUND',
    );
  }
  expect(fetchMock).not.toHaveBeenCalled();
  fetchMock.mockResolvedValueOnce(new Response('', { status: 404 }));
  await expect(detailTree()).rejects.toThrow('TEST_ARTICLE_NOT_FOUND');
  expect(fetchMock).toHaveBeenCalledTimes(1);
  fetchMock.mockReset();
  const expectFailure = (view: HTMLDivElement) => {
    const alert = view.querySelector('[role="alert"]');
    assert(alert);
    expect(alert.textContent).toContain('기사를 불러오지 못했어요');
    expect(
      alert.querySelector(`a[href="/incidents/${id}"]`)?.textContent,
    ).toContain('다시 시도');
    expect(view.textContent).not.toMatch(
      /PRIVATE_DETAIL|기사를 찾을 수 없어요/,
    );
    expect(view.querySelector('h1')?.textContent).not.toBe('교통 안내 & 점검');
  };
  for (const base of [
    '',
    'file:///tmp/news',
    'https://user:secret@news.example.invalid',
  ]) {
    vi.stubEnv('NEWS_API_BASE_URL', base);
    expectFailure(await detailMarkup());
  }
  expect(fetchMock).not.toHaveBeenCalled();
  vi.stubEnv('NEWS_API_BASE_URL', apiOrigin);
  fetchMock.mockRejectedValueOnce(new Error('PRIVATE_DETAIL'));
  expectFailure(await detailMarkup());
  fetchMock.mockResolvedValueOnce(
    new Response('PRIVATE_DETAIL', { status: 503 }),
  );
  expectFailure(await detailMarkup());
  fetchMock.mockResolvedValueOnce(new Response('invalid-json'));
  expectFailure(await detailMarkup());
  for (const payload of [
    null,
    { ...item, article_id: 'b'.repeat(64) },
    { ...item, article: null },
    { ...item, article: { ...item.article, description: 42 } },
    { ...item, image_url: 42 },
  ]) {
    fetchMock.mockResolvedValueOnce(Response.json(payload));
    expectFailure(await detailMarkup());
  }
});
