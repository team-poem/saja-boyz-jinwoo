import { IncidentBadges } from '@/components/ui/incident-badges';
import { SearchHeader } from '@/components/ui/search-header';
import { FilterBarPreview } from './preview';
import styles from '@/components/ui/shared-ui.module.css';
export default function UiPreviewPage() {
  return (
    <div className={styles.previewGrid}>
      <h1>공용 UI 미리보기</h1>
      <p className={styles.previewLabel}>
        디자인 확인용 화면 · 실제 사건 데이터가 아닙니다.
      </p>
      <SearchHeader />
      <FilterBarPreview />
      <IncidentBadges category="society" status="ongoing" />
      <IncidentBadges category="security" status="closed" />
      <IncidentBadges category="politics" status="publicized" />
    </div>
  );
}
