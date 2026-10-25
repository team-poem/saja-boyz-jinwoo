'use client';

import Image from 'next/image';

import {
  ImageLoading,
  useImageLoading,
} from '@/components/feedback/image-loading';

export function DetailImage({ src }: { src: string | null }) {
  const { status, attachImage, onLoad, onError } = useImageLoading(src);

  if (!src || status === 'failed') {
    return (
      <p className="m-0 grid h-[140px] w-full place-items-center rounded-lg bg-background text-sm text-muted">
        이미지 없음
      </p>
    );
  }

  return (
    <figure className="m-0">
      <div className="relative h-[140px]">
        {status === 'loading' && <ImageLoading />}
        <Image
          key={src}
          src={src}
          alt=""
          width={720}
          height={280}
          unoptimized
          className="relative block h-[140px] w-full rounded-lg object-cover"
          ref={attachImage}
          onLoad={onLoad}
          onError={onError}
        />
      </div>
      <figcaption className="mt-1 text-[10px]/[15px] text-muted">
        AI로 생성된 이미지입니다.
      </figcaption>
    </figure>
  );
}
