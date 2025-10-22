import { RegisterFormValues, type Profile } from '@/@types/forms';
import { Status } from '@/@types/global';
import Button from '@/components/Button/Button';
import CheckInput from '@/components/CheckInput/CheckInput';
import Input from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import useModal from '@/hooks/useModal';
import { supabase } from '@/libs/supabase/client';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import {
  emailRules,
  nameRules,
  passwordCheck,
  passwordRules,
} from '@/utils/authValidation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './RegisterForm.css';

type RegisterFormProps = {
  step: 1 | 2;
  onClickNext: () => void;
  onSubmitAction: (formData: RegisterFormValues) => void;
};

const GENDER_OPTIONS: {
  value: Profile['gender'];
  label: '남성' | '여성';
}[] = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
];
const GRADE_OPTIONS: Profile['national_grade'][] = ['초심', 'D', 'C', 'B', 'A'];
const VERIFY_TIME = 300;

export default function RegisterForm({
  step,
  onClickNext,
  onSubmitAction,
}: RegisterFormProps) {
  const { handleSubmit, register, setValue, trigger, watch } =
    useFormContext<RegisterFormValues>();

  const [gender, setGender] = useState<Profile['gender']>();
  const [grade, setGrade] = useState<Profile['national_grade']>();
  const [status, setStatus] = useState<Status>('idle');
  const [remainingTime, setRemainingTime] = useState<number>(VERIFY_TIME);
  const [checked, setChecked] = useState<Boolean>(false);
  const modal = useModal();

  useEffect(() => {
    register('gender', { required: '성별을 선택해주세요.' });
    register('national_grade', { required: '급수를 선택해주세요.' });
  }, [register]);

  useEffect(() => {
    if (status === 'pending') {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setStatus('idle');
            toast('인증 시간이 만료되었습니다. 다시 인증해 주세요.');
            return VERIFY_TIME;
          }
          return prevTime - 1;
        });

        return () => clearInterval(timer);
      }, 1000);
    }
  }, [status]);

  const handleSendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: watch('email'),
      options: { shouldCreateUser: false },
    });

    if (error) {
      setStatus('idle');
      return toast.error(
        `인증 코드 발송 실패\n ${error.status}: ${error.message}`
      );
    }

    toast.success('인증 코드 발송 완료! 이메일을 확인해 주세요.');
    setStatus('pending');
  };

  const handleVerifyOtp = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: watch('email'),
      token: watch('verify_code') ?? '',
      type: 'signup',
    });

    if (error) {
      setStatus('idle');
      return toast.error(`인증 실패\n ${error.status}: ${error.message}`);
    }
    if (!data.user) return;

    toast.success('이메일 인증 성공');
    setStatus('resolved');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitAction)}
        className={styles.registerForm}
      >
        {step === 1 && (
          <>
            <CheckInput
              name="email"
              type="email"
              label="이메일"
              placeholder="이메일 입력"
              register={register('email', emailRules)}
              status={status}
              remainingTime={remainingTime}
              buttonType="send"
              buttonAction={handleSendOtp}
            />
            {status !== 'idle' && (
              <CheckInput
                name="code"
                type="text"
                label="인증코드"
                placeholder="6자리 인증 코드"
                register={register('verify_code', { required: true })}
                status={status}
                buttonType="verify"
                buttonAction={handleVerifyOtp}
              />
            )}
            <Input
              {...(register('password'), passwordRules)}
              name="password"
              type="password"
              label="비밀번호"
              placeholder="8자 이상 12자 이하"
            />
            <Input
              {...(register('password_check'),
              passwordCheck(watch('password'), watch('password_check')))}
              name="password_check"
              type="password"
              label="비밀번호 확인"
              placeholder="8자 이상 12자 이하"
            />
            <Button
              type="button"
              text="다음으로"
              variant="primary"
              size="long"
              onClick={async () => {
                const isValid = await trigger([
                  'email',
                  'verify_code',
                  'password',
                  'password_check',
                ]);
                if (!isValid) return;

                onClickNext();
              }}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Input
              {...(register('name'), nameRules)}
              name="name"
              type="text"
              label="이름"
              placeholder="실명을 입력해주세요."
            />

            <div
              style={{ display: 'flex', flexDirection: 'column', rowGap: 12 }}
            >
              <span
                role="label"
                style={{
                  ...textStyle.heading.semibold,
                  color: tokens.color.text.body,
                }}
              >
                성별
              </span>
              <ul style={{ display: 'flex', columnGap: 10 }}>
                {GENDER_OPTIONS.map((option) => {
                  return (
                    <li key={option.value} style={{ flex: 1 }}>
                      <Button
                        text={option.label}
                        variant={gender === option.value ? 'secondary' : 'dark'}
                        size="long"
                        rounded
                        onClick={() => {
                          setGender(option.value);
                          setValue('gender', option.value);
                          trigger('gender');
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'column', rowGap: 12 }}
            >
              <span
                role="label"
                style={{
                  ...textStyle.heading.semibold,
                  color: tokens.color.text.body,
                }}
              >
                급수
              </span>
              <ul style={{ display: 'flex', columnGap: 10 }}>
                {GRADE_OPTIONS.map((option) => {
                  return (
                    <li key={option} style={{ flex: 1 }}>
                      <Button
                        text={option}
                        variant={grade === option ? 'secondary' : 'dark'}
                        size="long"
                        rounded
                        onClick={() => {
                          setGrade(option);
                          setValue('national_grade', option);
                          trigger('national_grade');
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              style={{
                ...textStyle.body.regular,
                color: tokens.color.text.caption,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                columnGap: 4,
                marginTop: 16,
              }}
            >
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={checked}
                onChange={() => setChecked((prev) => !prev)}
                className={styles.checkBox}
              />
              <button className={styles.optionLink} onClick={modal.open}>
                개인정보 수집 및 이용 약관
              </button>
              에 동의합니다.
            </div>

            <Button
              type="submit"
              text="가입 완료"
              variant="primary"
              size="long"
              disabled={!checked}
            />
          </>
        )}
      </form>

      <Modal
        title="이용 약관"
        variant="confirm"
        confirmText="동의"
        cancelText="취소"
        onConfirm={() => {
          setChecked(true);
          modal.close();
        }}
        onCancel={() => {
          setChecked(false);
          modal.close();
        }}
        visible={modal.isOpen}
      >
        <p>
          <strong>제 1 장 총칙 제 1 조</strong>
          <br />
          (목적) 본 약관은 (주)셔틀러스(이하 “회사”라 합니다)가 운영하는
          웹사이트 ‘셔틀러스’ (www.shuttlers.gg) (이하 “웹사이트”라 합니다)에서
          제공하는 온라인 서비스(이하 “서비스”라 한다)를 이용함에 있어
          사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </Modal>
    </>
  );
}
