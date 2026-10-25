'use client';

import Image from 'next/image';

import {
  ImageLoading,
  useImageLoading,
} from '@/components/feedback/image-loading';

export function ArticleImage({ src }: { src: string | null }) {
  const { status, attachImage, onLoad, onError } = useImageLoading(src);

  if (!src || status === 'failed') {
    return (
      <span className="col-start-1 row-span-4 row-start-1 grid size-20 place-items-center self-start rounded-lg bg-background text-[12px]/[normal] text-muted">
        이미지 없음
      </span>
    );
  }

  return (
    <figure className="col-start-1 row-span-4 row-start-1 relative m-0 w-20 self-start text-[11px]/[13px] text-muted">
      {status === 'loading' && <ImageLoading />}
      <Image
        key={src}
        className="relative block size-20 rounded-lg object-cover"
        src={src}
        alt=""
        width={80}
        height={80}
        unoptimized
        ref={attachImage}
        onLoad={onLoad}
        onError={onError}
      />
      <figcaption className="absolute inset-x-0 bottom-0 rounded-b-lg bg-text/80 px-1 py-0.5 text-center text-[9px]/3 text-surface">
        AI 생성 이미지
      </figcaption>
    </figure>
  );
}
