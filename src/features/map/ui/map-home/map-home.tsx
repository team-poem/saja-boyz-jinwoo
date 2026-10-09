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

  useEffect(() => {
    let disposed = false;
    let map: MapInstance | undefined;
    const initialize = () => {
      const maps = (window as Window & { naver?: { maps: NaverMaps } }).naver
        ?.maps;
      if (disposed || map || !canvas.current || !maps) return;
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
    script.addEventListener('load', initialize);
    if (!existing) document.head.append(script);
    // A previous home visit may already have loaded the SDK.
    queueMicrotask(initialize);

    return () => {
      disposed = true;
      script.removeEventListener('load', initialize);
      map?.destroy();
    };
  }, [clientId]);

  return (
    <section aria-label="주변 지도" className="relative mt-6">
      <div
        ref={canvas}
        className="h-[calc(100dvh-240px)] min-h-[320px] overflow-hidden rounded-card"
      />
      {!ready && (
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
