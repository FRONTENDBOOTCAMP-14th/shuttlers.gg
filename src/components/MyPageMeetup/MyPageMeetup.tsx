'use client';

import * as styles from '@/components/MyPageMeetup/MyPageMeetup.css';
import PartyCard from '@/components/PartyCard/PartyCard';
import type { PartyInfo } from '@/components/PartyCard/PartyCard';
import { useParty } from '@/hooks/useParty';
import { useMemo } from 'react';

type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';

type MeetupSectionProps = {
  title: string;
  meetups: PartyInfo[];
  emptyMessage: string;
};

function MeetupSection({ title, meetups, emptyMessage }: MeetupSectionProps) {
  const isEmpty = meetups.length === 0;

  return (
    <>
      <div className={styles.meetupTitle}>{title}</div>
      <div className={isEmpty ? styles.meetupListEmpty : styles.meetupList}>
        {isEmpty ? (
          <div className={styles.meetupListNull}>{emptyMessage}</div>
        ) : (
          meetups.map((party) => (
            <div key={party.id} className={styles.meetupItem}>
              <PartyCard party={party} view="detailed" />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default function MyPageMeetup() {
  const { userId, parties, loading, error, refresh } = useParty();

  const hostingMeetups = useMemo(
    () => parties.filter((p) => p.creator_id === userId),
    [parties, userId]
  );

  const joinedMeetups = useMemo(
    () => parties.filter((p) => p.creator_id !== userId),
    [parties, userId]
  );

  if (loading) {
    return <div className={styles.meetup}>불러오는 중…</div>;
  }
  if (error) {
    return <div className={styles.meetup}>오류: {error}</div>;
  }

  return (
    <div className={styles.meetup}>
      <MeetupSection
        title="개최중인 모임"
        meetups={hostingMeetups}
        emptyMessage="개최중인 모임이 없습니다."
      />
      <MeetupSection
        title="참가한 모임"
        meetups={joinedMeetups}
        emptyMessage="참가한 모임이 없습니다."
      />
    </div>
  );
}
