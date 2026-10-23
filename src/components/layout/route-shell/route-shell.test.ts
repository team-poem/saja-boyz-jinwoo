// @vitest-environment jsdom
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test, vi } from 'vitest';

import { RouteShell } from './route-shell';

let pathname = '/__missing-article';
let segments = ['_not-found'];
vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useSelectedLayoutSegments: () => segments,
}));

test('notFoundShellMatchesItsRewrittenDocumentDuringHydration', () => {
  const body = createElement('h1', null, '페이지를 찾을 수 없어요');
  try {
    for (const segment of ['_not-found', '/_not-found']) {
      segments = [segment];
      pathname = '/__missing-article';
      const server = renderToStaticMarkup(
        createElement(RouteShell, null, body),
      );
      pathname = '/incidents/' + 'f'.repeat(64);
      const hydrated = renderToStaticMarkup(
        createElement(RouteShell, null, body),
      );
      expect(
        hydrated,
        'rewrite된 서버 경로와 브라우저 원주소에서 같은 404 shell 유지: ' +
          segment,
      ).toBe(server);
      expect(hydrated).toContain('페이지를 찾을 수 없어요');
    }
    segments = ['(browse)'];
    expect(renderToStaticMarkup(createElement(RouteShell, null, body))).toBe(
      '<h1>페이지를 찾을 수 없어요</h1>',
    );
  } finally {
    pathname = '/__missing-article';
    segments = ['_not-found'];
  }
});
