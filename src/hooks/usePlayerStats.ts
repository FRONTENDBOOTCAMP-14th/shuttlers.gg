'use client';

import { supabase } from '@/libs/supabase';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type CompetitionType = 'local' | 'national';
export type EventType = 'single' | 'double';
export type Grade = 'A' | 'B' | 'C' | 'D' | '초심' | '준자강' | '자강';

export type PlayerStatsRow = {
  player_id: string;
  competition_type: CompetitionType;
  event_type: EventType;
  grade: Grade;
  games: number;
  total_wins: number;
  total_losses: number;
  win_rate: number | null;
  best_rank: number | null;
};

export type PlayerStatsSummary = {
  games: number;
  wins: number;
  losses: number;
  winRate: number;
  bestRank: number | null;
};

type State =
  | {
      status: 'idle' | 'loading';
      rows?: PlayerStatsRow[];
      summary?: PlayerStatsSummary;
    }
  | { status: 'success'; rows: PlayerStatsRow[]; summary: PlayerStatsSummary }
  | {
      status: 'error';
      error: string;
      rows?: PlayerStatsRow[];
      summary?: PlayerStatsSummary;
    };

const STATS_COLUMNS = `
  player_id,
  competition_type,
  event_type,
  grade,
  games,
  total_wins,
  total_losses,
  win_rate,
  best_rank
`;

const toNum = (v: unknown, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

const normalizeSupabaseError = (e: any) => {
  const message = e?.message ?? '데이터 요청 중 오류가 발생했습니다.';
  const code = e?.code;
  const status = e?.status;
  const hint = e?.hint;
  return { message, code, status, hint, raw: e };
};

function mapRow(row: any): PlayerStatsRow {
  return {
    player_id: String(row.player_id),
    competition_type: row.competition_type,
    event_type: row.event_type,
    grade: row.grade,
    games: toNum(row.games),
    total_wins: toNum(row.total_wins),
    total_losses: toNum(row.total_losses),
    win_rate: row.win_rate === null ? null : toNum(row.win_rate),
    best_rank: row.best_rank === null ? null : toNum(row.best_rank),
  };
}

function aggregate(rows: PlayerStatsRow[]): PlayerStatsSummary {
  const games = rows.reduce((a, r) => a + r.games, 0);
  const wins = rows.reduce((a, r) => a + r.total_wins, 0);
  const losses = rows.reduce((a, r) => a + r.total_losses, 0);
  const winRate = games > 0 ? Math.round(((wins * 100) / games) * 10) / 10 : 0;

  const bestRankVals = rows
    .map((r) => r.best_rank)
    .filter((v): v is number => v != null);
  const bestRank = bestRankVals.length ? Math.min(...bestRankVals) : null;

  return { games, wins, losses, winRate, bestRank };
}

export function usePlayerStats(
  params: {
    playerId?: string;
    competition?: CompetitionType;
    event?: EventType;
    grade?: Grade;
  },
  options?: {
    keepPreviousData?: boolean;
  }
) {
  const { playerId, competition, event, grade } = params;
  const keepPreviousData = options?.keepPreviousData ?? true;

  const [state, setState] = useState<State>({ status: 'idle' });

  const abortRef = useRef<AbortController | null>(null);
  const reqIdRef = useRef(0);

  const fetchOnce = useCallback(async () => {
    if (!playerId) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const myReqId = ++reqIdRef.current;

    setState((prev) =>
      keepPreviousData && (prev.status === 'success' || prev.status === 'error')
        ? { ...prev, status: 'loading' }
        : { status: 'loading' }
    );

    try {
      let q = supabase
        .from('player_stats_summary')
        .select(STATS_COLUMNS)
        .eq('player_id', playerId);

      if (competition) q = q.eq('competition_type', competition);
      if (event) q = q.eq('event_type', event);
      if (grade) q = q.eq('grade', grade);

      const { data, error } = await q.returns<PlayerStatsRow[]>();

      if (error) throw error;
      if (myReqId !== reqIdRef.current) return;

      const rows = (data ?? []).map(mapRow);
      const summary = aggregate(rows);

      setState({ status: 'success', rows, summary });
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      if (myReqId !== reqIdRef.current) return;

      const err = normalizeSupabaseError(e);
      // HACK : 차후 배포 시 console.error 삭제
      console.error('[usePlayerStats]', err);
      setState((prev) =>
        keepPreviousData &&
        (prev.status === 'success' || prev.status === 'error')
          ? { ...prev, status: 'error', error: err.message }
          : { status: 'error', error: err.message }
      );
    }
  }, [playerId, competition, event, grade, keepPreviousData]);

  useEffect(() => {
    fetchOnce();
    return () => {
      abortRef.current?.abort();
      reqIdRef.current++;
    };
  }, [fetchOnce]);

  const refetch = useCallback(() => fetchOnce(), [fetchOnce]);

  const derived = useMemo(() => {
    const isIdle = state.status === 'idle';
    const isLoading = state.status === 'loading';
    const isError = state.status === 'error';
    const isSuccess = state.status === 'success';

    const rows =
      state.status === 'success'
        ? state.rows
        : state.status !== 'idle'
          ? state.rows
          : undefined;

    const summary =
      state.status === 'success'
        ? state.summary
        : state.status !== 'idle'
          ? state.summary
          : undefined;

    const error = state.status === 'error' ? state.error : undefined;

    return { isIdle, isLoading, isError, isSuccess, rows, summary, error };
  }, [state]);

  return { ...derived, refetch };
}
