import Image from 'next/image';
import Link from 'next/link';
import { categoryLabels, statusLabels } from '../incidents/labels';
import type { Incident } from '../incidents/types';
import styles from './incident-list.module.css';

type IncidentListProps =
  | { state: 'loading'; now: Date }
  | { state: 'ready'; incidents: readonly Incident[]; now: Date };

function getIncidentHref(id: string): string | null {
  if (id === '' || id === '.' || id === '..') return null;

  try {
    return `/incidents/${encodeURIComponent(id)}`;
  } catch (error) {
    if (error instanceof URIError) return null;
    throw error;
  }
}

function formatRelativeTime(occurredAt: string, now: Date) {
  const minutes = Math.floor(
    (now.getTime() - new Date(occurredAt).getTime()) / 60_000,
  );

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export function IncidentList(props: IncidentListProps) {
  if (props.state === 'loading') {
    return (
      <div className={styles.list}>
        <div className={styles.message} role="status" aria-busy="true">
          <p className={styles.messageTitle}>사건을 불러오는 중</p>
        </div>
      </div>
    );
  }

  if (props.incidents.length === 0) {
    return (
      <div className={styles.list}>
        <div className={styles.message} role="status">
          <p className={styles.messageTitle}>조건에 맞는 사건이 없어요</p>
          <p className={styles.messageHint}>검색어나 필터를 바꿔보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {props.incidents.map((incident) => {
        const href = getIncidentHref(incident.id);
        const content = (
          <>
            {incident.imageUrl ? (
              <Image
                className={styles.thumbnail}
                src={incident.imageUrl}
                alt=""
                width={80}
                height={80}
                unoptimized
              />
            ) : (
              <span className={styles.placeholder}>사진 없음</span>
            )}
            <div className={styles.content}>
              <div className={styles.badges}>
                <span
                  className={styles.badge}
                  data-category={incident.category}
                >
                  {categoryLabels[incident.category]}
                </span>
                <span className={styles.badge} data-status={incident.status}>
                  {statusLabels[incident.status]}
                </span>
              </div>
              <h2 className={styles.title}>{incident.title}</h2>
              <p className={styles.metadata}>
                <span aria-hidden="true">📍</span>
                <span className={styles.address}>
                  {incident.location.address}
                </span>
                <span aria-hidden="true">·</span>
                <time className={styles.time} dateTime={incident.occurredAt}>
                  {formatRelativeTime(incident.occurredAt, props.now)}
                </time>
              </p>
              <p className={styles.summary}>{incident.summary}</p>
              {href === null && (
                <p className={styles.messageHint}>상세 정보 없음</p>
              )}
            </div>
          </>
        );

        return (
          <article className={styles.item} key={incident.id}>
            {href === null ? (
              <div className={styles.card}>{content}</div>
            ) : (
              <Link className={styles.card} href={href}>
                {content}
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
