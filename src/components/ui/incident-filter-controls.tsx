'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  readFilterSelection,
  writeFilterSelection,
} from '@/features/incidents/filter-selection';
import { FilterBar } from './filter-bar';
export function IncidentFilterControls() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <FilterBar
      value={readFilterSelection(new URLSearchParams(params.toString()))}
      onChange={(value) => {
        const query = writeFilterSelection(
          value,
          new URLSearchParams(params.toString()),
        ).toString();
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      }}
    />
  );
}
