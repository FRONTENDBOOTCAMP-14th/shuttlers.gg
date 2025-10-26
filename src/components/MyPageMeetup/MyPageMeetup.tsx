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

const DUMMY_MEETUP: Meetup = {
  title: '함께 운동하실분',
  participants: 20,
  maxParticipants: 30,
  status: 'full',
};

type MeetupSectionProps = {
  title: string;
  meetups: Meetup[];
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
          meetups.map((meetup, i) => (
            <div key={`${meetup.title}-${i}`} className={styles.meetupItem}>
              <PartyCard party={meetup} view="compact" />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default function MyPageMeetup() {
  const hostingMeetups: Meetup[] = [];
  const joinedMeetups: Meetup[] = [];

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
