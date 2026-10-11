'use client';

import Image from 'next/image';
import { useState } from 'react';

export function DetailImage({ src }: { src: string | null }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <p>이미지 없음</p>;

  return (
    <figure className="m-0">
      <Image
        src={src}
        alt=""
        width={768}
        height={512}
        unoptimized
        className="h-auto w-full rounded-lg"
        onError={() => setFailed(true)}
      />
      <figcaption className="mt-2 text-sm text-muted">
        AI 생성 이미지
      </figcaption>
    </figure>
  );
}
