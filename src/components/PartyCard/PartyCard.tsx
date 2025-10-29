import {
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import { thumbnails } from '../../data/thumbnails';
import { tokens } from '../../styles/tokens.css';
import { textStyle } from '../../styles/typography.css';
import { Badge } from '../Badge/Badge';
import Button, { ButtonVariant } from '../Button/Button';
import * as styles from './PartyCard.css';

type Grade = 'beginner' | 'D' | 'C' | 'B' | 'A';
type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';

export type User = {
  id: string;
  name: string;
  grade?: Grade | null;
  national_grade?: string;
  gender?: 'male' | 'female';
};

export type PartyInfo = {
  id: string;
  title: string;
  schedule?: {
    date: string;
    start_time: string;
    end_time: string;
    location: string;
  };
  participants: User[];
  maxParticipants: number;
  conditions?: { gender: string; grade: string };
  materials?: { amount: number; shuttle_cock: number };
  status: PartyStatus;
  creator_id?: string;
  participantsList?: User[];
  notice?: string | null;
};

type PartyCardProps = {
  party: PartyInfo;
  view: 'detailed' | 'compact';
  onJoin?: () => void;
  onCancel?: () => void;
  onDetail?: () => void;
};

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '.');
}

function formatTime(timeStr: string) {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}

export default function PartyCard({
  party,
  view = 'detailed',
  onJoin,
  onCancel,
  onDetail,
}: PartyCardProps) {
  const { title, schedule, participants, maxParticipants, materials, status } =
    party;

  const thumbnailImage = thumbnails[title.length % thumbnails.length];
  const buttonVariant: Record<
    PartyInfo['status'],
    { color: ButtonVariant; text: string; action?: () => void }
  > = {
    joinable: { color: 'primary', text: '참가하기', action: onJoin },
    full: { color: 'secondary', text: '참여 불가' },
    joined: { color: 'dark', text: '참가 취소', action: onCancel },
    readonly: { color: 'secondary', text: '상세보기', action: onDetail },
  };

  const btn = buttonVariant[status] ?? { color: 'primary', text: '상세보기' };

  return (
    <article className={styles.partyCard({ status, view })} tabIndex={0}>
      {view === 'detailed' && (
        <div className={styles.thumbnailWrapper}>
          <Image
            src={thumbnailImage}
            fill
            style={{ objectFit: 'cover' }}
            alt=""
            role="presentation"
          />
        </div>
      )}

      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <h3
          style={{
            ...textStyle.heading.semibold,
            color: tokens.color.text.title,
          }}
        >
          {title}
        </h3>
        <Badge
          text={`${participants?.length ?? 0} / ${maxParticipants}`}
          icon={<UserGroupIcon width={16} height={16} aria-hidden />}
          variant="filled"
          color="dark"
          onClick={undefined}
          tabIndex={-1}
          aria-label={`최대 인원 ${maxParticipants}명 중 ${participants}명 참가함`}
        />
      </header>

      <section className={styles.partyContent}>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
          <div className={styles.schedule}>
            <h4 className="sr-only">모임 일시</h4>
            <ClockIcon width={16} height={16} aria-hidden />
            <span>
              {schedule
                ? `${formatDate(schedule.date)} | ${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
                : ''}
            </span>
          </div>
          <div className={styles.schedule}>
            <h4 className="sr-only">모임 장소</h4>
            <MapPinIcon width={16} height={16} aria-hidden />
            <span>{schedule?.location}</span>
          </div>
        </div>
        {view === 'detailed' && (
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
            <div className={styles.condition}>
              <h4>참가 조건</h4>
              <ul style={{ display: 'flex', columnGap: 4 }}>
                <li>
                  <Badge
                    text={
                      party.conditions?.gender === 'male'
                        ? '남성'
                        : party.conditions?.gender === 'female'
                          ? '여성'
                          : '성별무관'
                    }
                    variant="outline"
                    color="primary"
                    onClick={undefined}
                    tabIndex={-1}
                  />
                </li>
                <li>
                  <Badge
                    text={
                      party.conditions?.grade === 'any'
                        ? '실력무관'
                        : party.conditions?.grade === 'beginner'
                          ? '초심'
                          : party.conditions?.grade
                            ? `${party.conditions.grade}조 이상`
                            : '급수무관'
                    }
                    variant="outline"
                    color="primary"
                    onClick={undefined}
                    tabIndex={-1}
                  />
                </li>
              </ul>
            </div>
            <div className={styles.condition}>
              <h4>준비물</h4>
              <ul style={{ display: 'flex', columnGap: 4 }}>
                <li>
                  <Badge
                    text={`￦ ${materials?.amount?.toLocaleString?.() ?? 0}`}
                    variant="outline"
                    color="primary"
                    onClick={undefined}
                    tabIndex={-1}
                  />
                </li>
                <li>
                  <Badge
                    text={`콕 ${materials?.shuttle_cock}개`}
                    variant="outline"
                    color="primary"
                    onClick={undefined}
                    tabIndex={-1}
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      <Button
        text={btn.text}
        variant={btn.color}
        size="long"
        onClick={btn.action ?? undefined}
        disabled={status === 'full'}
        aria-label={btn.text}
      />
    </article>
  );
}
