'use client';
import { useState } from 'react';
import { FilterBar } from '@/components/ui/filter-bar';
import type { IncidentFilterSelection } from '@/features/incidents/filter-selection';
export function FilterBarPreview() {
  const [value, setValue] = useState<IncidentFilterSelection>({});
  return <FilterBar value={value} onChange={setValue} />;
}
