'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './article-list.module.css';

export function ArticleImage({ src }: { src: string | null }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className={styles.placeholder}>이미지 없음</span>;
  }

  return (
    <figure className={styles.image}>
      <Image
        className={styles.thumbnail}
        src={src}
        alt=""
        width={80}
        height={80}
        unoptimized
        onError={() => setFailed(true)}
      />
      <figcaption>AI 생성 이미지</figcaption>
    </figure>
  );
}
