'use client';

import * as styles from '@/components/MyPageTab/MyPageTab.css';
import { useCallback, useId } from 'react';

type Tab = { value: string; label: string };
type Props = {
  tabs: Tab[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  panelClassName?: string;
  children?: React.ReactNode;
};

export default function MyPageTabs({
  tabs,
  value,
  onChange,
  className,
  panelClassName,
  children,
}: Props) {
  const listId = useId();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIdx = tabs.findIndex((t) => t.value === value);
      if (currentIdx < 0) return;

      const move = (idx: number) => onChange(tabs[idx].value);

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          move((currentIdx + 1) % tabs.length);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          move((currentIdx - 1 + tabs.length) % tabs.length);
          break;
        case 'Home':
          e.preventDefault();
          move(0);
          break;
        case 'End':
          e.preventDefault();
          move(tabs.length - 1);
          break;
      }
    },
    [tabs, value, onChange]
  );

  return (
    <div className={className}>
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="마이페이지 탭"
        id={listId}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((t) => {
          const selected = t.value === value;
          return (
            <button
              key={t.value}
              role="tab"
              aria-selected={selected}
              aria-controls={`${listId}-${t.value}-panel`}
              id={`${listId}-${t.value}-tab`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab({ selected })}
              onClick={() => onChange(t.value)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${listId}-${value}-panel`}
        aria-labelledby={`${listId}-${value}-tab`}
      >
        {children}
      </div>
    </div>
  );
}
