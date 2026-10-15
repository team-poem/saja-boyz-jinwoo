import type { LocatedArticle } from './map-article.types';

// Keep logical regions intact; only combine their display at coincident points.
export function groupMapDisplayPoints(groups: Map<string, LocatedArticle[]>) {
  const points = new Map<
    string,
    { items: LocatedArticle[]; regionCount: number }
  >();

  for (const group of groups.values()) {
    const { latitude, longitude } = group[0].location;
    const key = JSON.stringify([latitude, longitude]);
    const point = points.get(key) ?? { items: [], regionCount: 0 };
    const seen = new Set(point.items.map((item) => item.article_id));

    for (const item of group) {
      if (seen.has(item.article_id)) continue;
      seen.add(item.article_id);
      point.items.push(item);
    }

    point.regionCount += 1;
    points.set(key, point);
  }

  return points;
}
