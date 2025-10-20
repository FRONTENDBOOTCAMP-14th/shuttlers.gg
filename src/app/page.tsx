'use client';

import LandingSearch from '@/components/LandingSearch/LandingSearch';
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  grade: { 
    local: string; 
    national: string; 
  } | null;
  gender: 'male' | 'female';
};

export default function TestLandingSearchPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    console.log('선택된 사용자:', user);
  };

  return (
    <div
    >
      <h1 style={{ 
        marginBottom: '40px', 
        textAlign: 'center',
        color: '#333',
        fontSize: '32px'
      }}>
        LandingSearch 컴포넌트 테스트
      </h1>

      {/* 검색 컴포넌트 */}
      <div style={{
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <LandingSearch
          onUserSelect={handleUserSelect}
          placeholder="배드민턴 선수를 검색하세요"
        />
      </div>

      {/* 선택된 사용자 정보 표시 */}
      {selectedUser && (
        <div style={{
          padding: '24px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{ 
            marginBottom: '16px', 
            color: '#333',
            fontSize: '20px'
          }}>
            선택된 사용자
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <strong>이름:</strong> {selectedUser.name}
            </div>
            <div>
              <strong>성별:</strong> {selectedUser.gender === 'male' ? '남성' : '여성'}
            </div>
            <div>
              <strong>등급:</strong>
              {selectedUser.grade ? (
                <span>
                  지역: {selectedUser.grade.local}, 전국: {selectedUser.grade.national}
                </span>
              ) : (
                <span>등급 정보 없음</span>
              )}
            </div>
            <div>
              <strong>ID:</strong> {selectedUser.id}
            </div>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            선택 해제
          </button>
        </div>
      )}

      {/* 테스트 가이드 */}
      <div style={{
        padding: '24px',
        backgroundColor: '#e3f2fd',
        borderRadius: '12px',
        border: '1px solid #2196f3'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#1976d2' }}>테스트 가이드</h3>
        <ul style={{ 
          color: '#333', 
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li><strong>자동 검색:</strong> 검색창에 '김', '이', '박' 등을 입력해보세요</li>
          <li><strong>키보드 탐색:</strong> 검색 결과에서 위/아래 방향키로 이동, Enter로 선택</li>
          <li><strong>검색 이력:</strong> 사용자를 선택한 후 빈 검색창을 클릭하면 이력 표시</li>
          <li><strong>이력 삭제:</strong> 검색 이력에서 X 버튼으로 개별 삭제, "전체 삭제"로 모든 이력 삭제</li>
          <li><strong>검색 결과 없음:</strong> 존재하지 않는 이름을 입력해보세요</li>
          <li><strong>ESC 키:</strong> 검색 결과 닫기</li>
        </ul>
      </div>

      {/* Mock 데이터 정보 */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff3e0',
        borderRadius: '12px',
        border: '1px solid #ff9800'
      }}>
        <h3 style={{ marginBottom: '12px', color: '#f57c00' }}>Mock 데이터</h3>
        <p style={{ color: '#333', marginBottom: '12px' }}>
          현재 테스트 가능한 사용자들:
        </p>
        <ul style={{ 
          color: '#666', 
          paddingLeft: '20px',
          fontSize: '14px'
        }}>
          <li>김배드민턴 (남성, A급/B급)</li>
          <li>이셔틀콕 (여성, B급/C급)</li>
          <li>박스매시 (남성, 미정/A급)</li>
        </ul>
      </div>

      {/* 개발자 정보 */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#666',
        textAlign: 'center'
      }}>
        <p>💡 개발자 도구 콘솔에서 선택된 사용자 정보를 확인할 수 있습니다.</p>
        <p>📱 모바일에서도 테스트해보세요!</p>
      </div>
    </div>
  );
}