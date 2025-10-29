/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/Badge/Badge';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import type { PartyInfo, User } from '@/components/PartyCard/PartyCard';
import PartyCard from '@/components/PartyCard/PartyCard';
import { TextBox } from '@/components/TextBox/TextBox';
import { supabase } from '@/libs/supabase/client';
import {
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';
import { PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as styles from './page.css';

const genderOptions = [
  { label: '모두 가능', value: 'all' },
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
];

const gradeOptions = [
  { label: '모두 가능', value: 'all' },
  { label: '초심 이상', value: 'beginner' },
  { label: 'D조 이상', value: 'D' },
  { label: 'C조 이상', value: 'C' },
  { label: 'B조 이상', value: 'B' },
  { label: 'A조 이상', value: 'A' },
];

type PartyStatus = 'joinable' | 'full' | 'joined' | 'readonly';

const PartyPage = () => {
  const [parties, setParties] = useState<PartyInfo[]>([]);
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [gradeFilter, setGradeFilter] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<PartyInfo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserGrade, setCurrentUserGrade] = useState('');
  const [currentUserGender, setCurrentUserGender] = useState('');
  const newParticipant = {
    id: currentUserId,
    name: currentUserName,
    grade: currentUserGrade,
    gender: currentUserGender,
  };

  const fetchParties = async () => {
    const { data, error } = await supabase.from('parties').select('*');
    console.log('Supabase parties data:', data);
    if (!error && data) {
      const partyList: PartyInfo[] = data.map((party) => {
        const partyInfo: PartyInfo = {
          id: party.id ?? '',
          title: party.title ?? '',
          schedule: {
            date: party.date ?? '',
            start_time: party.start_time ?? '',
            end_time: party.end_time ?? '',
            location: party.location ?? '',
          },
          participants: Array.isArray(party.participants)
            ? party.participants.filter(
                (user): user is User =>
                  !!user && typeof user === 'object' && 'id' in user
              )
            : [],
          maxParticipants: party.max_participants ?? 0,
          conditions: {
            gender: party.gender ?? '',
            grade: party.grade ?? '',
          },
          materials: {
            amount: party.amount ?? 0,
            shuttle_cock: party.shuttle_cock ?? 0,
          },
          creator_id: party.creator_id ?? '',
          participantsList: Array.isArray(party.participants)
            ? party.participants.filter(
                (user): user is User =>
                  !!user && typeof user === 'object' && 'id' in user
              )
            : [],
          notice: party.notice ?? '',
          status: 'joinable',
        };

        partyInfo.status = getPartyStatus(partyInfo, currentUserId);

        return partyInfo;
      });
      setParties(partyList);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!currentUserId) return;
      const { data, error } = await supabase
        .from('users')
        .select('name, national_grade, gender')
        .eq('id', currentUserId)
        .single();

      if (data) {
        setCurrentUserName(data.name ?? '');
        setCurrentUserGrade(data.national_grade ?? '');
        setCurrentUserGender(data.gender ?? '');
      }
    };
    fetchUserInfo();
  }, [currentUserId]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data?.user?.id ?? '');
      setIsLoggedIn(!!data?.user);
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });
  }, []);

  useEffect(() => {
    fetchParties();
  }, [currentUserId]);

  const getPartyStatus = (
    party: PartyInfo,
    currentUserId: string
  ): PartyStatus => {
    const now = new Date();
    const partyStart = new Date(
      `${party.schedule?.date ?? ''}T${party.schedule?.start_time ?? ''}`
    );
    if (now > partyStart) return 'readonly';
    if (party.participants.some((u) => u.id === currentUserId)) return 'joined';
    if (party.participants.length >= party.maxParticipants) return 'full';
    return 'joinable';
  };

  const handleGenderBadgeClick = (value: string) => {
    setGenderFilter((prev) => (prev === value ? '' : value));
  };

  const handleGradeBadgeClick = (value: string) => {
    setGradeFilter((prev) => (prev === value ? '' : value));
  };

  const filteredList = parties.filter((party) => {
    const gender = party.conditions?.gender ?? 'any';
    const grade = party.conditions?.grade ?? 'any';

    if (!genderFilter && !gradeFilter) return true;

    if (genderFilter === 'all') {
      if (gender !== 'any') return false;
    } else if (genderFilter === 'female') {
      if (gender !== 'female') return false;
    } else if (genderFilter === 'male') {
      if (gender !== 'male') return false;
    }

    if (gradeFilter === 'all') {
      if (grade !== 'any') return false;
    } else if (gradeFilter === 'beginner') {
      if (grade !== 'beginner') return false;
    } else if (gradeFilter === 'D') {
      if (grade !== 'D') return false;
    } else if (gradeFilter === 'C') {
      if (grade !== 'C') return false;
    } else if (gradeFilter === 'B') {
      if (grade !== 'B') return false;
    } else if (gradeFilter === 'A') {
      if (grade !== 'A') return false;
    }

    return true;
  });

  const handleJoinClick = (party: PartyInfo) => {
    setSelectedParty(party);
    setModalOpen(true);
  };

  const getSortedParticipants = (party: PartyInfo) => {
    const list = party.participantsList ?? [];
    const creator = list.find((u) => u.id === party.creator_id);
    const others = list.filter((u) => u.id !== party.creator_id);
    return creator ? [creator, ...others] : others;
  };

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return dateStr.replace(/-/g, '.');
  }

  function formatTime(timeStr: string) {
    if (!timeStr) return '';
    return timeStr.slice(0, 5);
  }

  const handleCreatePartyClick = () => {
    if (!isLoggedIn) {
      toast('✅ 로그인이 필요합니다.', { duration: 2000 });
      return;
    }
    window.location.href = './create';
  };

  const handleJoinParty = async () => {
    if (!selectedParty || !currentUserId) return;

    const partyId = selectedParty.id ?? '';
    if (!partyId) {
      setModalOpen(false);
      await fetchParties();
      toast('❌ 파티 정보가 올바르지 않습니다.', { duration: 2000 });
      return;
    }

    const { error: participantError } = await supabase
      .from('party_participants')
      .insert([
        {
          party_id: partyId,
          user_id: currentUserId,
        },
      ]);

    const newParticipant = {
      id: currentUserId,
      name: currentUserName,
      grade: currentUserGrade,
      gender: currentUserGender,
    };

    const partyRes = await supabase
      .from('parties')
      .select('participants')
      .eq('id', partyId)
      .single();

    const prevParticipants = Array.isArray(partyRes.data?.participants)
      ? partyRes.data.participants
      : [];

    const updatedParticipants = [...prevParticipants, newParticipant];

    const { error: updateError } = await supabase
      .from('parties')
      .update({ participants: updatedParticipants })
      .eq('id', partyId);

    setModalOpen(false);
    await fetchParties();

    if (!participantError && !updateError) {
      toast('✅ 모임 참여가 완료되었습니다.', { duration: 2000 });
    } else {
      toast('❌ 참여에 실패했습니다.', { duration: 2000 });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>모임찾기</h1>
          <h2 className={styles.subtitle}>
            운동할 곳을 찾고있나요? <br />
            직접 모임을 만들거나 근처에 있는 일회성 모임에 참여해 보세요!
          </h2>
        </div>

        <Button
          onClick={handleCreatePartyClick}
          text="모임 생성"
          type="button"
          iconPosition="left"
          rounded={false}
          icon={<PlusIcon />}
          variant="primary"
          size="short"
          className={styles.createButton}
        />
        <hr className={styles.divider} />
      </div>

      <section className={styles.filterSection}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>참가 가능 성별</span>
          <div className={styles.badgeGroup}>
            {genderOptions.map((option) => (
              <Badge
                key={option.value}
                text={option.label}
                active={genderFilter === option.value}
                onClick={() => handleGenderBadgeClick(option.value)}
                variant="outline"
                color="primary"
                className={styles.filterBadge}
              />
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>참가 가능 급수</span>
          <div className={styles.badgeGroup}>
            {gradeOptions.map((option) => (
              <Badge
                key={option.value}
                text={option.label}
                active={gradeFilter === option.value}
                onClick={() => handleGradeBadgeClick(option.value)}
                variant="outline"
                color="primary"
                className={styles.filterBadge}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.partyListSection}>
        {filteredList.length === 0 ? (
          <div className={styles.emptyText}>조건에 맞는 모임이 없습니다.</div>
        ) : (
          <div className={styles.partyGrid}>
            {filteredList.map((party) => (
              <PartyCard
                key={party.title + party.schedule?.date}
                party={party}
                view="detailed"
                onJoin={() => handleJoinClick(party)}
              />
            ))}
          </div>
        )}
      </section>

      {modalOpen && selectedParty && (
        <Modal
          title="모임 상세정보"
          visible={modalOpen}
          onCancel={() => setModalOpen(false)}
          confirmText="참가하기"
          onConfirm={handleJoinParty}
        >
          <header className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{selectedParty.title}</h3>
            <Badge
              text={`${selectedParty.participants.length} / ${selectedParty.maxParticipants}`}
              icon={<UserGroupIcon width={16} height={16} aria-hidden />}
              variant="filled"
              color="dark"
              onClick={undefined}
              tabIndex={-1}
              aria-label={`최대 인원 ${selectedParty.maxParticipants}명 중 ${selectedParty.participants.length}명 참가함`}
            />
          </header>

          <section className={styles.modalPartyContent}>
            <div>
              <div className={styles.modalSchedule}>
                <ClockIcon width={16} height={16} aria-hidden />
                <span className={styles.scheduleDatetime}>
                  {selectedParty.schedule
                    ? `${formatDate(selectedParty.schedule.date)} | ${formatTime(selectedParty.schedule.start_time)} - ${formatTime(selectedParty.schedule.end_time)}`
                    : ''}
                </span>
              </div>
              <div className={styles.modalSchedule}>
                <MapPinIcon width={16} height={16} aria-hidden />
                <span className={styles.scheduleDatetime}>
                  {selectedParty.schedule?.location}
                </span>
              </div>
            </div>
            <div className={styles.modalConditionWrapper}>
              <div className={styles.modalCondition}>
                <h4 className={styles.conditionText}>참가 조건</h4>
                <ul className={styles.modalBadgeList}>
                  <li>
                    <Badge
                      text={
                        selectedParty.conditions?.gender === 'male'
                          ? '남성'
                          : selectedParty.conditions?.gender === 'female'
                            ? '여성'
                            : '성별무관'
                      }
                      variant="outline"
                      color="primary"
                      onClick={undefined}
                      tabIndex={-1}
                    />
                  </li>
                  <li>
                    <Badge
                      text={
                        selectedParty.conditions?.grade === 'any'
                          ? '실력무관'
                          : selectedParty.conditions?.grade === 'beginner'
                            ? '초심'
                            : selectedParty.conditions?.grade
                              ? `${selectedParty.conditions.grade}조 이상`
                              : '급수무관'
                      }
                      variant="outline"
                      color="primary"
                      onClick={undefined}
                      tabIndex={-1}
                    />
                  </li>
                </ul>
              </div>
              <div className={styles.modalCondition}>
                <h4 className={styles.conditionText}>준비물</h4>
                <ul className={styles.modalBadgeList}>
                  <li>
                    <Badge
                      text={`￦ ${selectedParty.materials?.amount?.toLocaleString?.() ?? 0}`}
                      variant="outline"
                      color="primary"
                      onClick={undefined}
                      tabIndex={-1}
                    />
                  </li>
                  <li>
                    <Badge
                      text={`콕 ${selectedParty.materials?.shuttle_cock}개`}
                      variant="outline"
                      color="primary"
                      onClick={undefined}
                      tabIndex={-1}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>기타 안내사항</span>
              <TextBox
                value={selectedParty.notice ?? '안내사항이 없습니다'}
                readOnly
                style={{ width: '100%' }}
                minHeight={140}
              />
            </div>
          </section>

          <div className={styles.participantsList}>
            <h3>참가자 명단</h3>
            <ul className={styles.participantsWrapper}>
              {selectedParty.participants.map((user: User) => (
                <li className={styles.participantsItem} key={user.id}>
                  <div className={styles.nameContainer}>
                    {user.id === selectedParty.creator_id && (
                      <StarIcon
                        width={20}
                        height={20}
                        style={{ color: '#3377ff' }}
                      />
                    )}
                    <span
                      style={{
                        alignContent: 'center',
                      }}
                    >
                      {user.name}
                    </span>
                  </div>
                  <div className={styles.badgeWrapper}>
                    <Badge
                      text={user.grade ?? ''}
                      variant="filled"
                      color="primary"
                    />
                    <Badge
                      text={
                        user.gender === 'male'
                          ? '남자'
                          : user.gender === 'female'
                            ? '여자'
                            : ''
                      }
                      variant="outline"
                      color="primary"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PartyPage;
