'use client';

import { supabase } from '@/libs/supabase/client';
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

function pad2(n: number) {
  return String(n).padStart(2, '0');
}
function ymd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function getMonthDateRange(year: number, month: number) {
  const start = `${year}-${pad2(month)}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${pad2(month)}-${pad2(lastDay)}`;
  return { start, end };
}

async function fetchTournamentsByMonth(year: number, month: number) {
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

function enumerateDaysWithinMonth(
  startYmd: string,
  endYmd: string,
  year: number,
  month: number
) {
  const clampStart = new Date(
    Math.max(
      new Date(startYmd).getTime(),
      new Date(year, month - 1, 1).getTime()
    )
  );
  const lastDay = new Date(year, month, 0).getDate();
  const clampEnd = new Date(
    Math.min(
      new Date(endYmd).getTime(),
      new Date(year, month - 1, lastDay).getTime()
    )
  );

  const days: string[] = [];
  for (
    let d = new Date(clampStart);
    d <= clampEnd;
    d.setDate(d.getDate() + 1)
  ) {
    days.push(ymd(d));
  }
  return days;
}

export function useMonthlyTournaments(year: number, month: number) {
  const [state, setState] = useState<FetchState>({
    data: [],
    isLoading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const reqIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const myReqId = ++reqIdRef.current;
    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const data = await fetchTournamentsByMonth(year, month);
      if (myReqId === reqIdRef.current) {
        setState({ data, isLoading: false, error: null });
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      if (myReqId === reqIdRef.current) {
        setState({ data: [], isLoading: false, error: err });
      }
    }
  }, [year, month]);

  useEffect(() => {
    fetchData();
    return () => {
      abortControllerRef.current?.abort();
      reqIdRef.current++;
    };
  }, [fetchData]);

  const events = useMemo<EventRange[]>(
    () => state.data.map((t) => ({ start: t.start_date, end: t.end_date })),
    [state.data]
  );

  const dateIndex = useMemo(() => {
    const map = new Map<string, TournamentRow[]>();
    for (const t of state.data) {
      const days = enumerateDaysWithinMonth(
        t.start_date,
        t.end_date,
        year,
        month
      );
      for (const day of days) {
        if (!map.has(day)) map.set(day, []);
        map.get(day)!.push(t);
      }
    }
    for (const [k, arr] of map) {
      arr.sort(
        (a, b) =>
          a.start_date.localeCompare(b.start_date) ||
          a.end_date.localeCompare(b.end_date) ||
          a.title.localeCompare(b.title)
      );
      map.set(k, arr);
    }
    return map;
  }, [state.data, year, month]);

  const getByDate = useCallback(
    (d: Date | null) => (d ? dateIndex.get(ymd(d)) ?? [] : state.data),
    [dateIndex, state.data]
  );

  return {
    data: state.data,
    events,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetchData,
    dateIndex,
    getByDate,
  };
}
