'use client';

import { Tournament } from '@/app/tournament/Tournament';
import { useTournament } from '@/hooks/useTournament';
import { useParams } from 'next/navigation';

export default function TournamentPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { isLoading, isError, data, error } = useTournament(id);

  console.log(data);

  if (isLoading) return <div style={{ padding: 40 }}>로딩 중…</div>;
  if (isError) return <div style={{ padding: 40 }}>오류: {error}</div>;
  if (!data) return null;

  return (
    <Tournament
      title={data.title}
      tags={data.tags}
      startDate={data.startDate}
      endDate={data.endDate}
      location={data.location}
      host={data.host}
      sponsor={data.sponsor}
      detailUrl={data.detailUrl}
      prizes={data.prizes}
      posterUrl={data.posterUrl}
      details={data.details}
    />
  );
}
