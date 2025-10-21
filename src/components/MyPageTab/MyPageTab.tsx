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
        {tabs.map((tab) => {
          const selected = tab.value === value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={styles.tab({ selected })}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}
