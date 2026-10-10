// file: src/features/search/ui/recent-searches/recent-searches.test.ts
// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import SearchPage from '@/app/search/page';

const storageKey = 'hh:recent-searches:v1';
const request = vi.fn<typeof fetch>();
let root: Root | undefined;
let container: HTMLDivElement;

beforeEach(() => {
  localStorage.clear();
  request.mockReset();
  request.mockImplementation(async () =>
    Response.json({ total: 0, items: [] }),
  );
  vi.stubEnv('NEWS_API_BASE_URL', 'https://news.example.invalid');
  vi.stubGlobal('fetch', request);
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  container = document.createElement('div');
  document.body.append(container);
});
async function unmount() {
  if (root) await act(async () => root?.unmount());
  root = undefined;
}
afterEach(async () => {
  await unmount();
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  localStorage.clear();
});
async function mount(q?: string | string[]) {
  const page = await SearchPage({ searchParams: Promise.resolve({ q }) });
  root ??= createRoot(container);
  await act(async () => root?.render(page));
}
function recent() {
  const section = container.querySelector('section[aria-label="최근 검색"]');
  expect(section).not.toBeNull();
  return section!;
}
function terms() {
  return Array.from(recent().querySelectorAll('a')).map((link) => {
    const url = new URL(
      link.getAttribute('href') ?? '',
      'https://app.example.invalid',
    );
    expect(url.pathname).toBe('/search');
    return url.searchParams.get('q');
  });
}
function stored() {
  return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as string[];
}

test('recentSearchesRestoreStoredKeywordsWithoutFetching', async () => {
  const keywords = ['서울 소방서', '서교동 화재'];
  localStorage.setItem(storageKey, JSON.stringify(keywords));
  await mount();
  expect(terms()).toEqual(keywords);
  expect(recent().textContent).not.toContain('실시간 강남역');
  expect(request).not.toHaveBeenCalled();
  const input = container.querySelector('input[name="q"]');
  expect(input).toBeInstanceOf(HTMLInputElement);
  await act(async () => {
    (input as HTMLInputElement).value = '아직 입력 중';
    input!.dispatchEvent(new Event('input', { bubbles: true }));
  });
  expect(stored()).toEqual(keywords);
  expect(request).not.toHaveBeenCalled();
});

test('recentSearchesRecordExecutedKeywordAndDeduplicate', async () => {
  localStorage.setItem(
    storageKey,
    JSON.stringify(['서교동 화재', '서울 & 화재', '서울 & 화재']),
  );
  await mount(['  서울 & 화재  ', '무시할 값']);
  expect(stored()).toEqual(['서울 & 화재', '서교동 화재']);
  expect(
    new URL(String(request.mock.calls[0][0])).searchParams.get('keyword'),
  ).toBe('서울 & 화재');
  await mount('대형화재');
  expect(stored()).toEqual(['대형화재', '서울 & 화재', '서교동 화재']);
  await unmount();
  await mount('   ');
  expect(terms()).toEqual(['대형화재', '서울 & 화재', '서교동 화재']);
  expect(request).toHaveBeenCalledTimes(2);
});
