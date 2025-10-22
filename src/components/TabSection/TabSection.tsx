'use client'

import clsx from 'clsx';
import { ReactNode, useCallback, useRef } from 'react';
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
  const currentActiveTab = activeTab ?? tabs[0]?.value;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = useCallback((value: string) => {
    if (value !== currentActiveTab && onTabChange) {
      onTabChange(value);
    }
  }, [currentActiveTab, onTabChange]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const { key } = event;
      let newIndex = -1;

      switch (key) {
        case 'ArrowRight':
          event.preventDefault();
          newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
          break;
 
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
          break;

        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;

        case 'End':
          event.preventDefault();
          newIndex = tabs.length - 1;
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          handleTabClick(tabs[currentIndex].value);
          return;

        default:
          return;
      }

      if (newIndex !== -1 && tabRefs.current[newIndex]) {
        tabRefs.current[newIndex]?.focus();
        handleTabClick(tabs[newIndex].value);
      }
    },
    [tabs, handleTabClick]
  );

  const setTabRef = useCallback(
    (element: HTMLButtonElement | null, index: number) => {
      tabRefs.current[index] = element;
    },
    []
  );

  const activeTabIndex = tabs.findIndex(
    (tab) => tab.value === currentActiveTab
  );
  const isFirstTab = activeTabIndex === 0;

  return (
    <section className={styles.container}>
      <nav className={styles.tabs} role="tablist" aria-label="탭 목록">
        {tabs.map((tab, index) => {
          const isActive = tab.value === currentActiveTab;
          return (
            <button
              key={tab.value}
              ref={(el) => setTabRef(el, index)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.value}`} 
              id={`tab-${tab.value}`}
              tabIndex={isActive ? 0 : -1} 
              className={clsx(
                styles.tabButton,
                isActive ? styles.tabActive : styles.tabInactive
              )}
              onClick={() => handleTabClick(tab.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
      <div
        className={clsx(
          styles.tabContent,
          !isFirstTab && styles.contentAllRounded
        )}
        role="tabpanel" 
        aria-labelledby={`tab-${currentActiveTab}`}
        id={`tabpanel-${currentActiveTab}`} 
        tabIndex={0} 
      >
        {children}
      </div>
    </section>
  );
}