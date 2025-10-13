import clsx from 'clsx';
import { ReactNode } from 'react';
import * as styles from './TabSection.css';

type Tab = {
  label: string;
  value: string;
};

type TabSectionProps = {
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  children: ReactNode;
};

export default function TabSection({
  tabs = [],
  activeTab = tabs[0]?.value,
  onTabChange,
  children,
}: TabSectionProps) {
  const handleTabClick = (value: string) => {
    if (value !== activeTab && onTabChange) {
      onTabChange(value);
    }
  };

  const activeTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
  const isFirstTab = activeTabIndex === 0;

  return (
    <section className={styles.container}>
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={clsx(
              styles.button,
              tab.value === activeTab ? styles.tabActive : styles.tabInactive
            )}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div
        className={clsx(
          styles.content,
          !isFirstTab && styles.contentAllRounded
        )}
      >
        {children}
      </div>
    </section>
  );
}
