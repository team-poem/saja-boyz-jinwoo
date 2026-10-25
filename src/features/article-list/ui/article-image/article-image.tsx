'use client';

import Image from 'next/image';

import {
  ImageLoading,
  useImageLoading,
} from '@/components/feedback/image-loading';

export function ArticleImage({
  src,
  showAiCaption = false,
}: {
  src: string | null;
  showAiCaption?: boolean;
}) {
  const { status, attachImage, onLoad, onError } = useImageLoading(src);

  if (!src || status === 'failed') {
    return (
      <span className="col-start-1 row-span-4 row-start-1 grid size-20 place-items-center self-start rounded-lg bg-background text-[12px]/[normal] text-muted">
        이미지 없음
      </span>
    );
  }

  return (
    <figure className="col-start-1 row-span-4 row-start-1 m-0 w-20 self-start text-[11px]/[13px] text-muted">
      <div className="relative size-20">
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
      </div>
      {showAiCaption && (
        <figcaption className="mt-1 text-[9px]/3 text-muted">
          AI로 생성된 이미지입니다.
        </figcaption>
      )}
    </figure>
  );
}
