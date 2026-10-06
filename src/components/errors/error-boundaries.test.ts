// file: src/components/errors/error-boundaries.test.ts
// @vitest-environment jsdom
import { afterEach, assert, beforeEach, expect, test, vi } from 'vitest';
import { act, createElement, type ComponentType, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

let pathname = '/incidents';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));
const modules = import.meta.glob([
  './feature-error-boundary.tsx',
  '../../app/error.tsx',
  '../../app/global-error.tsx',
]);
let container: HTMLDivElement;
let root: Root;
beforeEach(() => {
  pathname = '/incidents';
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
async function draw(node: ReactNode) {
  await act(async () => root.render(node));
}
async function clickRetry() {
  const button = Array.from(container.querySelectorAll('button')).find((el) =>
    el.textContent?.includes('다시 시도'),
  );
  assert(button);
  await act(async () => button.click());
}
function Throw({ error }: { error: Error | null }) {
  if (error) throw error;
  return createElement('p', null, '정상 내용');
}
async function boundaries() {
  const load = modules['./feature-error-boundary.tsx'];
  expect(load, '공용 오류 경계 모듈이 있어야 한다').toBeTypeOf('function');
  return (await load()) as {
    FeatureError: new (
      reason: 'network' | 'configuration' | 'invalid-response',
    ) => Error & { reason: string };
    FeatureErrorBoundary: ComponentType<{ children: ReactNode }>;
  };
}

test('featureErrorClassifiesAndPropagates', async () => {
  const { FeatureError, FeatureErrorBoundary } = await boundaries();
  for (const [reason, message] of [
    ['network', '연결을 확인'],
    ['configuration', '서비스 설정'],
    ['invalid-response', '응답을 확인'],
  ] as const) {
    await draw(null);
    const error = new FeatureError(reason);
    error.message = 'SECRET_INTERNAL_MESSAGE';
    await draw(
      createElement(
        FeatureErrorBoundary,
        null,
        createElement(Throw, { error }),
      ),
    );
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      message,
    );
    expect(container.textContent).not.toContain('SECRET_INTERNAL_MESSAGE');
  }
  await draw(null);
  await draw(
    createElement(
      FeatureErrorBoundary,
      null,
      createElement(Throw, { error: new Error('SECRET_UNKNOWN') }),
    ),
  );
  expect(container.querySelector('[role="alert"]')?.textContent).toContain(
    '화면을 표시하지 못했어요',
  );
  expect(container.textContent).not.toContain('SECRET_UNKNOWN');
});
