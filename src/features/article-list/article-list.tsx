import Image from 'next/image';
import styles from './article-list.module.css';

export type ArticleCollectionItem = {
  article_id: string;
  image_status: string;
  image_url: string | null;
  article: {
    title: string;
    description: string;
    originallink: string;
    link: string;
    pubDate: string;
  };
};

const namedEntities: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: '\u00a0',
};

function articleText(value: string) {
  return value
    .replace(
      /<!--[\s\S]*?-->|<\/?[a-z][a-z0-9:-]*(?=[\s/>])(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi,
      '',
    )
    .replace(
      /&(amp|quot|apos|lt|gt|nbsp|#\d+|#x[\da-f]+);/gi,
      (entity, code: string) => {
        if (!code.startsWith('#')) return namedEntities[code.toLowerCase()];

        const hex = code[1].toLowerCase() === 'x';
        const point = Number.parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
        if (point > 0x10ffff || (point >= 0xd800 && point <= 0xdfff)) {
          return entity;
        }
        return String.fromCodePoint(point);
      },
    );
}

function safeSourceUrl(value: string) {
  try {
    const url = new URL(value);
    if (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      !url.username &&
      !url.password
    ) {
      return url.href;
    }
  } catch {
    return null;
  }
  return null;
}

const publicationFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function publicationDate(value: string) {
  const input = value.trim();
  const iso = input.match(
    /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:[Tt ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|[+-]\d{2}:?\d{2}))?$/i,
  );
  const rfc = input.match(
    /^(?:(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+)?(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?\s+(UT|UTC|GMT|[+-]\d{2}:?\d{2})$/i,
  );
  if (!iso && !rfc) return new Date(NaN);

  const parts = iso ?? rfc!;
  const year = Number(parts[iso ? 1 : 3]);
  const month = iso
    ? Number(parts[2])
    : 'jan feb mar apr may jun jul aug sep oct nov dec'
        .split(' ')
        .indexOf(parts[2].toLowerCase()) + 1;
  const day = Number(parts[iso ? 3 : 1]);
  const hour = Number(parts[4] ?? 0);
  const minute = Number(parts[5] ?? 0);
  const second = Number(parts[6] ?? 0);
  const fraction = iso ? (parts[7] ?? '') : '';
  const millisecond = Number(fraction.padEnd(3, '0').slice(0, 3));
  const zone = (parts[iso ? 8 : 7] ?? 'Z').replace(':', '');
  const offsetHour = /^[+-]/.test(zone) ? Number(zone.slice(1, 3)) : 0;
  const offsetMinute = /^[+-]/.test(zone) ? Number(zone.slice(3, 5)) : 0;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    day < 1 ||
    day > (days[month - 1] ?? 0) ||
    hour > (iso ? 24 : 23) ||
    minute > 59 ||
    second > 59 ||
    offsetHour > 23 ||
    offsetMinute > 59 ||
    (hour === 24 && (minute !== 0 || second !== 0 || /[1-9]/.test(fraction)))
  ) {
    return new Date(NaN);
  }

  // Do not let Date.parse reinterpret invalid offsets or trailing text.
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(hour, minute, second, millisecond);
  if (rfc) {
    const weekday = 'sun mon tue wed thu fri sat'
      .split(' ')
      .indexOf(input.slice(0, 3).toLowerCase());
    if (weekday >= 0 && date.getUTCDay() !== weekday) return new Date(NaN);
  }
  const offset = (offsetHour * 60 + offsetMinute) * (zone[0] === '-' ? -1 : 1);
  return new Date(date.getTime() - offset * 60_000);
}

function publicationText(date: Date) {
  const parts = Object.fromEntries(
    publicationFormatter
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} KST`;
}

export function ArticleList({
  items,
  apiOrigin,
}: {
  items: readonly ArticleCollectionItem[];
  apiOrigin: string;
}) {
  const seen = new Set<string>();
  const articles = items.filter(({ article_id }) => {
    if (seen.has(article_id)) return false;
    seen.add(article_id);
    return true;
  });

  return (
    <div className={styles.list}>
      {articles.length === 0 && <p role="status">아직 수집된 기사가 없어요</p>}
      {articles.map(({ article_id, article, image_status, image_url }) => {
        const publishedAt = publicationDate(article.pubDate);
        const sourceUrl =
          safeSourceUrl(article.originallink) ?? safeSourceUrl(article.link);
        const imageUrl =
          image_status === 'ready' &&
          /^[a-f0-9]{64}$/.test(article_id) &&
          image_url === `/images/${article_id}.jpg`
            ? new URL(image_url, apiOrigin).href
            : null;

        return (
          <article className={styles.card} key={article_id}>
            {imageUrl ? (
              <figure className={styles.image}>
                <Image
                  className={styles.thumbnail}
                  src={imageUrl}
                  alt=""
                  width={80}
                  height={80}
                  unoptimized
                />
                <figcaption>AI 생성 이미지</figcaption>
              </figure>
            ) : (
              <span className={styles.placeholder}>이미지 없음</span>
            )}
            <h2 className={styles.title}>{articleText(article.title)}</h2>
            <p className={styles.summary}>{articleText(article.description)}</p>
            <p className={styles.publication}>
              {Number.isNaN(publishedAt.getTime()) ? (
                '발행 시각 미확인'
              ) : (
                <>
                  기사 발행{' '}
                  <time dateTime={publishedAt.toISOString()}>
                    {publicationText(publishedAt)}
                  </time>
                </>
              )}
            </p>
            {sourceUrl ? (
              <a className={styles.source} href={sourceUrl}>
                기사 원문
              </a>
            ) : (
              <span className={styles.source}>원문 링크 없음</span>
            )}
          </article>
        );
      })}
    </div>
  );
}
