'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from '@/libs/supabase/client';
import type { PartyInfo, User } from '@/components/PartyCard/PartyCard';

type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';
function getPartyStatus(party: PartyInfo, uid: string): PartyStatus {
  const startStr = party.schedule?.date && party.schedule?.start_time
    ? `${party.schedule.date}T${(party.schedule.start_time || '').slice(0,5)}`
    : '';
  const endStr = party.schedule?.date && party.schedule?.end_time
    ? `${party.schedule.date}T${(party.schedule.end_time || '').slice(0,5)}`
    : '';

  const now = new Date();
  const end = endStr ? new Date(endStr) : undefined;

  if (end && now > end) return 'readonly';
  if (party.participants.some((u) => u.id === uid)) return 'joined';
  if ((party.participants?.length ?? 0) >= (party.maxParticipants ?? 0)) return 'full';
  return 'joinable';
}

export function useParty() {
  const [uid, setUid] = useState<string>('');
  const [parties, setParties] = useState<PartyInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyParties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: userRes } = await supabase.auth.getUser();
      const currentUid = userRes.user?.id ?? '';
      setUid(currentUid);

      if (!currentUid) {
        setParties([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('party_participants')
        .select(`
          party_id,
          parties (
            id, title, date, start_time, end_time, location,
            max_participants, gender, grade, amount, shuttle_cock, creator_id, notice,
            party_participants (
              users!inner ( id, name, gender, national_grade )
            )
          )
        `)
        .eq('user_id', currentUid);

      if (error) throw error;

      const mapped: PartyInfo[] = (data ?? [])
        .map((row: any) => row.parties)
        .filter(Boolean)
        .map((p: any) => {
          const participants: User[] = (p.party_participants ?? [])
            .map((pp: any) => pp.users)
            .filter(Boolean)
            .map((u: any) => ({
              id: u.id,
              name: u.name ?? '',
              gender: u.gender ?? '',
              grade: u.national_grade ?? '',
            }));

          const party: PartyInfo = {
            id: p.id,
            title: p.title ?? '',
            schedule: {
              date: p.date ?? '',
              start_time: p.start_time ?? '',
              end_time: p.end_time ?? '',
              location: p.location ?? '',
            },
            participants,
            maxParticipants: p.max_participants ?? 0,
            conditions: {
              gender: p.gender ?? 'any',
              grade: p.grade ?? 'any',
            },
            materials: {
              amount: p.amount ?? 0,
              shuttle_cock: p.shuttle_cock ?? 0,
            },
            creator_id: p.creator_id ?? '',
            participantsList: participants,
            notice: p.notice ?? '',
            status: 'joinable',
          };

          party.status = getPartyStatus(party, currentUid);
          return party;
        })

        .sort((a, b) => (a.schedule?.date || '').localeCompare(b.schedule?.date || ''));

      setParties(mapped);
      setLoading(false);
    } catch (e: any) {
      setError(e?.message ?? '파티 목록을 불러오는 중 오류가 발생했어요.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyParties();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUid = session?.user?.id ?? '';
      setUid(nextUid);
      fetchMyParties();
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [fetchMyParties]);

  const refresh = useCallback(() => {
    fetchMyParties();
  }, [fetchMyParties]);

  const myParties = useMemo(() => parties, [parties]);

  return {
    userId: uid,
    parties: myParties,
    loading,
    error,
    refresh,
  };
}
