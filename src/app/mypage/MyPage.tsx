'use client';

import * as styles from '@/app/mypage/MyPage.css';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import MyPageTabs from '@/components/MyPageTab/MyPageTab';
import UserCard from '@/components/UserCard/UserCard';
import { useState } from 'react';

export function MyPage() {
  const [tab, setTab] = useState<'profile' | 'group'>('profile');

  return (
    <div className={styles.MyPage}>
      <div className={styles.MyPageHeader}>
        <div className={styles.HeaderTitle}>마이페이지</div>
        <div className={styles.HeaderDescription}>
          내 정보 및 모임 관리가 가능합니다.
        </div>
      </div>
      <UserCard
        variant="personal"
        name="김민턴"
        gender="male"
        email="dowapdowari@gmail.com"
      ></UserCard>
      <MyPageTabs
        tabs={[
          { value: 'profile', label: '정보 수정' },
          { value: 'group', label: '모임 관리' },
        ]}
        value={tab}
        onChange={(v) => setTab(v as any)}
        // className={styles.Form}
      >
        {tab === 'profile' ? (
          <div className={styles.Form}>
            <div className={styles.Item}>
              <div className={styles.ItemLabel}>이름</div>
              <div>
                <Input type="text" label="이름" />
              </div>
            </div>
            <div className={styles.Item}>
              <div className={styles.ItemLabel}>성별</div>
              <div className={styles.GenderButtonGroup}>
                <Button
                  text="남성"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
                <Button
                  text="여성"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
                <Button
                  text="기타"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
              </div>
            </div>
            <div className={styles.Item}>
              <div className={styles.ItemLabel}>비밀번호</div>
              <div>
                <Input type="password" label="비밀번호" />
              </div>
            </div>
            <div className={styles.Item}>
              <div className={styles.ItemLabel}>비밀번호 확인</div>
              <div>
                <Input type="password" label="비밀번호 확인" />
              </div>
            </div>
            <div className={styles.itemFull}>
              <div className={styles.ItemLabel}>전국 급수</div>
              <div className={styles.GradeButtonGroup}>
                <Button
                  text="초심"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
                <Button
                  text="D"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
                <Button
                  text="C"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
                <Button
                  text="B"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
                <Button
                  text="A"
                  type="button"
                  variant="dark"
                  rounded={true}
                  size="long"
                />
              </div>
            </div>
            <Button text="변경 완료" type="submit" variant="primary" />
          </div>
        ) : (
          <div className={styles.Form}>여기에 “모임 관리” 리스트/그리드...</div>
        )}
      </MyPageTabs>
    </div>
  );
}
