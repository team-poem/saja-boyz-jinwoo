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
  const iso = input.match(/^([+-]\d{6}|\d{4})-(\d{1,2})-(\d{1,2})(?:$|[Tt\s])/);
  const rfc = input.match(
    /^(?:[a-z]{3},?\s+)?(\d{1,2})\s+([a-z]{3})\s+(\d{4})(?:\s|$)/i,
  );
  const calendar = iso
    ? [Number(iso[1]), Number(iso[2]), Number(iso[3])]
    : rfc
      ? [
          Number(rfc[3]),
          'jan feb mar apr may jun jul aug sep oct nov dec'
            .split(' ')
            .indexOf(rfc[2].toLowerCase()) + 1,
          Number(rfc[1]),
        ]
      : null;

  if (calendar) {
    const [year, month, day] = calendar;
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > (days[month - 1] ?? 0)) return new Date(NaN);
  }

  return new Date(value);
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
