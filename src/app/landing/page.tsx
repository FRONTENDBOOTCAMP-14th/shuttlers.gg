'use client';

import { useEffect, useState } from 'react';

import Input from '@/components/Input/Input';
import { Logo } from '@/components/Logo';
import NavBar from '@/components/NavBar/NavBar';
import { UserResultCard } from '@/components/UserResultCard/UserResultCard';

import * as styles from './page.css';

// TODO: 실제 API 연동 시 대체 예정
const mockSearchResults = [
  {
    id: '1',
    name: '김배드민턴',
    email: 'kim.badminton@email.com',
    gender: 'male' as const,
    grade: { local: 'A급', national: 'B급' },
    role: 'amateur' as const,
  },
  {
    id: '2',
    name: '김이셔틀콕',
    email: 'lee.shuttlecock@email.com',
    gender: 'female' as const,
    grade: { local: 'B급', national: 'C급' },
    role: 'amateur' as const,
  },
  {
    id: '3',
    name: '김박스매시',
    email: 'park.smash@email.com',
    gender: 'male' as const,
    grade: { national: 'A급' },
    role: 'pro' as const,
  },
  {
    id: '4',
    name: '김최네트샷',
    email: 'choi.netshot@email.com',
    gender: 'female' as const,
    grade: { local: 'C급', national: 'D급' },
    role: 'amateur' as const,
  },
  {
    id: '5',
    name: '김정클리어',
    email: 'jung.clear@email.com',
    gender: 'male' as const,
    grade: { national: 'B급' },
    role: 'amateur' as const,
  },
];

type SearchResult = {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  grade: { local?: string; national: string };
  role: 'amateur' | 'pro';
};

export default function LandingPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // ✅ 선택된 인덱스 상태

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    setSelectedIndex(-1); // ✅ 검색어 변경 시 선택 초기화

    if (keyword.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // NOTE: 실제로는 API 호출, 현재는 모의 데이터 필터링
    const filteredResults = mockSearchResults.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  // ✅ 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          // ✅ 선택된 항목으로 이동
          handleUserClick(searchResults[selectedIndex]);
        } else {
          // ✅ 선택된 항목이 없으면 일반 검색
          console.log('검색 실행:', searchKeyword);
        }
        break;

      case 'Escape':
        // ✅ ESC 키로 검색 결과 닫기
        setSearchResults([]);
        setSelectedIndex(-1);
        (e.target as HTMLInputElement).blur();
        break;
    }
  };

  const handleUserClick = (result: SearchResult) => {
    // TODO: 사용자 상세 페이지로 이동
    console.log('선택된 사용자:', result);
    setSearchKeyword(result.name);
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  // ✅ 마우스 호버 시 선택 인덱스 업데이트
  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  // ✅ 검색 결과 영역 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector(
        `.${styles.searchContainer}`
      );
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className={styles.container}>
      {/* Header 영역 */}
      
        <NavBar
          navItems={[
            { label: '홈', path: '/' },
            { label: '랭킹', path: '/ranking' },
            { label: '매칭', path: '/matching' },
            { label: '전적 검색', path: '/search' },
            { label: '커뮤니티', path: '/community' },
          ]}
          activePath="/"
          theme="light"
          onToggleTheme={() => console.log('테마 변경')}
          onUserClick={() => console.log('사용자 클릭')}
        />
      

      <section className={styles.mainSection}>
        {/* 로고 - 키보드 접근성 제거 */}
        <div className={styles.logoContainer}>
          <div tabIndex={-1} aria-hidden="true">
            <Logo />
          </div>
        </div>

        {/* 메인 문구 */}
        <h1 className={styles.mainTitle}>배드민턴 만남의 장소, 셔틀러스</h1>

        {/* 검색 영역 */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper} onKeyDown={handleKeyDown}>
            <Input
              type="search"
              placeholder="누구의 전적이 궁금하신가요"
              value={searchKeyword}
              onChange={handleSearchChange}
              onSearchClick={undefined}
            />
          </div>

          {/* 검색 결과 리스트 */}
          {searchKeyword.trim() !== '' && searchResults.length > 0 && (
            <div
              className={styles.searchResults}
              role="listbox"
              aria-label="검색 결과"
            >
              {searchResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`${styles.searchResultItem} ${
                    index === selectedIndex ? styles.selected : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  role="option" // ✅ 접근성 개선
                  aria-selected={index === selectedIndex}
                >
                  <UserResultCard
                    id={result.id}
                    name={result.name}
                    grade={result.grade}
                    gender={result.gender}
                    onClick={() => handleUserClick(result)}
                    searchQuery={searchKeyword}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
