'use client';

import Input from '@/components/Input/Input';
import { UserResultCard, UserResultCardProps } from '@/components/UserResultCard/UserResultCard';
import { useEffect, useRef, useState } from 'react';
import * as styles from './LandingSearch.css';

type User = {
  id: string;
  name: string;
  grade: UserResultCardProps['grade'];
  gender: NonNullable<UserResultCardProps['gender']>;
};

const mockUsers: User[] = [
  { id: '1', name: '김배드민턴', grade: { local: 'A급', national: 'B급' }, gender: 'male' },
  { id: '2', name: '이셔틀콕', grade: { local: 'B급', national: 'C급' }, gender: 'female' },
  { id: '3', name: '박스매시김배드', grade: { national: 'A급' }, gender: 'male' },
  { id: '4', name: '최네트샷', grade: { local: 'C급', national: 'D급' }, gender: 'female' },
  { id: '5', name: '정클리어', grade: { national: 'B급' }, gender: 'male' },
];

type LandingSearchProps = {
  onUserSelect?: (user: User) => void;
  placeholder?: string;
};

export default function LandingSearch({
  onUserSelect,
  placeholder = "누구의 전적이 궁금하신가요?"
}: LandingSearchProps) {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchHistory, setSearchHistory] = useState<User[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputWrapperRef.current) {
      const searchBtn = inputWrapperRef.current.querySelector('button[type="button"]');
      if (searchBtn instanceof HTMLElement) {
        searchBtn.setAttribute('tabindex', '-1');
        searchBtn.setAttribute('aria-hidden', 'true');
        searchBtn.style.pointerEvents = 'none';
        searchBtn.style.cursor = 'default';
        searchBtn.onmouseenter = e => e.preventDefault();
        searchBtn.onmouseover = e => e.preventDefault();
        const icon = searchBtn.querySelector('svg');
        if (icon instanceof SVGElement) {
          icon.setAttribute('tabindex', '-1');
          icon.setAttribute('aria-hidden', 'true');
          icon.style.pointerEvents = 'none';
          icon.style.cursor = 'default';
        }
      }
    }
  }, []);

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

  useEffect(() => {
    if (searchKeyword.trim() === '') {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

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

    setSearchResults(filteredResults);
    setSelectedIndex(-1);
  }, [searchKeyword]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = document.querySelector(`.${styles.container}`);
      if (container && !container.contains(event.target as Node)) {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  useEffect(() => {
  const cards = document.querySelectorAll('[data-search-item]');
  cards.forEach(card => {
    card.querySelectorAll('button, [href], input, select, textarea, [tabindex]')
      .forEach(el => el.setAttribute('tabindex', '-1'));
  });
}, [searchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setSelectedIndex(-1);
  };

  const handleUserClick = (user: User) => {
    saveToHistory(user);
    setSearchKeyword('');
    setSearchResults([]);
    setSelectedIndex(-1);
    setIsFocused(false);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleInputWrapperFocus = () => {
    setIsFocused(true);
  };

  const handleInputWrapperBlur = (e: React.FocusEvent) => {
    if (searchResultsRef.current && searchResultsRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    setTimeout(() => {
      setIsFocused(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const currentResults = searchKeyword.trim() ? searchResults : searchHistory;
  const shouldShowResults = isFocused && (
    (searchKeyword.trim() && searchResults.length > 0) ||
    (!searchKeyword.trim() && searchHistory.length > 0)
  );

  return (
    <div className={styles.container}>
      <div
        ref={inputWrapperRef}
        className={styles.inputWrapper}
        onFocus={handleInputWrapperFocus}
        onBlur={handleInputWrapperBlur}
      >
        <Input
          type="search"
          placeholder={placeholder}
          value={searchKeyword}
          onChange={handleInputChange}
          onSearchClick={undefined}
        />
      </div>

      {shouldShowResults && (
        <div
          ref={searchResultsRef}
          className={styles.resultsContainer}
          role="listbox"
          aria-label={searchKeyword.trim() ? "검색 결과" : "최근 검색한 사용자"}
          onMouseLeave={() => setSelectedIndex(-1)}
          onMouseDown={e => e.preventDefault()}
          tabIndex={0}
        >
          {currentResults.map((user, index) => (
            <div
              key={`${searchKeyword.trim() ? 'search' : 'history'}-${user.id}`}
              className={`${styles.resultItem} ${index === selectedIndex ? styles.selected : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              role="option"
              aria-selected={index === selectedIndex}
              data-search-item
              tabIndex={0 }
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
        </div>
      )}
    </div>
  );
}