import Image from 'next/image';
import Link from 'next/link';
import styles from './shared-ui.module.css';
export function SearchHeader({
  query,
  brand = '흉흉',
}: {
  query?: string;
  brand?: string;
}) {
  const href = query
    ? `/search?${new URLSearchParams({ q: query })}`
    : '/search';
  return (
    <header className={styles.searchHeader} data-node-id="18:2360">
      <Link className={styles.brand} href="/" aria-label={`${brand} 홈`}>
        <Image src="/figma/shared/brand-dot.svg" alt="" width={8} height={8} />
        {brand}
      </Link>
      <span className={styles.divider} aria-hidden="true" />
      <Link
        href={href}
        className={styles.searchLink}
        aria-label="주소, 사고 유형 검색"
      >
        <span className={styles.searchPlaceholder}>
          {query || '주소, 사고 유형 검색...'}
        </span>
        <span className={styles.searchAction} aria-hidden="true">
          🔍
        </span>
      </Link>
    </header>
  );
}
