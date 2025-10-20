'use client';

import Input from '@/components/Input/Input';
import { UserResultCard } from '@/components/UserResultCard/UserResultCard';
import { useEffect, useRef, useState } from 'react';
import * as styles from './LandingSearch.css';

// Mock 데이터 - 실제 API 연동 시 대체
const mockUsers = [
  {
    id: '1',
    name: '김배드민턴',
    grade: { local: 'A급', national: '' },
    gender: 'male' as const,
  },
  {
    id: '2',
    name: '이셔김배드민턴틀콕',
    grade: { local: 'B급', national: 'C급' },
    gender: 'female' as const,
  },
  {
    id: '3',
    name: '김배드민턴',
    grade: { local: '미정', national: 'A급' },
    gender: 'male' as const,
  },
  {
    id: '4',
    name: '최네트샷김배드민턴',
    grade: { local: 'C급', national: 'D급' },
    gender: 'female' as const,
  },
  {
    id: '5',
    name: '정클리어',
    grade: { local: 'B급', national: 'B급' },
    gender: 'male' as const,
  },
];

type User = {
  id: string;
  name: string;
  grade: { local: string; national: string };
  gender: 'male' | 'female';
};

type LandingSearchProps = {
  onUserSelect?: (user: User) => void;
  placeholder?: string;
};

export default function LandingSearch({
  onUserSelect,
  placeholder = "사용자 이름을 입력하세요"
}: LandingSearchProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchHistory, setSearchHistory] = useState<User[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // localStorage에서 검색 이력 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem('user-search-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setSearchHistory(parsedHistory);
      } catch (error) {
        console.error('검색 이력 로드 오류:', error);
      }
    }
  }, []);

  // ✅ 검색어 변경 시 자동 검색 실행
  useEffect(() => {
    console.log('검색어 변경:', searchKeyword); // 디버깅용
    
    if (searchKeyword.trim() === '') {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    // 자동 검색 실행
    const filteredResults = mockUsers
      .filter(user => 
        user.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      .sort((a, b) => {
        const searchTerm = searchKeyword.toLowerCase();
        const aStarts = a.name.toLowerCase().startsWith(searchTerm);
        const bStarts = b.name.toLowerCase().startsWith(searchTerm);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });

    console.log('검색 결과:', filteredResults); // 디버깅용
    setSearchResults(filteredResults);
    setSelectedIndex(-1);
  }, [searchKeyword]); // ✅ searchKeyword 의존성 추가

  // 선택된 항목 스크롤 조정
  useEffect(() => {
    if (selectedIndex >= 0 && searchResultsRef.current) {
      const items = searchResultsRef.current.querySelectorAll('[data-search-item]');
      const selectedItem = items[selectedIndex] as HTMLElement;
      
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  // 검색 이력 저장
  const saveToHistory = (user: User) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.id !== user.id);
      const updated = [user, ...filtered].slice(0, 10);
      
      try {
        localStorage.setItem('user-search-history', JSON.stringify(updated));
      } catch (error) {
        console.error('검색 이력 저장 오류:', error);
      }
      
      return updated;
    });
  };

  // 검색 이력에서 삭제
  const removeFromHistory = (userId: string) => {
    setSearchHistory(prev => {
      const updated = prev.filter(item => item.id !== userId);
      
      try {
        localStorage.setItem('user-search-history', JSON.stringify(updated));
      } catch (error) {
        console.error('검색 이력 삭제 오류:', error);
      }
      
      return updated;
    });
  };

  // ✅ 입력 변경 핸들러 - 단순화
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    console.log('입력 변경:', keyword); // 디버깅용
    setSearchKeyword(keyword);
    // useEffect에서 자동 검색이 실행됨
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentResults = searchKeyword.trim() ? searchResults : searchHistory;
    
    if (currentResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < currentResults.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : currentResults.length - 1
        );
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
          handleUserClick(currentResults[selectedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setSelectedIndex(-1);
        setIsFocused(false);
        break;
    }
  };

  // 사용자 선택 핸들러
  const handleUserClick = (user: User) => {
    console.log('사용자 클릭:', user); // 디버깅용
    saveToHistory(user);
    setSearchKeyword('');
    setSearchResults([]);
    setSelectedIndex(-1);
    setIsFocused(false);
    
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  // 마우스 호버 핸들러
  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  // 포커스 핸들러 - Input 컴포넌트에 있는 onFocus/onBlur 사용 불가 시 대체
  const handleFocus = () => {
    console.log('포커스 ON'); // 디버깅용
    setIsFocused(true);
  };

  const handleBlur = () => {
    console.log('포커스 OFF'); // 디버깅용
    // 약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록 함
    setTimeout(() => {
      setIsFocused(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // ✅ 표시할 결과 결정
  const currentResults = searchKeyword.trim() ? searchResults : searchHistory;
  const shouldShowResults = isFocused && (
    (searchKeyword.trim() && searchResults.length > 0) || // 검색 결과가 있거나
    (!searchKeyword.trim() && searchHistory.length > 0)   // 검색 이력이 있을 때
  );

  console.log('현재 상태:', { 
    searchKeyword, 
    searchResults: searchResults.length, 
    searchHistory: searchHistory.length,
    isFocused, 
    shouldShowResults 
  }); // 디버깅용

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Input
          type="search"
          placeholder={placeholder}
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          // ✅ Input 컴포넌트에 onFocus/onBlur가 없다면 div로 감싸서 처리
          onSearchClick={undefined}
        />
      </div>

      {/* ✅ 포커스 상태와 관계없이 검색 결과 표시 (테스트용) */}
      {(
        (searchKeyword.trim() && searchResults.length > 0) || 
        (!searchKeyword.trim() && searchHistory.length > 0)
      ) && (
        <div
          ref={searchResultsRef}
          className={styles.resultsContainer}
          role="listbox"
          aria-label={searchKeyword.trim() ? "검색 결과" : "최근 검색한 사용자"}
          onMouseLeave={() => setSelectedIndex(-1)}
        >
          {!searchKeyword.trim() && searchHistory.length > 0 && (
            <div className={styles.historyHeader}>
              <span>최근 검색한 사용자</span>
              <button
                onClick={() => {
                  setSearchHistory([]);
                  localStorage.removeItem('user-search-history');
                }}
                className={styles.clearButton}
              >
                전체 삭제
              </button>
            </div>
          )}

          {currentResults.map((user, index) => (
            <div
              key={`${searchKeyword.trim() ? 'search' : 'history'}-${user.id}`}
              className={`${styles.resultItem} ${
                index === selectedIndex ? styles.selected : ''
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              role="option"
              aria-selected={index === selectedIndex}
              data-search-item
            >
              <UserResultCard
                id={user.id}
                name={user.name}
                grade={user.grade}
                gender={user.gender}
                variant={searchKeyword.trim() ? "result" : "history"}
                onClick={() => handleUserClick(user)}
                onRemove={!searchKeyword.trim() ? () => removeFromHistory(user.id) : undefined}
                searchQuery={searchKeyword}
              />
            </div>
          ))}

          {searchKeyword.trim() && searchResults.length === 0 && (
            <div className={styles.noResults}>
              <div>'{searchKeyword}'과 일치하는 사용자가 없습니다.</div>
              <div className={styles.noResultsSubtext}>
                정확한 이름을 입력해주세요.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}