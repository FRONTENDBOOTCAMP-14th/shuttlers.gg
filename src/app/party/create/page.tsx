'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { TextBox } from '@/components/TextBox/TextBox';
import { supabase } from '@/libs/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Address } from 'react-daum-postcode';
import DaumPostcode from 'react-daum-postcode';
import toast from 'react-hot-toast';
import * as styles from './page.css';

const genderOptions = [
  { label: '모두 가능', value: 'any' },
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
];

const gradeOptions = [
  { label: '모두 가능', value: 'any' },
  { label: '초심', value: 'beginner' },
  { label: 'D', value: 'D' },
  { label: 'C', value: 'C' },
  { label: 'B', value: 'B' },
  { label: 'A', value: 'A' },
];

export default function OpenPartyPage() {
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [fee, setFee] = useState('');
  const [shuttleCock, setShuttleCock] = useState('');
  const [notice, setNotice] = useState('');
  const [agree, setAgree] = useState(false);
  const [gender, setGender] = useState('');
  const [grade, setGrade] = useState('');
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const router = useRouter();

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const localToday = `${yyyy}-${mm}-${dd}`;

  const handleComplete = (data: Address) => {
    let fullAddr = data.address;
    let extraAddr = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddr += data.bname;
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }
    setLocation(fullAddr);
    setIsAddressOpen(false);
  };

  const isTitleValid = title.length >= 2 && title.length <= 8;
  const isParticipantsValid =
    /^\d+$/.test(participants) && participants.length > 0;
  const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isStartTimeValid = /^([01]\d|2[0-3]):[0-5]\d$/.test(startTime);
  const isEndTimeValid = /^([01]\d|2[0-3]):[0-5]\d$/.test(endTime);
  const isLocationValid = location.length > 0;
  const isFeeValid = /^\d+$/.test(fee) && fee.length > 0;
  const isShuttleCockValid =
    /^\d+$/.test(shuttleCock) && shuttleCock.length > 0;
  const isFormValid =
    isTitleValid &&
    isParticipantsValid &&
    isDateValid &&
    isStartTimeValid &&
    isEndTimeValid &&
    isLocationValid &&
    isFeeValid &&
    isShuttleCockValid &&
    agree;

  const formatFee = (value: string) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleCreateParty = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const creator_id = userData?.user?.id ?? '';

    const creator = {
      id: creator_id,
      name: userData?.user?.user_metadata?.name ?? '',
      grade,
      gender,
    };

    const { data, error } = await supabase
      .from('parties')
      .insert([
        {
          creator_id,
          title,
          max_participants: Number(participants),
          date,
          start_time: startTime,
          end_time: endTime,
          location,
          amount: Number(fee),
          shuttle_cock: Number(shuttleCock),
          gender,
          grade,
          notice,
          participants: [creator],
        },
      ])
      .select();

    if (error || !data || !data[0]?.id) {
      toast('모임 생성 실패', { duration: 2000 });
      setTimeout(() => {
        router.push('./find');
      }, 2000);
      return;
    }

    const partyId = data[0].id;

    const { error: participantError } = await supabase
      .from('party_participants')
      .insert([
        {
          party_id: partyId,
          user_id: creator_id,
        },
      ]);

    if (participantError) {
      toast('모임 생성 실패', { duration: 2000 });
      setTimeout(() => {
        router.push('./find');
      }, 2000);
      return;
    }

    toast('✅ 모임 생성 완료', { duration: 2000 });
    setTimeout(() => {
      router.push('./find');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>모임생성</h1>
      <hr className={styles.divider} />

      <div className={styles.gridForm}>
        <Input
          name="title"
          label="모임명"
          placeholder="2자 이상 8자 이하"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 8) setTitle(value);
          }}
          minLength={2}
          maxLength={8}
          required
          type="text"
        />
        <Input
          name="participants"
          label="모집 인원"
          placeholder="본인이 포함된 총 인원"
          value={participants}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '');
            if (raw === '' || Number(raw) <= 100) setParticipants(raw);
          }}
          required
          type="text"
          inputMode="numeric"
        />
        <Input
          name="date"
          label="모임 날짜"
          placeholder="날짜 선택"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          type="date"
          min={localToday}
        />

        <Input
          name="startTime"
          label="시작 시간"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          type="time"
        />

        <Input
          name="endTime"
          label="종료 시간"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          type="time"
        />
        <Input
          name="location"
          label="모임 장소"
          placeholder="주소 검색하기"
          value={location}
          onChange={() => {}}
          required
          type="search"
          readOnly
          onSearchClick={() => setIsAddressOpen(true)}
        />
        {isAddressOpen && (
          <div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ background: '#fff', padding: 20 }}>
              <DaumPostcode onComplete={handleComplete} autoClose />
              <button type="button" onClick={() => setIsAddressOpen(false)}>
                닫기
              </button>
            </div>
          </div>
        )}
        <Input
          name="fee"
          label="참가비용"
          placeholder="개인당 참가 비용"
          value={formatFee(fee)}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, '');
            if (/^\d*$/.test(raw) && Number(raw) <= 100000) setFee(raw);
          }}
          required
          type="text"
          inputMode="numeric"
        />
        <Input
          name="shuttleCock"
          label="필요 셔틀콕"
          placeholder="개인당 셔틀콕 개수"
          value={shuttleCock}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '');
            if (raw === '' || Number(raw) <= 100) setShuttleCock(raw);
          }}
          required
          type="text"
          inputMode="numeric"
        />
      </div>

      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>참가 가능 성별</span>
        <div className={styles.buttonGroup}>
          {genderOptions.map((option) => (
            <Button
              key={option.value}
              text={option.label}
              variant={gender === option.value ? 'secondary' : 'dark'}
              onClick={() => setGender(option.value)}
              rounded={true}
              size="long"
            />
          ))}
        </div>
      </div>

      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>참가 최소 조건</span>
        <div className={styles.buttonGroup}>
          {gradeOptions.map((option) => (
            <Button
              key={option.value}
              text={option.label}
              variant={grade === option.value ? 'secondary' : 'dark'}
              onClick={() => setGrade(option.value)}
              rounded={true}
              size="long"
            />
          ))}
        </div>
      </div>

      <div className={styles.textboxSection}>
        <span className={styles.textboxLabel}>기타 안내 사항</span>
        <TextBox
          placeholder="주차, 추가 안내 사항 등 작성"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          minHeight={140}
        />
      </div>

      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          required
        />
        <label htmlFor="agree" className={styles.checkboxLabel}>
          원활한 시스템 운영을 위하여 생성한 모든 모임은 수정/삭제가 불가합니다
        </label>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          text="모임 생성"
          variant="primary"
          disabled={!isFormValid}
          className={styles.createButton}
          onClick={handleCreateParty}
          size="short"
        />
      </div>
    </div>
  );
}
