'use client';

import LandingSearch from '@/components/LandingSearch/LandingSearch';
import { Logo } from '@/components/Logo';
import * as styles from './page.css';

export default function HomePage() {
  return (
    <div>
      <main className={styles.mainSection}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <h2 className={styles.mainTitle}>배드민턴 만남의 장소, 셔틀러스</h2>
        <LandingSearch />
      </main>
    </div>
  );
}
