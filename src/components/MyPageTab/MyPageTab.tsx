'use client';

import * as styles from '@/components/MyPageTab/MyPageTab.css';

type Tab = { value: string; label: string };
type Props = {
  tabs: Tab[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  children?: React.ReactNode;
};

export default function MyPageTabs({
  tabs,
  value,
  onChange,
  className,
  children,
}: Props) {
  return (
    <div className={className}>
      <div role="tablist" aria-label="마이페이지 탭">
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
