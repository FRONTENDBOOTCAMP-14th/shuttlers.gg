import {
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import { thumbnails } from '../../data/thumbnails';
import { Badge } from '../Badge/Badge';
import Button, { ButtonVariant } from '../Button/Button';
import * as styles from './PartyCard.css';

type Gender = 'male' | 'female' | 'any';
type Grade = 'beginner' | 'D' | 'C' | 'B' | 'A' | 'any';
type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';

export type PartyInfo = {
  title: string;
  dateTime: string;
  location: string;
  participants: number;
  maxParticipants: number;
  conditions?: {
    gender: Gender;
    grade: Grade;
  };
  materials?: {
    amount: number;
    shuttleCock: number;
  };
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
    dateTime,
    location,
    participants,
    maxParticipants,
    conditions,
    materials,
    status,
  } = party;
  const thumbnailImage = thumbnails[party.title.length % thumbnails.length];

  const buttonVariant: Record<
    PartyInfo['status'],
    { color: ButtonVariant; text: string }
  > = {
    joinable: { color: 'primary', text: '참가하기' },
    full: { color: 'primary', text: '참여 불가' },
    joined: { color: 'primary', text: '참가 취소' },
    readonly: { color: 'primary', text: '상세보기' },
  };

  return (
    <article className={styles.partyCard({ status, view })}>
      {view === 'detailed' && (
        <div className={styles.thumbnailWrapper}>
          <Image
            src={thumbnailImage}
            alt="썸네일 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3>{title}</h3>
        <Badge
          text={`${participants} / ${maxParticipants}`}
          icon={<UserGroupIcon width={16} />}
          variant="filled"
          color="dark"
        />
      </header>

      <div className={styles.partyContent()}>
        <div>
          <div>
            <ClockIcon width={16} />
            <span>{dateTime}</span>
          </div>
          <div>
            <MapPinIcon width={16} />
            <span>{location}</span>
          </div>
        </div>
        {view === 'detailed' && (
          <>
            <div>
              <span>참가 조건</span>
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
            <div>
              <span>준비물</span>
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
          </>
        )}

        <Button
          text={buttonVariant[status].text}
          variant={buttonVariant[status].color}
          size="long"
          disabled={status === 'full'}
        />
      </div>
    </article>
  );
}
