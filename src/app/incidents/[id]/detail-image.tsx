'use client';

import Image from 'next/image';
import { useState } from 'react';

export function DetailImage({ src }: { src: string | null }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <p className="m-0 grid h-[140px] w-full place-items-center rounded-lg bg-background text-sm text-muted">
        이미지 없음
      </p>
    );
  }

  return (
    <figure className="m-0">
      <Image
        src={src}
        alt=""
        width={720}
        height={280}
        unoptimized
        className="block h-[140px] w-full rounded-lg object-cover"
        onError={() => setFailed(true)}
      />
      <figcaption className="mt-1 text-[10px]/[14px] text-muted">
        AI 생성 이미지
      </figcaption>
    </figure>
  );
}
