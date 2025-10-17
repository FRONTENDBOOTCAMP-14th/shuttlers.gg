import type {
  StatusCode,
  TournamentStatus,
} from '@/app/calendar/types/tournament';
import * as styles from '@/app/tournaments/Tournament.css';
import { Badge } from '@/components/Badge/Badge';
import Button from '@/components/Button/Button';
import { extractRegionTags } from '@/utils/regionUtils';
import { getTournamentStatus } from '@/utils/tournamentStatus';
import {
  CheckBadgeIcon,
  GiftIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/solid';
import { useMemo } from 'react';

type Prize = { rank: string; item: string; reward: string };

type TournamentDetailProps = {
  title: string;
  tags?: string[];
  startDate: string;
  endDate: string;
  location: string;
  host?: string;
  sponsor?: string;
  detailUrl?: string;
  prizes?: Prize[];
  posterUrl?: string;
  details?: { apply_period?: string | null; fee: string | null };
};

const BUTTON_TEXT: Record<StatusCode, string> = {
  receiving: '신청하기',
  upcoming: '오픈예정',
  ongoing: '접수마감',
  closed: '종료',
};

export function Tournament(props: TournamentDetailProps) {
  const {
    title,
    startDate,
    endDate,
    location,
    host,
    sponsor,
    prizes,
    posterUrl,
    detailUrl,
    details,
  } = props;

  const status: TournamentStatus = useMemo(
    () => getTournamentStatus(startDate, endDate, details?.apply_period),
    [startDate, endDate, details?.apply_period]
  );

  const buttonText = BUTTON_TEXT[status.code];

  const regionTags = useMemo(() => extractRegionTags(location), [location]);
  return (
    <div className={styles.tournament}>
      <div className={styles.tournamentHeader}>
        <div className={styles.tournamentHeaderTitle}>대회 상세 정보</div>
        <Button
          text={buttonText}
          onClick={() => window.open(detailUrl)}
          disabled={!(status.code === 'receiving')}
        />
      </div>
      <div className={styles.infoSection({ tone: 'brand', gap: 'md' })}>
        <div className={styles.tournamentInfoHeader}>
          <div className={styles.tournamentTitle}>{title}</div>
          <div className={styles.tournamentInfoTag}>
            {regionTags.map((tag: string) => (
              <Badge key={tag} text={tag} variant="outline" color="white" />
            ))}
            <Badge
              key={status.label}
              text={status.label}
              variant="filled"
              color="white"
            />
          </div>
        </div>
        <div className={styles.tournamentInfoDate}>
          {startDate} ~ {endDate}
        </div>
        <div className={styles.tournamentInfoPlace}>{location}</div>
      </div>
      <div className={styles.infoSection({ tone: 'base' })}>
        <div className={styles.infoTitle}>
          <div className={styles.infoTitleIcon}>
            <CheckBadgeIcon />
          </div>
          대회 상세
        </div>
        <div className={styles.infoList({ tone: 'muted' })}>
          {host && (
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>주최</div>
              <div className={styles.infoValue}>{host}</div>
            </div>
          )}
          {sponsor && (
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>후원</div>
              <div className={styles.infoValue}>{sponsor}</div>
            </div>
          )}
          {details?.apply_period && (
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>접수 기간</div>
              <div className={styles.infoValue}>{details.apply_period}</div>
            </div>
          )}
          {details?.fee && (
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>참가비</div>
              <div className={styles.infoValue}>{details.fee}</div>
            </div>
          )}
        </div>
      </div>
      {prizes?.length !== 0 && (
        <div className={styles.infoSection({ tone: 'base' })}>
          <div className={styles.infoTitle}>
            <div className={styles.infoTitleIcon}>
              <GiftIcon />
            </div>
            상품
          </div>
          <div className={styles.infoList({ tone: 'muted' })}>
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>1등</div>
              <div className={styles.infoValue}>{sponsor}</div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>2등</div>
              <div className={styles.infoValue}>{sponsor}</div>
            </div>
          </div>
        </div>
      )}
      {posterUrl && (
        <div className={styles.infoSection({ tone: 'base' })}>
          <div className={styles.infoTitle}>
            <div className={styles.infoTitleIcon}>
              <MegaphoneIcon />
            </div>
            대회 포스터
          </div>
          <img src={posterUrl} alt="대회 포스터" className={styles.posterImg} />
        </div>
      )}
    </div>
  );
}
