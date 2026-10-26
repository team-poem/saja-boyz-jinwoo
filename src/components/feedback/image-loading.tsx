'use client';

import { useCallback, useState } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'failed';

export function useImageLoading(src: string | null) {
  const [result, setResult] = useState<{
    src: string | null;
    status: ImageStatus;
  } | null>(null);
  const status = !src
    ? 'failed'
    : result?.src === src
      ? result.status
      : 'loading';
  const attachImage = useCallback(
    (image: HTMLImageElement | null) => {
      if (image?.complete) {
        setResult({
          src,
          status: image.naturalWidth > 0 ? 'loaded' : 'failed',
        });
      }
    },
    [src],
  );

  return {
    status,
    attachImage,
    onLoad: () => setResult({ src, status: 'loaded' }),
    onError: () => setResult({ src, status: 'failed' }),
  };
}

export function ImageLoading() {
  return (
    <span
      data-image-loading=""
      aria-hidden="true"
      className="ui-skeleton-pulse pointer-events-none absolute inset-0 rounded-lg bg-border"
    />
  );
}
