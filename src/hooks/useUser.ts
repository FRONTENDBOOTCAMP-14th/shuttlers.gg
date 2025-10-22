'use client';

import { supabase } from '@/libs/supabase/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Gender = 'male' | 'female' | 'other';
type Grade = '초심' | 'D' | 'C' | 'B' | 'A';

type UsersRow = { id: string; email: string };
type PlayerCardRow = {
  id: string;
  name: string | null;
  gender: Gender | null;
  grade: Grade | null;
};

type UseUserData = {
  id: string;
  name: string | null;
  email: string;
  gender: Gender | null;
  grade: Grade | null;
};

type SaveInput = Partial<Pick<PlayerCardRow, 'name' | 'gender' | 'grade'>>;

const DEV_AUTHLESS = process.env.NEXT_PUBLIC_AUTHLESS_DEV === '1';
const LS_KEY = '__mypage_dev_user__';

const DEFAULT_DEV_USER: UseUserData = {
  id: '00000000-0000-0000-0000-000000000000',
  name: '김민턴',
  email: 'dev@example.com',
  gender: 'male',
  grade: 'C',
};

function loadDevUser(targetId?: string): UseUserData {
  // targetId가 있으면 id만 교체해서 테스트
  const raw =
    typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : null;
  const base = raw ? (JSON.parse(raw) as UseUserData) : DEFAULT_DEV_USER;
  return { ...base, id: targetId ?? base.id };
}

export function useUser(targetId?: string) {
  const client = useMemo(() => supabase, []);

  const [data, setData] = useState<UseUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState(false);

  const fetchOne = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1) 세션 확인
      const { data: sessionData } = await client.auth.getSession();
      const session = sessionData.session ?? null;
      const authId = session?.user?.id ?? null;

      // 2) DEV 모드: 세션 없어도 mock 데이터 반환 (Supabase 쿼리 X)
      if (!session && DEV_AUTHLESS) {
        const mock = loadDevUser(targetId);
        setData(mock);
        setCanEdit(true); // 테스트 편의상 true
        return;
      }

      // 3) 실제 동작 (세션 필요)
      const userId = targetId ?? authId;
      if (!userId) throw new Error('로그인이 필요합니다.');
      setCanEdit(!!authId && authId === userId);

      // email: 자신이면 세션 이메일 우선
      let email: string | null =
        authId === userId ? (session?.user?.email ?? null) : null;

      const { data: u, error: uErr } = await client
        .from('users')
        .select('id, email')
        .eq('id', userId)
        .maybeSingle<UsersRow>();
      if (uErr) throw uErr;
      if (u?.email) email = u.email ?? email;

      const { data: p, error: pErr } = await client
        .from('player_card')
        .select('id, name, gender, grade')
        .eq('id', userId)
        .maybeSingle<PlayerCardRow>();
      if (pErr) throw pErr;

      setData({
        id: userId,
        email: email ?? '',
        name: p?.name ?? null,
        gender: (p?.gender as Gender | null) ?? null,
        grade: (p?.grade as Grade | null) ?? null,
      });
    } catch (e: any) {
      console.error('[useUser] fetch error:', e);
      setError(e?.message ?? '사용자 정보를 불러오지 못했습니다.');
      setData(null);
      setCanEdit(false);
    } finally {
      setLoading(false);
    }
  }, [client, targetId]);

  const save = useCallback(
    async (updates: SaveInput) => {
      if (!data?.id) throw new Error('사용자 정보가 없습니다.');

      // DEV 모드: 로컬스토리지에만 저장
      if (DEV_AUTHLESS) {
        setData((prev) => {
          const next = prev
            ? {
                ...prev,
                name: updates.name ?? prev.name,
                gender: (updates.gender as Gender | null) ?? prev.gender,
                grade: (updates.grade as Grade | null) ?? prev.grade,
              }
            : prev;
          if (next) {
            localStorage.setItem(LS_KEY, JSON.stringify(next));
          }
          return next;
        });
        return;
      }

      // 실제 업데이트 (RLS 필요)
      if (!canEdit) throw new Error('수정 권한이 없습니다.');
      const { error: upErr } = await (client as any)
        .from('player_card')
        .update(updates)
        .eq('id', data.id);
      if (upErr) throw upErr;

      // 낙관적 갱신
      setData((prev) =>
        prev
          ? {
              ...prev,
              name: updates.name ?? prev.name,
              gender: (updates.gender as Gender | null) ?? prev.gender,
              grade: (updates.grade as Grade | null) ?? prev.grade,
            }
          : prev
      );
    },
    [client, data?.id, canEdit]
  );

  useEffect(() => {
    fetchOne();
    if (!DEV_AUTHLESS) {
      const { data: sub } = client.auth.onAuthStateChange(() => {
        fetchOne();
      });
      return () => sub.subscription.unsubscribe();
    }
  }, [client, fetchOne]);

  return {
    id: data?.id ?? '',
    name: data?.name ?? '',
    email: data?.email ?? '',
    gender: data?.gender ?? null,
    grade: data?.grade ?? null,
    loading,
    error,
    canEdit,
    refresh: fetchOne,
    save,
    __dev: DEV_AUTHLESS, // 필요시 UI에서 표시
  };
}
