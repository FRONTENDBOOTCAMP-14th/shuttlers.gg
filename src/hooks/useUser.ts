// src/hooks/useUser.ts
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
  nationalGrade: GradeValue | null;
};

type SaveInput = Partial<Pick<UserData, 'name' | 'gender' | 'nationalGrade'>>;

/** users 테이블 스키마 */
type UserDbRow = {
  id: string;
  email: string | null;
  name: string | null;
  gender: Gender | null;
  national_grade: GradeValue | null;
};

const DEV_AUTHLESS = process.env.NEXT_PUBLIC_AUTHLESS_DEV === '1';
const LS_KEY = '__mypage_dev_user__';
const UUID_RE = /^[0-9a-fA-F-]{36}$/;

const DEFAULT_DEV_USER: UserData = {
  id: '00000000-0000-0000-0000-000000000000',
  name: '김민턴',
  email: 'dev@example.com',
  gender: 'male',
  nationalGrade: 'A',
};

function loadDevUser(targetId?: unknown): UserData {
  if (typeof window === 'undefined') return DEFAULT_DEV_USER;
  const raw = localStorage.getItem(LS_KEY);
  const base = raw ? (JSON.parse(raw) as UserData) : DEFAULT_DEV_USER;
  const normId = normalizeId(targetId);
  return normId ? { ...base, id: normId } : base;
}

function saveDevUser(data: UserData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }
}

/** 라우트/임의 입력을 안전한 string id로 정규화 */
function normalizeId(input: unknown): string | null {
  if (!input) return null;
  if (typeof input === 'string') return input;

  // 흔한 케이스: { id: '...' } 또는 { params: { id: '...' } }
  if (typeof input === 'object') {
    if (input === null) return null;

    if ('id' in input && typeof input.id === 'string') {
      return input.id;
    }

    if (
      'params' in input &&
      typeof input.params === 'object' &&
      input.params !== null &&
      'id' in input.params &&
      typeof input.params.id === 'string'
    ) {
      return input.params.id;
    }

    if (Array.isArray(input) && typeof input[0] === 'string') {
      return input[0];
    }
  }

  return null;
}

function mapUserRowToUserData(
  row: UserDbRow | null,
  fallbackId: string,
  fallbackEmail: string
): UserData {
  return {
    id: row?.id ?? fallbackId,
    email: row?.email ?? fallbackEmail ?? '',
    name: row?.name ?? null,
    gender: (row?.gender as Gender | null) ?? null,
    nationalGrade: row?.national_grade ?? null,
  };
}

function mapSaveInputToDbPayload(updates: SaveInput): Partial<UserDbRow> {
  const payload: Partial<UserDbRow> = {};
  if (updates.name !== undefined) payload.name = updates.name ?? null;
  if (updates.gender !== undefined) payload.gender = updates.gender ?? null;
  if (updates.nationalGrade !== undefined)
    payload.national_grade = updates.nationalGrade ?? null;
  return payload;
}

export function useUser(targetId?: unknown) {
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

      const { data: sessionData, error: sessionErr } =
        await client.auth.getSession();
      if (sessionErr) throw sessionErr;

      const session = sessionData.session ?? null;
      const authId = session?.user?.id ?? null;

      // targetId가 객체여도 안전하게 문자열로 변환
      const userIdRaw = normalizeId(targetId) ?? authId;
      if (!userIdRaw) {
        // 로그인/타겟 모두 없으면 빈 프로필 반환(원하면 throw로 바꿔도 됨)
        setData({
          id: '',
          email: '',
          name: null,
          gender: null,
          nationalGrade: null,
        });
        setCanEdit(false);
        return;
      }

      // uuid 컬럼이면 형식 체크(형식 안 맞으면 조회 스킵)
      if (!UUID_RE.test(userIdRaw)) {
        console.warn('[useUser] non-UUID id detected:', userIdRaw);
        setData({
          id: userIdRaw,
          email: '',
          name: null,
          gender: null,
          nationalGrade: null,
        });
        setCanEdit(false);
        return;
      }

      setCanEdit(!!authId && authId === userIdRaw);

      const { data: row, error: userErr } = await client
        .from('users')
        .select('id, email, name, gender, national_grade')
        .eq('id', userIdRaw)
        .maybeSingle<UserDbRow>();

      if (userErr) {
        console.error('[useUser] select error:', userErr);
        throw userErr;
      }

      if (!row) {
        const minimal: UserData = {
          id: userIdRaw,
          email: session?.user?.email ?? '',
          name: null,
          gender: null,
          nationalGrade: null,
        };
        setData(minimal);
        return;
      }

      setData(mapUserRowToUserData(row, userIdRaw, session?.user?.email ?? ''));
    } catch (e) {
      const error = e as { message?: string; code?: string };
      console.error('[useUser] fetch error:', e, error.message, error.code);
      setError(error.message ?? '사용자 정보를 불러오지 못했습니다.');
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

      // id가 uuid가 아니면 서버 업데이트 스킵
      if (!UUID_RE.test(data.id)) {
        console.warn('[useUser] skip update: non-UUID id:', data.id);
        setData((prev) => (prev ? { ...prev, ...updates } : prev));
        return;
      }

      const payload = mapSaveInputToDbPayload(updates);

      const { error: updateError } = await client
        .from('users')
        .update(payload)
        .eq('id', data.id);

      if (updateError) {
        console.error('[useUser] update error:', updateError);
        throw updateError;
      }

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
    nationalGrade: data?.nationalGrade ?? null,
    loading,
    error,
    canEdit,
    refresh: fetchOne,
    save,
    __dev: DEV_AUTHLESS,
  };
}
