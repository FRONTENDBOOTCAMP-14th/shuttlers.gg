'use client';

import { supabase } from '@/libs/supabase/index';
import { useEffect, useMemo, useRef, useState } from 'react';

export type KnownDetailLabel =
  | '구분'
  | '참가지역'
  | '접수기간'
  | '주최'
  | '주관'
  | '협찬'
  | '참가비'
  | '계좌번호'
  | '예금주'
  | '문의전화';

export type DetailRow = {
  label: KnownDetailLabel | string;
  value: string;
};

export type TournamentRow = {
  tnmt_id: string;
  title: string;
  start_date: string; // 'YYYY-MM-DD'
  end_date: string; // 'YYYY-MM-DD'
  start_month: string; // 'YYYY-MM-01' (date)
  detail_url: string | null;
  poster_url: string | null;
  detail_row: DetailRow;
};

export type EventRange = { start: string; end: string };

const pad2 = (n: number) => String(n).padStart(2, '0');

async function fetchByStartMonth(
  year: number,
  month: number
): Promise<TournamentRow[]> {
  const startMonthKey = `${year}-${pad2(month)}-01`; // ← start_month 값과 동일하게
  const { data, error } = await supabase
    .from('bk_tournaments')
    .select(
      'tnmt_id,title,start_date,end_date,start_month,detail_url,poster_url,detail_row'
    )
    .eq('start_month', startMonthKey) // ✅ 정확 일치
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

type State = { data: TournamentRow[]; isLoading: boolean; error: Error | null };

export function useMonthlyTournaments(year: number, month: number) {
  const [state, setState] = useState<State>({
    data: [],
    isLoading: false,
    error: null,
  });
  const runId = useRef(0);

  const load = async () => {
    const id = ++runId.current;
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const data = await fetchByStartMonth(year, month);
      console.log(data);
      if (id === runId.current)
        setState({ data, isLoading: false, error: null });
    } catch (e: any) {
      if (id === runId.current)
        setState({ data: [], isLoading: false, error: e });
    }
  };

  useEffect(() => {
    load();
    return () => {
      runId.current++;
    };
  }, [year, month]);

  const events: EventRange[] = useMemo(
    () => state.data.map((t) => ({ start: t.start_date, end: t.end_date })),
    [state.data]
  );

  return {
    data: state.data,
    events,
    isLoading: state.isLoading,
    error: state.error,
    refetch: load,
  };
}
