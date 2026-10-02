import Image from 'next/image';
import Link from 'next/link';
import { categoryLabels, statusLabels } from '../incidents/labels';
import type { Incident } from '../incidents/types';

type IncidentListProps =
  | { state: 'loading'; now: Date }
  | { state: 'ready'; incidents: readonly Incident[]; now: Date };

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
  if (props.state !== 'ready') return null;

  if (props.incidents.length === 0) {
    return (
      <div role="status">
        <p>조건에 맞는 사건이 없어요</p>
        <p>검색어나 필터를 바꿔보세요</p>
      </div>
    );
  }

  return (
    <div>
      {props.incidents.map((incident) => (
        <article key={incident.id}>
          <Link href={`/incidents/${encodeURIComponent(incident.id)}`}>
            <h2>{incident.title}</h2>
            <p>
              <span>{categoryLabels[incident.category]}</span>
              {' · '}
              <span>{statusLabels[incident.status]}</span>
            </p>
            <p>
              {incident.location.address}
              {' · '}
              <time dateTime={incident.occurredAt}>
                {formatRelativeTime(incident.occurredAt, props.now)}
              </time>
            </p>
            <p>{incident.summary}</p>
            {incident.imageUrl ? (
              <Image
                src={incident.imageUrl}
                alt=""
                width={80}
                height={80}
                unoptimized
              />
            ) : (
              <span>사진 없음</span>
            )}
          </Link>
        </article>
      ))}
    </div>
  );
}
