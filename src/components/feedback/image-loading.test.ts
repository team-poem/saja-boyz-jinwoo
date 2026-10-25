// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, test, vi } from 'vitest';

import { ArticleImage } from '@/features/article-list/ui/article-image/article-image';
import { MapCarouselImage } from '@/features/map/ui/map-carousel-image/map-carousel-image';
import { DetailImage } from '@/app/incidents/[id]/detail-image';

let root: Root | undefined;
let host: HTMLDivElement;

afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  host?.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

test('articleImagesShowSkeletonUntilLoadAndRecoverAcrossUrlsAndCachedImages', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);

  for (const Component of [ArticleImage, MapCarouselImage, DetailImage]) {
    const draw = async (src: string | null) => {
      await act(async () => root!.render(createElement(Component, { src })));
    };
    const loading = () => host.querySelector('[data-image-loading]');
    const settle = async (event: 'load' | 'error') => {
      const image = host.querySelector('img');
      expect.soft(image, '요청할 이미지가 남아 있어야 함').not.toBeNull();
      if (!image) return;
      Object.defineProperty(image, 'complete', {
        configurable: true,
        value: true,
      });
      Object.defineProperty(image, 'naturalWidth', {
        configurable: true,
        value: event === 'load' ? 80 : 0,
      });
      await act(async () => image.dispatchEvent(new Event(event)));
    };

    await draw('https://image.example.invalid/a.jpg');
    expect
      .soft(loading(), `${Component.name}: 다운로드 중 스켈레톤`)
      .not.toBeNull();
    expect.soft(loading()?.getAttribute('aria-hidden')).toBe('true');
    expect
      .soft(host.querySelector('img'), '요청할 실제 이미지 유지')
      .not.toBeNull();
    if (Component === DetailImage)
      expect
        .soft(host.querySelector('figcaption')?.textContent)
        .toBe('AI로 생성된 이미지입니다.');
    else expect.soft(host.querySelector('figcaption')).toBeNull();
    await settle('load');
    expect.soft(loading(), '성공 시 스켈레톤 종료').toBeNull();
    expect.soft(host.querySelector('img')).not.toBeNull();

    await draw('https://image.example.invalid/b.jpg');
    expect.soft(loading(), '새 URL은 다시 대기').not.toBeNull();
    await settle('error');
    expect.soft(loading(), '실패 시 무한 로딩 없음').toBeNull();
    expect.soft(host.querySelector('img')).toBeNull();
    expect.soft(host.textContent).toContain('이미지 없음');
    expect.soft(host.querySelector('figcaption')).toBeNull();

    await draw('https://image.example.invalid/c.jpg');
    expect
      .soft(loading(), '이전 URL 실패가 새 이미지에 남지 않음')
      .not.toBeNull();
    await settle('load');
    expect.soft(loading()).toBeNull();
    expect.soft(host.querySelector('img')).not.toBeNull();

    await draw(null);
    expect.soft(loading()).toBeNull();
    expect.soft(host.querySelector('img')).toBeNull();
    expect.soft(host.textContent).toContain('이미지 없음');

    const cached = vi
      .spyOn(HTMLImageElement.prototype, 'complete', 'get')
      .mockReturnValue(true);
    const width = vi
      .spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get')
      .mockReturnValue(80);
    await draw('https://image.example.invalid/cached.jpg');
    expect.soft(loading(), '캐시 완료 이미지에 로딩이 남지 않음').toBeNull();
    expect.soft(host.querySelector('img')).not.toBeNull();
    cached.mockRestore();
    width.mockRestore();
  }
});
