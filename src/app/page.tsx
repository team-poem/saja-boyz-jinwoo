import { FoundationPanel } from '@/components/layout/foundation-panel/foundation-panel';
import { MapSetupNotice } from '@/features/map/ui/map-home/map-setup-notice';
export default function HomePage() {
  if (!process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID?.trim()) {
    return <MapSetupNotice />;
  }

  return (
    <FoundationPanel
      title="우리 주변의 사건을 한눈에"
      description="지도, 위치별 사건과 필터를 연결할 홈 화면입니다. 현재는 코드베이스 준비 단계이며 실제 사건 데이터는 연결되지 않았습니다."
    />
  );
}
