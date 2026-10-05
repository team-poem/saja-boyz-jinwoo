import { IncidentList } from '@/features/incident-list/incident-list';

export default function IncidentsLoading() {
  return <IncidentList state="loading" now={new Date()} />;
}
