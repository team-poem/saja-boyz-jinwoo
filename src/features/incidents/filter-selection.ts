import type {
  IncidentCategory,
  IncidentFilters,
  IncidentStatus,
} from './types';
export type IncidentPeriod = '1w' | '1m' | '3m';
export interface IncidentFilterSelection {
  query?: string;
  category?: IncidentCategory;
  status?: IncidentStatus;
  period?: IncidentPeriod;
}
const categories: readonly string[] = [
  'society',
  'security',
  'politics',
  'international',
];
const statuses: readonly string[] = ['ongoing', 'publicized', 'closed'];
const periods: readonly string[] = ['1w', '1m', '3m'];
export function readFilterSelection(
  params: URLSearchParams,
): IncidentFilterSelection {
  const category = params.get('category');
  const status = params.get('status');
  const period = params.get('period');
  return {
    query: params.get('q')?.trim() || undefined,
    category:
      category && categories.includes(category)
        ? (category as IncidentCategory)
        : undefined,
    status:
      status && statuses.includes(status)
        ? (status as IncidentStatus)
        : undefined,
    period:
      period && periods.includes(period)
        ? (period as IncidentPeriod)
        : undefined,
  };
}
export function writeFilterSelection(
  selection: IncidentFilterSelection,
  existing = new URLSearchParams(),
): URLSearchParams {
  const params = new URLSearchParams(existing);
  for (const [key, value] of Object.entries({
    q: selection.query?.trim(),
    category: selection.category,
    status: selection.status,
    period: selection.period,
  })) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  return params;
}
export function toIncidentFilters(
  selection: IncidentFilterSelection,
  now = new Date(),
): IncidentFilters {
  const days = selection.period
    ? { '1w': 7, '1m': 30, '3m': 90 }[selection.period]
    : undefined;
  return {
    query: selection.query,
    category: selection.category,
    status: selection.status,
    since: days
      ? new Date(now.getTime() - days * 86_400_000).toISOString()
      : undefined,
  };
}
