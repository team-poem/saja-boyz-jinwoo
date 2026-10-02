import type { Incident } from '../incidents/types';

type IncidentListProps =
  | { state: 'loading'; now: Date }
  | { state: 'ready'; incidents: readonly Incident[]; now: Date };

export function IncidentList(_props: IncidentListProps) {
  return null;
}
