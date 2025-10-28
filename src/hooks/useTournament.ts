'use client';

import { Database } from '@/libs/database.types';
import { supabase } from '@/libs/supabase/index';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Prize = { rank: string; item: string; reward: string };
type TournamentRow = Database['public']['Tables']['bk_tournaments']['Row'];

export type TournamentData = {
  id: string;
  title: string;
  tags: string[];
  startDate: string;
  endDate: string;
  location: string;
  host?: string;
  sponsor?: string;
  capacity?: number;
  firstServer?: string;
  applyDeadline?: string;
  applyStatus?: '접수중' | '접수예정' | '진행 중' | '종료';
  detailUrl?: string;
  applyUrl?: string;
  participantBenefit?: string;
  prizes?: Prize[];
  posterUrl?: string;
  posterCaption?: string;
  details?: { apply_period?: string | null; fee: string | null };
};

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: TournamentData }
  | { status: 'error'; error: string };

function mapRowToData(row: TournamentRow): TournamentData {
  return {
    id: row.tnmt_id,
    title: row.title,
    tags: Array.isArray(row.category) ? [row.category] : [],
    startDate: (row.start_date ?? '').slice(0, 10),
    endDate: (row.end_date ?? '').slice(0, 10),
    location: row.region ?? '',
    host: row.host ?? undefined,
    sponsor: row.sponsor ?? undefined,
    detailUrl: row.detail_url ?? undefined,
    prizes: [],
    posterUrl: row.poster_url ?? undefined,
    details: row.detail_kv as
      | { apply_period?: string | null; fee: string | null }
      | undefined,
  };
}

export function useTournament(id?: string) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const abortRef = useRef<AbortController | null>(null);

  const fetchOnce = useCallback(async () => {
    if (!id) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setState({ status: 'loading' });

    try {
      const { data, error } = await supabase
        .from('bk_tournaments')
        .select(
          `
          tnmt_id, title, start_date, end_date, region, category,
          host, sponsor, organizer, contact_primary, fee_raw, detail_url, poster_url,
          detail_kv
        `
        )
        .eq('tnmt_id', id)
        .single();

      if (error) throw error;

      if (data) {
        setState({
          status: 'success',
          data: mapRowToData(data as TournamentRow),
        });
      }
    } catch (e) {
      const error = e as Error;
      if (error?.name === 'AbortError') return;
      setState({ status: 'error', error: error?.message ?? 'Unknown error' });
    }
  }, [id]);

  useEffect(() => {
    fetchOnce();
    return () => abortRef.current?.abort();
  }, [fetchOnce]);

  const refetch = useCallback(() => fetchOnce(), [fetchOnce]);

  const derived = useMemo(
    () => ({
      isIdle: state.status === 'idle',
      isLoading: state.status === 'loading',
      isError: state.status === 'error',
      isSuccess: state.status === 'success',
      data: state.status === 'success' ? state.data : undefined,
      error: state.status === 'error' ? state.error : undefined,
    }),
    [state]
  );

  return { ...derived, refetch };
}
