import { RegisterFormValues, type Profile } from '@/@types/forms';
import { Status } from '@/@types/global';
import Terms from '@/app/auth/login/Terms';
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

export default function RegisterForm({
  step,
  onClickNext,
  onSubmitAction,
}: RegisterFormProps) {
  const { handleSubmit, register, setValue, trigger, watch, formState } =
    useFormContext<RegisterFormValues>();
  const modal = useModal();

  const [gender, setGender] = useState<Profile['gender']>();
  const [grade, setGrade] = useState<Profile['national_grade']>();
  const [status, setStatus] = useState<Status>('idle');
  const [sendCool, setSendCool] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    register('gender', { required: '성별을 선택해주세요.' });
    register('national_grade', { required: '급수를 선택해주세요.' });
  }, [register]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setStatus('resolved');
          toast.success('이메일 인증 완료!');
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSendOtp = async () => {
    try {
      if (sendCool > 0) return toast(`${sendCool}초 후 다시 시도해주세요.`);

      const email = watch('email');
      if (!email) return toast.error('이메일을 입력해주세요.');

      const { data: exstingUser } = await supabase
        .from('users')
        .select('name, gender, national_grade')
        .eq('email', email)
        .maybeSingle();

      if (exstingUser) {
        const isCompleted =
          exstingUser?.name &&
          exstingUser?.gender &&
          exstingUser?.national_grade;

        if (isCompleted) {
          return toast.error('이미 가입된 이메일입니다.');
        } else {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email,
          });

          if (!resendError) {
            setSendCool(30);
            const timer = setInterval(() => {
              setSendCool((prev) => {
                if (prev <= 1) {
                  clearInterval(timer);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);

            return toast.success(
              `인증 메일 발송 완료!\n수신한 메일에서 링크를 클릭해 주세요.`
            );
          }
        }
      }

      const tempPassword = crypto.randomUUID();

      const { error } = await supabase.auth.signUp({
        email,
        password: tempPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify?next=/auth/register`,
        },
      });

      if (error) {
        if (formState.errors.email) {
          return toast.error('이메일 유형을 확인해주세요.');
        }
        return toast.error(`인증 메일 발송 실패\n${error.message}`);
      }

      setStatus('pending');
      setSendCool(30);
      const timer = setInterval(() => {
        setSendCool((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return toast.success(
        `인증 메일 발송 완료!\n수신한 메일에서 링크를 클릭해 주세요.`
      );
    } catch (e) {
      console.error(e);
      toast.error(`인증 메일 발송 실패\n${e}`);
    }
  };

  const handleStepNext = async () => {
    const isValid = await trigger(['email', 'password', 'password_check']);

    if (!isValid) {
      const firstError = Object.values(formState.errors)[0];
      return toast.error(firstError?.message || '입력값을 확인해주세요.');
    }

    if (status !== 'resolved') {
      return toast.error('이메일 인증을 완료해주세요.');
    }

    await supabase.auth.updateUser({
      password: watch('password'),
    });

    onClickNext();
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
              buttonAction={handleSendOtp}
            />

            <Input
              {...register('password', passwordRules)}
              name="password"
              type="password"
              label="비밀번호"
              placeholder="8자 이상 12자 이하"
              minLength={8}
              maxLength={12}
              required
            />
            <Input
              {...register('password_check', passwordCheck(watch('password')))}
              name="password_check"
              type="password"
              label="비밀번호 확인"
              placeholder="8자 이상 12자 이하"
              minLength={8}
              maxLength={12}
              required
            />

            <Button
              type="button"
              text="다음으로"
              variant="primary"
              size="long"
              onClick={handleStepNext}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Input
              {...register('name', nameRules)}
              name="name"
              type="text"
              label="이름"
              placeholder="실명을 입력해주세요."
              minLength={2}
              required
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
              <button
                type="button"
                className={styles.optionLink}
                onClick={modal.open}
              >
                개인정보 수집 및 이용 약관
              </button>
              에 동의합니다.
            </div>

            <Button
              type="submit"
              text="가입 완료"
              variant="primary"
              size="long"
              disabled={!checked || !gender || !grade}
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
        <Terms />
      </Modal>
    </>
  );
}
