'use client';

import { useEffect, useRef, useState } from 'react';

type MapInstance = { destroy(): void };
type NaverMaps = {
  LatLng: new (latitude: number, longitude: number) => unknown;
  Map: new (
    element: HTMLElement,
    options: { center: unknown; zoom: number },
  ) => MapInstance;
};

export function MapHome({ clientId }: { clientId: string }) {
  const canvas = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    let loadFailed = false;
    let map: MapInstance | undefined;
    const initialize = () => {
      const maps = (window as Window & { naver?: { maps: NaverMaps } }).naver
        ?.maps;
      if (disposed || loadFailed || map || !canvas.current || !maps) return;
      map = new maps.Map(canvas.current, {
        center: new maps.LatLng(37.5665, 126.978),
        zoom: 12,
      });
      setReady(true);
    };

    const url = new URL('https://oapi.map.naver.com/openapi/v3/maps.js');
    url.searchParams.set('ncpKeyId', clientId);
    let script = [...document.querySelectorAll('script')].find(
      (element) => element.src === url.href,
    );
    const existing = Boolean(script);
    if (!script) {
      script = document.createElement('script');
      script.src = url.href;
      script.async = true;
    }
    const fail = () => {
      if (disposed || map || loadFailed) return;
      loadFailed = true;
      script.remove();
      setFailed(true);
    };
    script.addEventListener('load', initialize);
    script.addEventListener('error', fail);
    if (!existing) document.head.append(script);
    // A previous home visit may already have loaded the SDK.
    if (existing) queueMicrotask(initialize);

    return () => {
      disposed = true;
      script.removeEventListener('load', initialize);
      script.removeEventListener('error', fail);
      map?.destroy();
    };
  }, [clientId, attempt]);

  return (
    <section aria-label="주변 지도" className="relative mt-6">
      <div
        ref={canvas}
        className="h-[calc(100dvh-240px)] min-h-[320px] overflow-hidden rounded-card"
      />
      {failed && (
        <div
          role="alert"
          className="absolute top-4 right-4 left-4 rounded-2xl bg-floating p-4 shadow-floating"
        >
          <p>지도를 불러오지 못했습니다. 다시 시도해 주세요.</p>
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setReady(false);
              setAttempt((value) => value + 1);
            }}
            className="rounded-lg border border-border px-4 py-2"
          >
            다시 시도
          </button>
        </div>
      )}
      {!ready && !failed && (
        <div
          role="status"
          aria-busy="true"
          className="absolute top-4 right-4 left-4 rounded-2xl bg-floating p-4 shadow-floating"
        >
          지도를 불러오는 중입니다.
        </div>
      )}
    </section>
  );
}
