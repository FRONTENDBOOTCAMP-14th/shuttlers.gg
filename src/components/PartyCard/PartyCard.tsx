import {
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';
import { Badge } from '../Badge/Badge';
import Button from '../Button/Button';
import * as styles from './PartyCard.css';

const getThumbnailImages = () => {
  function importAll(r) {
    let images = {};
    r.keys().forEach((key) => {
      images[key] = r(key);
    });

    return images;
  }

  let thumbnails = importAll(
    require.context('../assets/images'),
    true,
    /\.(png|jpe?g)$/
  );

  return thumbnails;
};

export type PartyInfo = {
  title: string;
  dateTime: string;
  location: string;
  participants: number;
  maxParticipants: number;
  conditions?: string[];
  materials?: string[];
  status: 'joinable' | 'full' | 'joined' | 'readonly';
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

  const buttonVariant: Record<
    PartyInfo['status'],
    'primary' | 'secondary' | 'dark'
  > = {
    joinable: { color: 'primary', text: '참가하기' },
    full: { color: 'primary', text: '참여 불가' },
    joined: { color: 'primary', text: '참가 취소' },
    readonly: { color: 'primary', text: '상세보기' },
  };

  return (
    <article className={styles.partyCard({ status, view })}>
      {view === 'detailed' && <img src="" alt="" />}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3>{party.title}</h3>
        <Badge
          text={`${participants} / ${maxParticipants}`}
          icon={<UserGroupIcon width={16} />}
          variant="filled"
          color="dark"
        />
      </header>

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
      <div>
        <span>참가 조건</span>
        <ul>
          {conditions?.map((condition) => {
            return (
              <Badge
                key={condition}
                text="남성"
                variant="outline"
                color="primary"
              />
            );
          })}
        </ul>
      </div>
      <div>
        <span>준비물</span>
        <ul>
          {materials?.map((material) => {
            return (
              <Badge
                key={material}
                text="￦ 10000"
                variant="outline"
                color="primary"
              />
            );
          })}
        </ul>
      </div>

      <Button
        text={buttonVariant[status].text}
        variant={buttonVariant[status].color}
        size="long"
        disabled={status === 'full'}
      />
    </article>
  );
}
