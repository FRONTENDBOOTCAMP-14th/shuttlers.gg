import * as styles from '@/components/MyPageMeetup/MyPageMeetup.css';
import PartyCard from '@/components/PartyCard/PartyCard';

type Gender = 'male' | 'female' | 'any';
type Grade = 'beginner' | 'D' | 'C' | 'B' | 'A' | 'any';
type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';

type Meetup = {
  title: string;
  schedule?: { dateTime: string; location: string };
  participants: number;
  maxParticipants: number;
  conditions?: { gender: Gender; grade: Grade };
  materials?: { amount: number; shuttleCock: number };
  status: PartyStatus;
};

const dummy: Meetup = {
  title: '함께 운동하실분',
  participants: 20,
  maxParticipants: 30,
  status: 'full',
};

export default function MyPageMeetup() {
  const hostingMeetups: Meetup[] = [dummy, dummy, dummy, dummy];
  const joinedMeetups: Meetup[] = [];

  return (
    <div className={styles.meetup}>
      <div className={styles.meetupTitle}>개최중인 모임</div>
      <div
        className={
          hostingMeetups.length === 0
            ? styles.meetupListEmpty
            : styles.meetupList
        }
      >
        {hostingMeetups.length === 0 ? (
          <div className={styles.meetupListNull}>개최중인 모임이 없습니다.</div>
        ) : (
          hostingMeetups.map((meetup, i) => (
            <div key={`${meetup.title}-${i}`} className={styles.meetupItem}>
              <PartyCard party={meetup} view="compact" />
            </div>
          ))
        )}
      </div>

      <div className={styles.meetupTitle}>참가한 모임</div>
      <div
        className={
          joinedMeetups.length === 0
            ? styles.meetupListEmpty
            : styles.meetupList
        }
      >
        {joinedMeetups.length === 0 ? (
          <div className={styles.meetupListNull}>참가한 모임이 없습니다.</div>
        ) : (
          joinedMeetups.map((meetup, i) => (
            <div key={`${meetup.title}-${i}`} className={styles.meetupItem}>
              <PartyCard party={meetup} view="compact" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
