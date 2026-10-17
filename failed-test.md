# 흉흉 상태 안내·위치 재시도 — 정확 테스트

신규1개와 제거된 UI 계약3개 교체. 나머지118개 유지. 등록 baseline118개, 최종122개. 테스트 생략이나 skip 없음.

## Node — src/features/map/ui/map-home/map-home.test.ts

```ts
// file: src/features/map/ui/map-home/map-home.test.ts
// @vitest-environment jsdom
import { act, createElement, StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
let HomePage: typeof import('@/app/page').default;

beforeEach(async () => {
  vi.resetModules();
  ({ default: HomePage } = await import('@/app/page'));
});

const dom = { window };
let root: Root;
let container: HTMLDivElement;
let oldId: string | undefined;

async function mount(id = 'map-test-id', strict = false) {
  oldId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  if (id) process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID = id;
  else delete process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  const page = await HomePage();
  await act(async () =>
    root.render(strict ? createElement(StrictMode, null, page) : page),
  );
}

afterEach(async () => {
  if (root) await act(async () => root.unmount());
  container?.remove();
  document
    .querySelectorAll('script[src*="oapi.map.naver.com/openapi/v3/maps.js"]')
    .forEach((node) => node.remove());
  Reflect.deleteProperty(window, 'naver');
  Reflect.deleteProperty(window, 'navermap_authFailure');
  Reflect.deleteProperty(navigator, 'geolocation');
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  if (oldId === undefined) delete process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  else process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID = oldId;
  vi.useRealTimers();
});

function script() {
  const node = document.querySelector<HTMLScriptElement>(
    'script[src*="oapi.map.naver.com/openapi/v3/maps.js"]',
  );
  expect(node).not.toBeNull();
  return node!;
}
function button(name: string) {
  const node = [...container.querySelectorAll('button')].find(
    (element) =>
      element.textContent?.includes(name) ||
      element.getAttribute('aria-label')?.includes(name),
  );
  expect(node).toBeDefined();
  return node!;
}
function sdk() {
  const centers: [number, number][] = [];
  let viewport = { latitude: 37.5665, longitude: 126.978, zoom: 12 };
  const listeners: Array<{ event: string; callback: () => void }> = [];
  class LatLng {
    constructor(
      private latitude: number,
      private longitude: number,
    ) {}
    lat() {
      return this.latitude;
    }
    lng() {
      return this.longitude;
    }
  }
  const destroy = vi.fn();
  const setMap = vi.fn();
  const created = vi.fn();
  const markers = vi.fn();
  const move = (point: LatLng) => {
    centers.push([point.lat(), point.lng()]);
    viewport = { ...viewport, latitude: point.lat(), longitude: point.lng() };
  };
  class MapFixture {
    constructor(
      element: HTMLElement,
      options: { center: LatLng; zoom: number },
    ) {
      viewport = {
        latitude: options.center.lat(),
        longitude: options.center.lng(),
        zoom: options.zoom,
      };
      created(element, options);
    }
    getCenter() {
      return new LatLng(viewport.latitude, viewport.longitude);
    }
    getZoom() {
      return viewport.zoom;
    }
    setCenter = move;
    panTo = move;
    destroy = destroy;
    setSize() {}
    refresh() {}
  }
  class MarkerFixture {
    constructor(options: unknown) {
      markers(options);
    }
    setMap = setMap;
    setPosition() {}
  }
  const naver = {
    maps: {
      Map: MapFixture,
      LatLng,
      Marker: MarkerFixture,
      Circle: MarkerFixture,
      Size: class {
        constructor(
          public width: number,
          public height: number,
        ) {}
      },
      Point: class {
        constructor(
          public x: number,
          public y: number,
        ) {}
      },
      Position: { TOP_RIGHT: 3, BOTTOM_LEFT: 6 },
      Event: {
        addListener: vi.fn(
          (_target: unknown, event: string, callback: () => void) => {
            const listener = { event, callback };
            listeners.push(listener);
            return listener;
          },
        ),
        removeListener: vi.fn(),
        clearInstanceListeners: vi.fn(),
        trigger: vi.fn(),
      },
    },
  };
  Object.assign(dom.window, { naver });
  vi.stubGlobal('naver', naver);
  return {
    centers,
    created,
    destroy,
    markers,
    setMap,
    get viewport() {
      return viewport;
    },
    pan(next: typeof viewport) {
      viewport = next;
      for (const listener of listeners.filter(
        (item) => item.event === 'dragstart',
      ))
        listener.callback();
    },
  };
}
async function loaded() {
  const fixture = sdk();
  await act(async () => script().dispatchEvent(new dom.window.Event('load')));
  return fixture;
}
function geolocation(value: unknown) {
  Object.defineProperty(dom.window.navigator, 'geolocation', {
    value,
    configurable: true,
  });
}
```

- [x] mapLocationNoticeRetriesWithoutReloadAndPreventsDuplicateRequests — 위치 오류에서 직접 재시도·중복 요청 잠금·지도 유지·성공 복구

```ts
test('mapLocationNoticeRetriesWithoutReloadAndPreventsDuplicateRequests', async () => {
  const successes: PositionCallback[] = [];
  const failures: PositionErrorCallback[] = [];
  const request = vi.fn(
    (success: PositionCallback, failure: PositionErrorCallback) => {
      successes.push(success);
      failures.push(failure);
    },
  );
  geolocation({ getCurrentPosition: request });
  await mount('map-test-id', true);
  expect(request).toHaveBeenCalledTimes(1);
  const fixture = await loaded();
  const originalScript = script();
  await act(async () =>
    failures[0]({ code: 3, message: 'timeout' } as GeolocationPositionError),
  );
  expect(container.textContent).toMatch(/시간.*초과/);
  const retry = container.querySelector<HTMLButtonElement>(
    'button[aria-label="위치 다시 시도"]',
  );
  expect(retry).not.toBeNull();
  expect(retry!.disabled).toBe(false);
  await act(async () => {
    retry!.click();
    retry!.click();
  });
  expect(request).toHaveBeenCalledTimes(2);
  expect(button('내 위치').disabled).toBe(true);
  expect(script()).toBe(originalScript);
  expect(fixture.created).toHaveBeenCalledTimes(1);
  await act(async () =>
    successes[1]({
      coords: { latitude: 35.1796, longitude: 129.0756, accuracy: 10 },
    } as GeolocationPosition),
  );
  expect(fixture.centers).toContainEqual([35.1796, 129.0756]);
  expect(button('내 위치').disabled).toBe(false);
  expect(container.textContent).not.toMatch(/시간.*초과/);
  expect(
    container.querySelector('button[aria-label="위치 다시 시도"]'),
  ).toBeNull();
  expect(script()).toBe(originalScript);
  expect(fixture.destroy).not.toHaveBeenCalled();
});
```

## Node — src/features/map/ui/map-home/map-articles.test.ts

```ts
// file: src/features/map/ui/map-home/map-articles.test.ts
// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, test, vi } from 'vitest';

import { MapHome } from './map-home';
import type { MapArticleResult } from '../../model/map-article.types';

let root: Root | undefined;
let container: HTMLDivElement;
const data: MapArticleResult = {
  total: 1,
  apiOrigin: 'https://news.example.com',
  items: [
    {
      article_id: 'a'.repeat(64),
      collection_id: 'collection',
      image_status: 'disabled',
      image_url: null,
      article: {
        title: '장림동 <b>공장</b> 화재',
        description: '부산 사하구 장림동에서 화재 발생',
        originallink: 'https://example.com/news',
        link: 'https://example.com/news',
        pubDate: 'Wed, 14 Oct 2026 08:00:00 +0900',
      },
      location_status: 'resolved',
      location_reason: null,
      location: {
        latitude: 35.083,
        longitude: 128.968,
        label: '부산 사하구 장림동',
        precision: 'region',
        evidence: { field: 'description', text: '부산 사하구 장림동에서' },
      },
    },
  ],
};

async function mount(result: MapArticleResult | null = data) {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const positions: unknown[] = [];
  const removed = vi.fn();
  const off = vi.fn();
  const fitBounds = vi.fn();
  const setCenter = vi.fn();
  const setZoom = vi.fn();
  const selected: (() => void)[] = [];
  class LatLng {
    constructor(
      public latitude: number,
      public longitude: number,
    ) {}
    lat() {
      return this.latitude;
    }
    lng() {
      return this.longitude;
    }
  }
  class Marker {
    constructor(
      public options: {
        position: unknown;
        title: string;
        icon?: { content: HTMLElement };
      },
    ) {
      positions.push(options);
      if (options.icon?.content) {
        container
          .querySelector('[aria-label="주변 지도"] > div')
          ?.append(options.icon.content);
      }
    }
    setMap(map: unknown) {
      removed(map);
      if (map === null) this.options.icon?.content.remove();
    }
  }
  Object.assign(window, {
    naver: {
      maps: {
        LatLng,
        Marker,
        Size: class {},
        Point: class {},
        Map: class {
          destroy = vi.fn();
          setSize = vi.fn();
          setCenter = setCenter;
          setZoom = setZoom;
          fitBounds = fitBounds;
        },
        Event: {
          addListener: vi.fn(
            (_target: unknown, _event: string, callback: () => void) => {
              selected.push(callback);
              return callback;
            },
          ),
          removeListener: off,
        },
      },
    },
  });
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  await act(async () =>
    root!.render(
      createElement(MapHome, { clientId: 'test', articles: result }),
    ),
  );
  await act(async () =>
    document
      .querySelector('script[src*="oapi.map.naver.com"]')!
      .dispatchEvent(new Event('load')),
  );
  return { positions, selected, removed, off, fitBounds, setCenter, setZoom };
}

afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  container?.remove();
  document
    .querySelectorAll('script[src*="oapi.map.naver.com"]')
    .forEach((node) => node.remove());
  Reflect.deleteProperty(window, 'naver');
  Reflect.deleteProperty(window, 'navermap_authFailure');
  vi.unstubAllGlobals();
});
```

- [x] mapRemovedOverviewControlKeepsMultiArticleViewportUntouched — 기존 제거된 지도 컨트롤 계약 교체

```ts
test('mapRemovedOverviewControlKeepsMultiArticleViewportUntouched', async () => {
  const second = {
    ...data.items[0],
    article_id: 'b'.repeat(64),
    location: { ...data.items[0].location, latitude: 37.55, longitude: 126.97 },
  };
  const fixture = await mount({
    ...data,
    total: 2,
    items: [...data.items, second],
  });
  expect(fixture.positions).toHaveLength(2);
  expect(container.textContent).not.toContain('기사 위치 보기');
  expect(container.textContent).not.toContain('지역 좌표: 기상청');
  expect(fixture.fitBounds).not.toHaveBeenCalled();
  expect(fixture.setCenter).not.toHaveBeenCalled();
  expect(fixture.setZoom).not.toHaveBeenCalled();
});
```

- [x] mapCoordinateSourceLivesInServiceInfoWithoutMapOverlay — 기존 제거된 지도 컨트롤 계약 교체

```ts
test('mapCoordinateSourceLivesInServiceInfoWithoutMapOverlay', async () => {
  const fixture = await mount();
  expect(
    container.querySelector(
      'a[href="https://www.data.go.kr/data/15084084/openapi.do"]',
    ),
  ).toBeNull();
  expect(container.textContent).not.toContain('지역 좌표: 기상청');
  await act(async () => fixture.selected[0]());
  expect(
    document.querySelector('[aria-label="선택한 기사"]')?.textContent,
  ).toContain('지역 대표 위치 · 실제 발생 지점과 다를 수 있습니다');
  const { default: AboutPage } = await import('@/app/about/page');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const info = document.createElement('div');
  info.innerHTML = renderToStaticMarkup(createElement(AboutPage));
  const source = info.querySelector(
    'a[href="https://www.data.go.kr/data/15084084/openapi.do"]',
  );
  expect(source?.textContent).toContain('기상청');
  expect(info.textContent).toContain('정확한 사건 현장과 다를 수 있습니다');
});
```

- [ ] mapRemovedOverviewControlDoesNotRecenterSingleOrDuplicatePositions — 기존 제거된 지도 컨트롤 계약 교체

```ts
test('mapRemovedOverviewControlDoesNotRecenterSingleOrDuplicatePositions', async () => {
  for (const items of [
    data.items,
    [...data.items, { ...data.items[0], article_id: 'b'.repeat(64) }],
  ]) {
    const fixture = await mount({ ...data, total: items.length, items });
    expect(fixture.positions).toHaveLength(1);
    expect(container.textContent).not.toContain('기사 위치 보기');
    expect(
      container.querySelector(
        'a[href="https://www.data.go.kr/data/15084084/openapi.do"]',
      ),
    ).toBeNull();
    expect(fixture.setCenter).not.toHaveBeenCalled();
    expect(fixture.setZoom).not.toHaveBeenCalled();
    expect(fixture.fitBounds).not.toHaveBeenCalled();
    await act(async () => root!.unmount());
    root = undefined;
    container.remove();
    document
      .querySelectorAll('script[src*="oapi.map.naver.com"]')
      .forEach((node) => node.remove());
  }
});
```

