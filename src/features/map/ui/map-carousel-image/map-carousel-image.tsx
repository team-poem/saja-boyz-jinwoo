'use client';

import Image from 'next/image';

import {
  ImageLoading,
  useImageLoading,
} from '@/components/feedback/image-loading';

export function MapCarouselImage({ src }: { src: string | null }) {
  const { status, attachImage, onLoad, onError } = useImageLoading(src);

  return (
    <figure className="relative m-0 h-20 w-full overflow-hidden rounded-lg bg-background [@media(max-height:550px)]:hidden">
      {src && status !== 'failed' ? (
        <>
          {status === 'loading' && <ImageLoading />}
          <Image
            key={src}
            src={src}
            alt=""
            width={176}
            height={80}
            unoptimized
            ref={attachImage}
            onLoad={onLoad}
            onError={onError}
            className="relative block h-20 w-full object-cover"
          />
          <figcaption className="absolute right-1 bottom-1 rounded bg-[#292929]/80 px-1.5 py-0.5 text-[8px]/[10px] text-[#dedede]">
            AI 생성 이미지
          </figcaption>
        </>
      ) : (
        <span className="grid h-full place-items-center text-[12px]/[normal] text-muted">
          이미지 없음
        </span>
      )}
    </figure>
  );
}
