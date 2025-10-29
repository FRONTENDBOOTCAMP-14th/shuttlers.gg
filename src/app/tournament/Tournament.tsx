'use client'

import type {
  StatusCode,
  TournamentStatus,
} from '@/app/calendar/types/tournament';
import * as styles from '@/app/tournament/Tournament.css';
import { Badge } from '@/components/Badge/Badge';
import Button from '@/components/Button/Button';
import { extractRegionTags } from '@/utils/regionUtils';
import { getTournamentStatus } from '@/utils/tournamentStatus';
import {
  CheckBadgeIcon,
  GiftIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
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
    <article className={styles.tournament}>
      <header className={styles.tournamentHeader}>
        <h1 className={styles.tournamentHeaderTitle}>대회 상세 정보</h1>
        <Button
          text={buttonText}
          onClick={() => window.open(detailUrl)}
          disabled={!(status.code === 'receiving')}
        />
      </header>

      <section className={styles.infoSection({ tone: 'brand', gap: 'md' })}>
        <header className={styles.tournamentInfoHeader}>
          <h2 className={styles.tournamentTitle}>{title}</h2>
          <ul className={styles.tournamentInfoTag}>
            {regionTags.map((tag: string) => (
              <li key={tag}>
                <Badge text={tag} variant="outline" color="white" />
              </li>
            ))}
            <li>
              <Badge
                key={status.label}
                text={status.label}
                variant="filled"
                color="white"
              />
            </li>
          </ul>
        </header>
        <p className={styles.tournamentInfoDate}>
          <time dateTime={startDate}>{startDate}</time> ~{' '}
          <time dateTime={endDate}>{endDate}</time>
        </p>
        <p className={styles.tournamentInfoPlace}>{location}</p>
      </section>

      <section className={styles.infoSection({ tone: 'base' })}>
        <h2 className={styles.infoTitle}>
          <span className={styles.infoTitleIcon}>
            <CheckBadgeIcon />
          </span>
          대회 상세
        </h2>
        <dl className={styles.infoList({ tone: 'muted' })}>
          {host && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>주최</dt>
              <dd className={styles.infoValue}>{host}</dd>
            </div>
          )}
          {sponsor && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>후원</dt>
              <dd className={styles.infoValue}>{sponsor}</dd>
            </div>
          )}
          {details?.apply_period && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>접수 기간</dt>
              <dd className={styles.infoValue}>{details.apply_period}</dd>
            </div>
          )}
          {details?.fee && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>참가비</dt>
              <dd className={styles.infoValue}>{details.fee}</dd>
            </div>
          )}
        </dl>
      </section>

      {prizes?.length !== 0 && (
        <section
          className={styles.infoSection({ tone: 'base' })}
          aria-labelledby="prizes-title"
        >
          <h2 id="prizes-title" className={styles.infoTitle}>
            <span className={styles.infoTitleIcon}>
              <GiftIcon />
            </span>
            상품
          </h2>

          <dl className={styles.infoList({ tone: 'muted' })}>
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>1등</dt>
              <dd className={styles.infoValue}>{sponsor}</dd>
            </div>
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>2등</dt>
              <dd className={styles.infoValue}>{sponsor}</dd>
            </div>
          </dl>
        </section>
      )}

      {posterUrl && (
        <section
          className={styles.infoSection({ tone: 'base' })}
          aria-labelledby="poster-title"
        >
          <h2 id="poster-title" className={styles.infoTitle}>
            <span className={styles.infoTitleIcon}>
              <MegaphoneIcon />
            </span>
            대회 포스터
          </h2>
          <figure className={styles.poster}>
            <Image
              src={posterUrl}
              alt="대회 포스터"
              fill
              className={styles.posterImg}
            />
          </figure>
        </section>
      )}
    </article>
  );
}
