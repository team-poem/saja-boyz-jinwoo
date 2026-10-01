'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  readFilterSelection,
  writeFilterSelection,
} from '@/features/incidents/filter-selection';
import styles from './shared-ui.module.css';
export function BottomNav() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = writeFilterSelection(
    readFilterSelection(new URLSearchParams(searchParams.toString())),
  ).toString();
  const suffix = query ? `?${query}` : '';
  const home = path === '/';
  const list = path === '/incidents';
  return (
    <nav
      className={styles.bottomNav}
      aria-label="주 메뉴"
      data-node-id="18:2428"
    >
      <Link
        href={`/${suffix}`}
        className={`${styles.navTab} ${home ? styles.activeTab : ''}`}
        aria-current={home ? 'page' : undefined}
      >
        <span className={styles.mapIcon}>
          <Image
            src="/figma/shared/map-pin.svg"
            alt=""
            width={22}
            height={22}
          />
        </span>
        <span>홈</span>
      </Link>
      <Link
        href="/report"
        className={styles.reportAction}
        aria-label="사건 제보하기"
      >
        <span aria-hidden="true">📢</span>
      </Link>
      <Link
        href={`/incidents${suffix}`}
        className={`${styles.navTab} ${list ? styles.activeTab : ''}`}
        aria-current={list ? 'page' : undefined}
      >
        <span className={styles.listIcon} aria-hidden="true">
          ≡
        </span>
        <span>목록</span>
      </Link>
    </nav>
  );
}
