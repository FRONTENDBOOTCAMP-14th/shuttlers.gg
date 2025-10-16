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

  const handleTabClick = (value: string) => {
    if (value !== currentActiveTab && onTabChange) {
      onTabChange(value);
    }
  };

  // ✅ 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const { key } = event;
      let newIndex = -1;

      switch (key) {
        case 'ArrowRight':
          // ✅ 오른쪽 화살표: 다음 탭으로 이동
          event.preventDefault();
          newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
          break;

        case 'ArrowLeft':
          // ✅ 왼쪽 화살표: 이전 탭으로 이동
          event.preventDefault();
          newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
          break;

        case 'Home':
          // ✅ Home 키: 첫 번째 탭으로 이동
          event.preventDefault();
          newIndex = 0;
          break;

        case 'End':
          // ✅ End 키: 마지막 탭으로 이동
          event.preventDefault();
          newIndex = tabs.length - 1;
          break;

        case 'Enter':
        case ' ':
          // ✅ Enter/Space: 현재 탭 활성화
          event.preventDefault();
          handleTabClick(tabs[currentIndex].value);
          return;

        default:
          return;
      }

      // ✅ 새로운 탭에 포커스 이동
      if (newIndex !== -1 && tabRefs.current[newIndex]) {
        tabRefs.current[newIndex]?.focus();
        // ✅ 포커스 이동과 동시에 탭 활성화
        handleTabClick(tabs[newIndex].value);
      }
    },
    [tabs, handleTabClick]
  );

  // ✅ ref 설정 함수
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
              aria-controls={`tabpanel-${tab.value}`} // ✅ 연결된 패널 ID
              id={`tab-${tab.value}`} // ✅ 탭 고유 ID
              tabIndex={isActive ? 0 : -1} // ✅ 활성 탭만 Tab 키로 접근 가능
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
        role="tabpanel" // ✅ 탭 패널 역할
        aria-labelledby={`tab-${currentActiveTab}`} // ✅ 현재 활성 탭과 연결
        id={`tabpanel-${currentActiveTab}`} // ✅ 패널 고유 ID
        tabIndex={0} // ✅ 컨텐츠 영역도 포커스 가능
      >
        {children}
      </div>
    </section>
  );
}
