'use client';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { categoryLabels, statusLabels } from '@/features/incidents/labels';
import type { IncidentFilterSelection } from '@/features/incidents/filter-selection';
import styles from './shared-ui.module.css';
type FilterKey = 'period' | 'category' | 'status';
const groups: {
  key: FilterKey;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: 'period',
    label: '기간',
    options: [
      { value: '', label: '전체 기간' },
      { value: '1w', label: '최근 1주' },
      { value: '1m', label: '최근 1개월' },
      { value: '3m', label: '최근 3개월' },
    ],
  },
  {
    key: 'category',
    label: '카테고리',
    options: [
      { value: '', label: '전체' },
      ...Object.entries(categoryLabels).map(([value, label]) => ({
        value,
        label,
      })),
    ],
  },
  {
    key: 'status',
    label: '상태',
    options: [
      { value: '', label: '전체' },
      ...Object.entries(statusLabels).map(([value, label]) => ({
        value,
        label,
      })),
    ],
  },
];
export function FilterBar({
  value,
  onChange,
}: {
  value: IncidentFilterSelection;
  onChange: (value: IncidentFilterSelection) => void;
}) {
  const [open, setOpen] = useState<FilterKey | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<Partial<Record<FilterKey, HTMLButtonElement | null>>>(
    {},
  );
  const id = useId();
  const hasFilters = Boolean(value.period || value.category || value.status);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  const close = (focus = false) => {
    if (focus && open) buttons.current[open]?.focus();
    setOpen(null);
  };
  return (
    <div
      className={styles.filterBar}
      ref={root}
      aria-label="사건 필터"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          close(true);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        type="button"
        className={`${styles.filterChip} ${hasFilters ? styles.selectedChip : ''}`}
        aria-label="조건 필터 초기화"
        disabled={!hasFilters}
        onClick={() => {
          onChange({ query: value.query });
          close();
        }}
      >
        <Image src="/figma/shared/filter.svg" alt="" width={18} height={18} />
      </button>
      {groups.map((group) => {
        const selected = value[group.key];
        const expanded = open === group.key;
        const label = selected
          ? group.options.find((option) => option.value === selected)?.label
          : group.label;
        return (
          <div className={styles.filterGroup} key={group.key}>
            <button
              type="button"
              className={`${styles.filterChip} ${selected ? styles.selectedChip : ''}`}
              ref={(element) => {
                buttons.current[group.key] = element;
              }}
              aria-label={`${group.label}: ${label}`}
              aria-expanded={expanded}
              aria-controls={`${id}-${group.key}`}
              onClick={() => setOpen(expanded ? null : group.key)}
            >
              {label}
              <span className={styles.chevron} aria-hidden="true">
                ▼
              </span>
            </button>
            {expanded && (
              <fieldset
                className={styles.filterDropdown}
                id={`${id}-${group.key}`}
              >
                <legend className={styles.srOnly}>{group.label} 선택</legend>
                {group.options.map((option, index) => (
                  <label
                    key={option.value}
                    className={`${styles.filterOption} ${(selected || '') === option.value ? styles.chosenOption : ''}`}
                  >
                    <input
                      type="radio"
                      name={`${id}-${group.key}`}
                      value={option.value}
                      checked={(selected || '') === option.value}
                      autoFocus={index === 0}
                      onClick={() => {
                        if ((selected || '') === option.value) close(true);
                      }}
                      onChange={() => {
                        onChange({
                          ...value,
                          [group.key]: option.value || undefined,
                        });
                        close(true);
                      }}
                    />
                    <span className={styles.optionDot} aria-hidden="true" />
                    <span>{option.label}</span>
                    <span className={styles.optionCheck} aria-hidden="true">
                      {(selected || '') === option.value ? '✓' : ''}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
          </div>
        );
      })}
    </div>
  );
}
