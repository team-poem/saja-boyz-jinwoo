'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ArticleCard } from '@/features/article-list/ui/article-card/article-card';
import { articleText } from '@/features/article-list/model/article-presentation';

import type {
  LocatedArticle,
  MapArticleResult,
} from '../../model/map-article.types';
import {
  captureMapViewport,
  restoreMapViewport,
} from '../../model/map-viewport';

type MapInstance = {
  destroy(): void;
  getCenter?(): { lat(): number; lng(): number };
  getZoom?(): number;
  setCenter(point: unknown): void;
  fitBounds(
    points: unknown[],
    options: {
      top: number;
      right: number;
      bottom: number;
      left: number;
      maxZoom: number;
    },
  ): void;
  setSize(size: unknown): void;
};
type MarkerInstance = { setMap(map: MapInstance | null): void };
type NaverMaps = {
  Size: new (width: number, height: number) => unknown;
  Point: new (x: number, y: number) => unknown;
  Marker: new (options: {
    map: MapInstance;
    position: unknown;
    icon?:
      | { url: string; size: unknown; anchor: unknown }
      | { content: HTMLElement; anchor: unknown };
    title?: string;
  }) => MarkerInstance;
  Event: {
    addListener(
      target: MarkerInstance,
      event: string,
      callback: () => void,
    ): unknown;
    removeListener(listener: unknown): void;
  };
  LatLng: new (latitude: number, longitude: number) => unknown;
  Map: new (
    element: HTMLElement,
    options: { center: unknown; zoom: number },
  ) => MapInstance;
};

export function MapHome({
  clientId,
  articles,
}: {
  clientId: string;
  articles?: MapArticleResult | null;
}) {
  const [selectedArticles, setSelectedArticles] = useState<LocatedArticle[]>(
    [],
  );
  const canvas = useRef<HTMLDivElement>(null);
  const fitArticles = useRef<(() => void) | null>(null);
  const locate = useRef<(() => void) | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const viewport = restoreMapViewport(clientId);
    let disposed = false;
    let loadFailed = false;
    let map: MapInstance | undefined;
    let marker: MarkerInstance | undefined;
    const articleMarkers: { marker: MarkerInstance; listener: unknown }[] = [];
    let removeArticleListener: ((listener: unknown) => void) | undefined;
    const clearArticles = () => {
      for (const entry of articleMarkers.splice(0)) {
        removeArticleListener?.(entry.listener);
        entry.marker.setMap(null);
      }
    };
    let pending = false;
    let requestId = 0;
    let observer: ResizeObserver | undefined;
    const resize = () => {
      const maps = (window as Window & { naver?: { maps: NaverMaps } }).naver
        ?.maps;

      if (!disposed && !loadFailed && map && maps && canvas.current) {
        map.setSize(
          new maps.Size(
            canvas.current.clientWidth,
            canvas.current.clientHeight,
          ),
        );
      }
    };
    const sdkWindow = window as Window & { navermap_authFailure?: () => void };
    const previousAuthFailure = sdkWindow.navermap_authFailure;
    const initialize = () => {
      const maps = (window as Window & { naver?: { maps: NaverMaps } }).naver
        ?.maps;

      if (disposed || loadFailed || map || !canvas.current || !maps) return;
      map = new maps.Map(canvas.current, {
        center: new maps.LatLng(viewport.latitude, viewport.longitude),
        zoom: viewport.zoom,
      });

      fitArticles.current = () => {
        if (disposed || loadFailed || !map || !articles?.items.length) return;
        map.fitBounds(
          articles.items.map(
            (item) =>
              new maps.LatLng(item.location.latitude, item.location.longitude),
          ),
          { top: 150, right: 60, bottom: 180, left: 60, maxZoom: 15 },
        );
      };

      removeArticleListener = (listener) => maps.Event.removeListener(listener);
      const groups = new Map<string, LocatedArticle[]>();

      for (const item of articles?.items ?? []) {
        const key = `${item.location.latitude},${item.location.longitude}`;
        const group = groups.get(key) ?? [];

        group.push(item);
        groups.set(key, group);
      }

      for (const group of groups.values()) {
        const item = group[0];
        const title =
          group.length === 1
            ? articleText(item.article.title)
            : `${item.location.label} · 기사 ${group.length}건`;
        let icon: { content: HTMLElement; anchor: unknown } | undefined;

        if (group.length > 1) {
          const content = document.createElement('button');

          content.type = 'button';
          content.textContent = String(group.length);
          content.setAttribute('aria-label', title);
          content.className =
            'flex size-10 items-center justify-center rounded-full border-2 border-solid border-white bg-text text-sm font-bold text-white shadow-floating';
          icon = { content, anchor: new maps.Point(20, 20) };
        }

        const articleMarker = new maps.Marker({
          map,
          position: new maps.LatLng(
            item.location.latitude,
            item.location.longitude,
          ),
          title,
          ...(icon ? { icon } : {}),
        });
        const listener = maps.Event.addListener(articleMarker, 'click', () => {
          if (!disposed && !loadFailed) setSelectedArticles(group);
        });

        articleMarkers.push({ marker: articleMarker, listener });
      }

      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(resize);
        observer.observe(canvas.current);
      }

      window.addEventListener('resize', resize);

      locate.current = () => {
        if (disposed || loadFailed || !map || pending) return;
        setLocationError('');

        if (!navigator.geolocation) {
          setLocationError('이 브라우저는 위치 확인을 지원하지 않습니다.');

          return;
        }

        const currentRequest = ++requestId;

        pending = true;
        setLocating(true);
        const activeMap = map;
        const isActive = () =>
          !disposed &&
          !loadFailed &&
          map === activeMap &&
          currentRequest === requestId &&
          pending;
        const reject = (error?: GeolocationPositionError) => {
          if (!isActive()) return;
          pending = false;
          setLocating(false);
          setLocationError(
            error?.code === 1
              ? '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해 주세요.'
              : error?.code === 3
                ? '위치 확인 시간이 초과되었습니다. 다시 시도해 주세요.'
                : '위치를 확인하지 못했습니다. 다시 시도해 주세요.',
          );
        };

        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (!isActive()) return;
              const point = new maps.LatLng(
                position.coords.latitude,
                position.coords.longitude,
              );

              marker?.setMap(null);
              marker = new maps.Marker({
                map: activeMap,
                position: point,
                icon: {
                  url: '/naver-map-location.svg',
                  size: new maps.Size(24, 24),
                  anchor: new maps.Point(12, 12),
                },
              });
              activeMap.setCenter(point);
              pending = false;
              setLocating(false);
            },
            reject,
            { timeout: 10_000 },
          );
        } catch {
          reject();
        }
      };

      clearTimeout(timeout);
      setReady(true);
    };

    const url = new URL('https://oapi.map.naver.com/openapi/v3/maps.js');

    url.searchParams.set('ncpKeyId', clientId);

    for (const element of document.querySelectorAll('script[src]')) {
      const scriptUrl = new URL((element as HTMLScriptElement).src);

      if (
        scriptUrl.origin === url.origin &&
        scriptUrl.pathname === url.pathname &&
        scriptUrl.searchParams.get('ncpKeyId') !== clientId
      ) {
        element.remove();
      }
    }

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
      if (disposed || loadFailed) return;
      loadFailed = true;
      clearTimeout(timeout);
      locate.current = null;
      fitArticles.current = null;
      pending = false;
      setLocating(false);
      setLocationError('');
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      clearArticles();
      marker?.setMap(null);
      marker = undefined;
      map?.destroy();
      map = undefined;
      script.remove();
      setReady(false);
      setFailed(true);
    };

    sdkWindow.navermap_authFailure = fail;
    const timeout = setTimeout(fail, 10_000);

    script.addEventListener('load', initialize);
    script.addEventListener('error', fail);
    if (!existing) document.head.append(script);
    // A previous home visit may already have loaded the SDK.
    if (existing) queueMicrotask(initialize);

    return () => {
      disposed = true;
      locate.current = null;
      fitArticles.current = null;
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      clearArticles();
      marker?.setMap(null);
      clearTimeout(timeout);

      if (sdkWindow.navermap_authFailure === fail) {
        if (previousAuthFailure === undefined) {
          delete sdkWindow.navermap_authFailure;
        } else {
          sdkWindow.navermap_authFailure = previousAuthFailure;
        }
      }

      script.removeEventListener('load', initialize);
      script.removeEventListener('error', fail);
      if (map) captureMapViewport(clientId, map);
      map?.destroy();
    };
  }, [clientId, attempt, articles]);

  return (
    <section aria-label="주변 지도" className="relative">
      <div
        ref={canvas}
        className="h-[calc(100dvh-max(110px,env(safe-area-inset-bottom)_+_90px))] overflow-hidden"
      />
      <button
        type="button"
        aria-label="내 위치"
        aria-busy={locating}
        disabled={!ready || locating}
        onClick={() => locate.current?.()}
        className="absolute right-4 bottom-12 flex size-11 items-center justify-center rounded-full bg-white shadow-floating disabled:opacity-50"
      >
        <Image src="/naver-map-crosshair.svg" alt="" width={20} height={20} />
      </button>
      {ready && articles !== undefined && !articles?.items.length && (
        <div
          role="status"
          className="absolute top-26 right-4 left-4 rounded-2xl bg-floating p-3 text-sm text-muted shadow-floating"
        >
          {articles === null ? (
            <>
              <p>
                기사 위치를 불러오지 못했습니다. 지도는 계속 사용할 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-2 inline-block underline"
              >
                기사 위치 다시 불러오기
              </button>
            </>
          ) : (
            <>
              <p>아직 위치가 확인된 기사가 없습니다.</p>
              <Link href="/incidents" className="mt-2 inline-block underline">
                전체 기사 목록 보기
              </Link>
            </>
          )}
        </div>
      )}
      {ready && Boolean(articles?.items.length) && (
        <div className="absolute top-26 right-4 left-4 flex items-center justify-between gap-2 rounded-2xl bg-floating p-3 shadow-floating">
          <div className="text-xs text-muted">
            <p className="m-0">지도 기사 {articles!.items.length}건</p>
            {articles!.items.some(
              (item) => item.location.precision === 'region',
            ) && (
              <a
                href="https://www.data.go.kr/data/15084084/openapi.do"
                className="mt-1 inline-block text-[11px] underline"
              >
                지역 좌표: 기상청
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={() => fitArticles.current?.()}
            className="rounded-lg border border-border px-3 py-2 text-sm text-text"
          >
            기사 위치 보기
          </button>
        </div>
      )}
      {ready && selectedArticles.length > 0 && articles && (
        <section
          aria-label="선택한 기사"
          className="absolute right-4 bottom-28 left-4 rounded-2xl bg-floating p-3 shadow-floating"
        >
          <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted">
            <p className="m-0">
              선택한 위치의 기사 {selectedArticles.length}건
            </p>
            <button
              type="button"
              aria-label="기사 선택 닫기"
              onClick={() => setSelectedArticles([])}
              className="shrink-0 rounded-lg px-2 py-1 text-text"
            >
              닫기
            </button>
          </div>
          <div className="grid max-h-[45dvh] gap-3 overflow-y-auto">
            {selectedArticles.map((item) => (
              <div key={item.article_id}>
                <p className="mt-0 mb-2 text-xs text-muted">
                  {item.location.label} ·{' '}
                  {item.location.precision === 'address'
                    ? '기사에 언급된 주소 기준 위치'
                    : '지역 대표 위치 · 실제 발생 지점과 다를 수 있습니다'}
                </p>
                <ArticleCard item={item} apiOrigin={articles.apiOrigin} />
              </div>
            ))}
          </div>
        </section>
      )}
      {locationError && (
        <p
          role="status"
          className="absolute top-26 right-4 left-4 rounded-2xl bg-floating p-4 shadow-floating"
        >
          {locationError}
        </p>
      )}
      {failed && (
        <div
          role="alert"
          className="absolute top-26 right-4 left-4 rounded-2xl bg-floating p-4 shadow-floating"
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
          className="absolute top-26 right-4 left-4 rounded-2xl bg-floating p-4 shadow-floating"
        >
          지도를 불러오는 중입니다.
        </div>
      )}
    </section>
  );
}
