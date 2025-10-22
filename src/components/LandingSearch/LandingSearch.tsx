'use client';

import Input from '@/components/Input/Input';
import {
  UserResultCard,
  UserResultCardProps,
} from '@/components/UserResultCard/UserResultCard';
import { useEffect, useRef, useState } from 'react';
import * as styles from './LandingSearch.css';

export type Player = {
  id: string;
  name: string;
  grade: UserResultCardProps['grade'];
  gender: NonNullable<UserResultCardProps['gender']>;
};

type LandingSearchProps = {
  onUserSelect?: (player: Player) => void;
  placeholder?: string;
};

export default function LandingSearch({
  onUserSelect,
  placeholder = '누구의 전적이 궁금하신가요?',
}: LandingSearchProps) {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [searchHistory, setSearchHistory] = useState<Player[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputWrapperRef.current) {
      const searchBtn = inputWrapperRef.current.querySelector(
        'button[type="button"]'
      );
      if (searchBtn instanceof HTMLElement) {
        searchBtn.setAttribute('tabindex', '-1');
        searchBtn.setAttribute('aria-hidden', 'true');
        searchBtn.style.pointerEvents = 'none';
        searchBtn.style.cursor = 'default';
        searchBtn.onmouseenter = (e) => e.preventDefault();
        searchBtn.onmouseover = (e) => e.preventDefault();
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
    const savedHistory = localStorage.getItem('player-search-history');
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
    setSearchResults([]);
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

  const saveToHistory = (player: Player) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== player.id);
      const updated = [player, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('player-search-history', JSON.stringify(updated));
      } catch (error) {
        console.error('검색 이력 저장 오류:', error);
      }
      return updated;
    });
  };

  const removeFromHistory = (playerId: string) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((item) => item.id !== playerId);
      try {
        localStorage.setItem('player-search-history', JSON.stringify(updated));
      } catch (error) {
        console.error('검색 이력 삭제 오류:', error);
      }
      return updated;
    });
  };

  useEffect(() => {
    const cards = document.querySelectorAll('[data-search-item]');
    cards.forEach((card) => {
      card
        .querySelectorAll('button, [href], input, select, textarea, [tabindex]')
        .forEach((el) => el.setAttribute('tabindex', '-1'));
    });
  }, [searchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setSelectedIndex(-1);
  };

  const handlePlayerClick = (player: Player) => {
    saveToHistory(player);
    setSearchKeyword('');
    setSearchResults([]);
    setSelectedIndex(-1);
    setIsFocused(false);
    if (onUserSelect) {
      onUserSelect(player);
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleInputWrapperFocus = () => {
    setIsFocused(true);
  };

  const handleInputWrapperBlur = () => {
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  const currentResults = searchKeyword.trim() ? searchResults : searchHistory;
  const shouldShowResults =
    isFocused &&
    ((searchKeyword.trim() && searchResults.length > 0) ||
      (!searchKeyword.trim() && searchHistory.length > 0));

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldShowResults || currentResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < currentResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : currentResults.length - 1
      );
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
        handlePlayerClick(currentResults[selectedIndex]);
      }
    }
  };

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
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
      </div>

      {shouldShowResults && (
        <div
          ref={searchResultsRef}
          className={styles.resultsContainer}
          role="listbox"
          aria-label={searchKeyword.trim() ? '검색 결과' : '최근 검색한 선수'}
          onMouseLeave={() => setSelectedIndex(-1)}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={0}
        >
          {currentResults.map((player, index) => (
            <div
              key={`${searchKeyword.trim() ? 'search' : 'history'}-${player.id}`}
              className={`${styles.resultItem} ${index === selectedIndex ? styles.selected : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              role="option"
              aria-selected={index === selectedIndex}
              data-search-item
              tabIndex={-1}
              onClick={() => handlePlayerClick(player)}
            >
              <UserResultCard
                id={player.id}
                name={player.name}
                grade={player.grade}
                gender={player.gender}
                variant={searchKeyword.trim() ? 'result' : 'history'}
                onClick={() => handlePlayerClick(player)}
                onRemove={
                  !searchKeyword.trim()
                    ? () => removeFromHistory(player.id)
                    : undefined
                }
                searchQuery={searchKeyword}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
