'use client';

import { supabase } from '@/libs/supabase/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Gender = 'male' | 'female' | 'other';
type GradeValue = '초심' | 'D' | 'C' | 'B' | 'A' | '-';

type UserData = {
  id: string;
  name: string | null;
  email: string;
  gender: Gender | null;
  localGrade: GradeValue | null;
  nationalGrade: GradeValue | null;
};

type SaveInput = Partial<
  Pick<UserData, 'name' | 'gender' | 'nationalGrade' | 'localGrade'>
>;

type PlayerDbRow = {
  id: string;
  name: string | null;
  gender: Gender | null;
  national_grade: GradeValue | null;
  local_grade: GradeValue | null;
};

const DEV_AUTHLESS = process.env.NEXT_PUBLIC_AUTHLESS_DEV === '1';
const LS_KEY = '__mypage_dev_user__';

const DEFAULT_DEV_USER: UserData = {
  id: '00000000-0000-0000-0000-000000000000',
  name: '김민턴',
  email: 'dev@example.com',
  gender: 'male',
  localGrade: 'A',
  nationalGrade: 'A',
};

function loadDevUser(targetId?: string): UserData {
  if (typeof window === 'undefined') return DEFAULT_DEV_USER;

  const raw = localStorage.getItem(LS_KEY);
  const base = raw ? (JSON.parse(raw) as UserData) : DEFAULT_DEV_USER;
  return targetId ? { ...base, id: targetId } : base;
}

function saveDevUser(data: UserData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }
}

function mapPlayerToUserData(
  userId: string,
  email: string,
  player: PlayerDbRow | null
): UserData {
  return {
    id: userId,
    email,
    name: player?.name ?? null,
    gender: player?.gender ?? null,
    localGrade: player?.local_grade ?? null,
    nationalGrade: player?.national_grade ?? null,
  };
}

function mapSaveInputToDbPayload(updates: SaveInput): Partial<PlayerDbRow> {
  const payload: Partial<PlayerDbRow> = {};

  if (updates.name !== undefined) payload.name = updates.name ?? null;
  if (updates.gender !== undefined) payload.gender = updates.gender ?? null;
  if (updates.localGrade !== undefined)
    payload.local_grade = updates.localGrade ?? null;
  if (updates.nationalGrade !== undefined)
    payload.national_grade = updates.nationalGrade ?? null;

  return payload;
}

export function useUser(targetId?: string) {
  const client = useMemo(() => supabase, []);

  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState(false);

  const fetchOne = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (DEV_AUTHLESS) {
        const mock = loadDevUser(targetId);
        setData(mock);
        setCanEdit(true);
        return;
      }

      const { data: sessionData } = await client.auth.getSession();
      const session = sessionData.session;
      const authId = session?.user?.id;

      const userId = targetId ?? authId;
      if (!userId) throw new Error('로그인이 필요합니다.');

      setCanEdit(!!authId && authId === userId);

      let email = authId === userId ? (session?.user?.email ?? '') : '';

      const { data: user } = await client
        .from('users')
        .select('email')
        .eq('id', userId)
        .maybeSingle();

      if (user?.email) email = user.email;

      const { data: player, error: playerError } = await client
        .from('players')
        .select('id, name, gender, national_grade, local_grade')
        .eq('id', userId)
        .maybeSingle<PlayerDbRow>();

      if (playerError) throw playerError;

      setData(mapPlayerToUserData(userId, email, player));
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

      if (DEV_AUTHLESS) {
        const updatedData = { ...data, ...updates };
        setData(updatedData);
        saveDevUser(updatedData);
        return;
      }

      if (!canEdit) throw new Error('수정 권한이 없습니다.');

      const payload = mapSaveInputToDbPayload(updates);

      const { error: updateError } = await client
        .from('players')
        .update(payload)
        .eq('id', data.id);

      if (updateError) throw updateError;

      setData((prev) => (prev ? { ...prev, ...updates } : prev));
    },
    [client, data, canEdit]
  );

  useEffect(() => {
    fetchOne();

    if (!DEV_AUTHLESS) {
      const { data: subscription } = client.auth.onAuthStateChange(() => {
        fetchOne();
      });
      return () => subscription.subscription.unsubscribe();
    }
  }, [client, fetchOne]);

  return {
    id: data?.id ?? '',
    name: data?.name ?? '',
    email: data?.email ?? '',
    gender: data?.gender ?? null,
    localGrade: data?.localGrade ?? null,
    nationalGrade: data?.nationalGrade ?? null,
    loading,
    error,
    canEdit,
    refresh: fetchOne,
    save,
    __dev: DEV_AUTHLESS,
  };
}
