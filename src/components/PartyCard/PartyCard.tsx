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

type Gender = 'male' | 'female' | 'any';
type Grade = 'beginner' | 'D' | 'C' | 'B' | 'A' | 'any';
type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';

export type PartyInfo = {
  title: string;
  schedule?: { dateTime: string; location: string };
  participants: number;
  maxParticipants: number;
  conditions?: { gender: Gender; grade: Grade };
  materials?: { amount: number; shuttleCock: number };
  status: PartyStatus;
};

type PartyCardProps = {
  party: PartyInfo;
  view: 'detailed' | 'compact';
  onJoin?: () => void;
  onCancel?: () => void;
  onDetail?: () => void;
};

export default function PartyCard({
  party,
  view = 'detailed',
  onJoin,
  onCancel,
  onDetail,
}: PartyCardProps) {
  const {
    title,
    schedule,
    participants,
    maxParticipants,
    conditions,
    materials,
    status,
  } = party;

  const thumbnailImage = thumbnails[party.title.length % thumbnails.length];
  const buttonVariant: Record<
    PartyInfo['status'],
    { color: ButtonVariant; text: string; action?: () => void }
  > = {
    joinable: { color: 'primary', text: '참가하기', action: onJoin },
    full: { color: 'primary', text: '참여 불가' },
    joined: { color: 'dark', text: '참가 취소', action: onCancel },
    readonly: { color: 'primary', text: '상세보기', action: onDetail },
  };

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
          text={`${participants} / ${maxParticipants}`}
          icon={<UserGroupIcon width={16} aria-hidden />}
          variant="filled"
          color="dark"
          aria-label={`최대 인원 ${maxParticipants}명 중 ${participants}명 참가함`}
        />
      </header>

      <section className={styles.partyContent}>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
          <div className={styles.schedule}>
            <h4 className="sr-only">모임 일시</h4>
            <ClockIcon width={16} aria-hidden />
            <span>{schedule?.dateTime}</span>
          </div>
          <div className={styles.schedule}>
            <h4 className="sr-only">모임 장소</h4>
            <MapPinIcon width={16} aria-hidden />
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
                      conditions?.gender === 'male'
                        ? '남성'
                        : conditions?.gender === 'female'
                          ? '여성'
                          : '성별무관'
                    }
                    variant="outline"
                    color="primary"
                  />
                </li>
                <li>
                  <Badge
                    text={
                      conditions?.grade === 'any'
                        ? '실력무관'
                        : conditions?.grade === 'beginner'
                          ? '초심'
                          : `${conditions?.grade}조 이상`
                    }
                    variant="outline"
                    color="primary"
                  />
                </li>
              </ul>
            </div>
            <div className={styles.condition}>
              <h4>준비물</h4>
              <ul style={{ display: 'flex', columnGap: 4 }}>
                <li>
                  <Badge
                    text={`￦ ${materials?.amount}`}
                    variant="outline"
                    color="primary"
                  />
                </li>
                <li>
                  <Badge
                    text={`콕 ${materials?.shuttleCock}개`}
                    variant="outline"
                    color="primary"
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      <Button
        text={buttonVariant[status].text}
        variant={buttonVariant[status].color}
        size="long"
        onClick={buttonVariant[status].action ?? undefined}
        disabled={status === 'full'}
        aria-label={buttonVariant[status].text}
      />
    </article>
  );
}
