'use client';

import { supabase } from '@/libs/supabase/index';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type TournamentRow = {
  tnmt_id: string;
  title: string;
  start_date: string;
  end_date: string;
  detail_url: string | null;
  poster_url: string | null;
  region: string;
  apply_period: string | null;
};

export type EventRange = { start: string; end: string };

type FetchState = {
  data: TournamentRow[];
  isLoading: boolean;
  error: Error | null;
};

const TOURNAMENT_COLUMNS = [
  'tnmt_id',
  'title',
  'start_date',
  'end_date',
  'detail_url',
  'poster_url',
  'region',
  'apply_period:detail_kv->>apply_period',
].join(',');

function padNumber(num: number): string {
  return String(num).padStart(2, '0');
}

function getMonthDateRange(
  year: number,
  month: number
): { start: string; end: string } {
  const startDate = `${year}-${padNumber(month)}-01`;

  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const endDate = `${year}-${padNumber(month)}-${padNumber(lastDayOfMonth)}`;

  return { start: startDate, end: endDate };
}

async function fetchTournamentsByMonth(
  year: number,
  month: number
): Promise<TournamentRow[]> {
  const { start, end } = getMonthDateRange(year, month);

  const { data, error } = await supabase
    .from('bk_tournaments')
    .select(TOURNAMENT_COLUMNS)
    .gte('start_date', start)
    .lte('start_date', end)
    .order('start_date', { ascending: true })
    .returns<TournamentRow[]>();

  if (error) throw error;
  return data ?? [];
}

export function useMonthlyTournaments(year: number, month: number) {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const currentRequestId = ++requestIdRef.current;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await fetchTournamentsByMonth(year, month);

      if (currentRequestId === requestIdRef.current) {
        setState({ data, isLoading: false, error: null });
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;

      if (currentRequestId === requestIdRef.current) {
        setState({ data: [], isLoading: false, error });
      }
    }
  }, [year, month]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      requestIdRef.current++;
    };
  }, [fetchData]);

  const events = useMemo<EventRange[]>(
    () =>
      state.data.map((tournament) => ({
        start: tournament.start_date,
        end: tournament.end_date,
      })),
    [state.data]
  );

  return {
    data: state.data,
    events,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetchData,
  };
}
