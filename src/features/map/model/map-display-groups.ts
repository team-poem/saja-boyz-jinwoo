import type { LocatedArticle } from './map-article.types';

type DisplayGroup = {
  items: LocatedArticle[];
  regionCount: number;
  diameter: number;
};
type PixelPoint = { x: number; y: number };
type ProjectLocation = (location: LocatedArticle['location']) => PixelPoint;
type MapViewportSize = { width: number; height: number };

function sizeDisplayGroups(groups: DisplayGroup[]) {
  const counts = [...new Set(groups.map((group) => group.items.length))].sort(
    (left, right) => left - right,
  );

  if (!counts.length) return;

  if (counts.length === 1) {
    for (const group of groups) group.diameter = 48;

    return;
  }

  const minimum = 38.4;
  const maximum = 88;
  const span = maximum - minimum;
  const gap = Math.min(4, span / (counts.length - 1));
  const proportionalSpan = span - gap * (counts.length - 1);
  const logMinimum = Math.log(counts[0]);
  const logSpan = Math.log(counts[counts.length - 1]) - logMinimum;
  const sizes = new Map(
    counts.map((count, rank) => [
      count,
      minimum +
        rank * gap +
        proportionalSpan * ((Math.log(count) - logMinimum) / logSpan),
    ]),
  );

  for (const group of groups) group.diameter = sizes.get(group.items.length)!;
}

export function sameMapDisplayGroups(
  previous: Map<string, DisplayGroup>,
  next: Map<string, DisplayGroup>,
) {
  if (previous.size !== next.size) return false;

  return [...next].every(([key, group]) => {
    const before = previous.get(key);

    return (
      before?.regionCount === group.regionCount &&
      before.diameter === group.diameter &&
      before.items.length === group.items.length &&
      before.items.every((item, index) => item === group.items[index])
    );
  });
}

// 대표점은 옮기지 않는다. 카메라 안의 중심점만 상대 크기 집계에 포함한다.
export function groupMapDisplayPoints(
  groups: Map<string, LocatedArticle[]>,
  project?: ProjectLocation,
  viewport?: MapViewportSize,
) {
  const points = new Map<string, DisplayGroup>();

  for (const group of groups.values()) {
    const { latitude, longitude } = group[0].location;
    const key = JSON.stringify([latitude, longitude]);
    const point = points.get(key) ?? {
      items: [],
      regionCount: 0,
      diameter: 48,
    };
    const seen = new Set(point.items.map((item) => item.article_id));

    for (const item of group) {
      if (seen.has(item.article_id)) continue;
      seen.add(item.article_id);
      point.items.push(item);
    }

    point.regionCount += 1;
    points.set(key, point);
  }

  if (!project) {
    sizeDisplayGroups([...points.values()]);

    return points;
  }

  let displays = [...points]
    .map(([key, group]) => ({
      key,
      group,
      point: project(group.items[0].location),
    }))
    .filter(
      ({ point }) =>
        Number.isFinite(point.x) &&
        Number.isFinite(point.y) &&
        (!viewport ||
          (point.x >= 0 &&
            point.y >= 0 &&
            point.x <= viewport.width &&
            point.y <= viewport.height)),
    )
    .sort((left, right) =>
      left.key < right.key ? -1 : left.key > right.key ? 1 : 0,
    );

  // 각 단계의 연결요소를 함께 병합하고 새 분포로 다시 크기를 정한다.
  // 한 계산 안에서는 병합만 하므로 종료하며, 다음 카메라 갱신은 원본부터 시작한다.
  for (;;) {
    sizeDisplayGroups(displays.map(({ group }) => group));
    const visited = new Set<number>();
    const next: typeof displays = [];
    let merged = false;

    for (let index = 0; index < displays.length; index += 1) {
      if (visited.has(index)) continue;
      const component = [index];

      visited.add(index);

      for (let cursor = 0; cursor < component.length; cursor += 1) {
        const first = displays[component[cursor]];

        for (let other = 0; other < displays.length; other += 1) {
          if (visited.has(other)) continue;
          const second = displays[other];

          if (
            Math.hypot(
              first.point.x - second.point.x,
              first.point.y - second.point.y,
            ) >
            (first.group.diameter + second.group.diameter) / 2
          )
            continue;

          visited.add(other);
          component.push(other);
        }
      }

      const first = displays[index];
      const seen = new Set(first.group.items.map((item) => item.article_id));

      for (const other of component.sort((left, right) => left - right)) {
        if (other === index) continue;
        const second = displays[other];

        for (const item of second.group.items) {
          if (seen.has(item.article_id)) continue;
          seen.add(item.article_id);
          first.group.items.push(item);
        }

        first.group.regionCount += second.group.regionCount;
        merged = true;
      }

      next.push(first);
    }

    if (!merged) return new Map(displays.map(({ key, group }) => [key, group]));
    displays = next;
  }
}
