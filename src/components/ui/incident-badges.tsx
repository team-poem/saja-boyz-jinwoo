import { categoryLabels, statusLabels } from '@/features/incidents/labels';
import type {
  IncidentCategory,
  IncidentStatus,
} from '@/features/incidents/types';
import styles from './shared-ui.module.css';
export function IncidentBadges({
  category,
  status,
}: {
  category: IncidentCategory;
  status: IncidentStatus;
}) {
  return (
    <span className={styles.badges}>
      <span className={styles.categoryBadge}>{categoryLabels[category]}</span>
      <span className={`${styles.statusBadge} ${styles[status]}`}>
        {statusLabels[status]}
      </span>
    </span>
  );
}
