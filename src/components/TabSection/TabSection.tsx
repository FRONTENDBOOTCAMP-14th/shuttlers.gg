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
  activeTab,
  onTabChange,
  children,
}: TabSectionProps) {
  // activeTab이 없을 경우 첫 번째 탭을 기본값으로 사용
  const currentActiveTab = activeTab ?? tabs[0]?.value;

  const handleTabClick = (value: string) => {
    if (value !== currentActiveTab && onTabChange) {
      onTabChange(value);
    }
  };

  const activeTabIndex = tabs.findIndex(
    (tab) => tab.value === currentActiveTab
  );
  const isFirstTab = activeTabIndex === 0;

  return (
    <section className={styles.container}>
      <nav className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={tab.value === currentActiveTab}
            className={clsx(
              styles.tabButton,
              tab.value === currentActiveTab
                ? styles.tabActive
                : styles.tabInactive
            )}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div
        className={clsx(
          styles.tabContent,
          !isFirstTab && styles.contentAllRounded
        )}
      >
        {children}
      </div>
    </section>
  );
}
