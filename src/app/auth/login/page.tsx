'use client';

import { LoginFormValues } from '@/@types/forms';
import LoginForm from '@/app/auth/login/LoginForm';
import Input from '@/components/Input/Input';
import Logo from '@/components/Logo/Logo';
import Modal from '@/components/Modal/Modal';
import useModal from '@/hooks/useModal';
import { supabase } from '@/libs/supabase/client';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { emailRules } from '@/utils/authValidation';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { AuthError } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './page.css';

type SendFormValues = {
  email: string;
};

export default function LoginPage() {
  const router = useRouter();
  const modal = useModal();
  const [step, setStep] = useState<1 | 2>(1);
  const loginMethods = useForm<LoginFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const sendMethods = useForm<SendFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const handleLogin = async (formData: LoginFormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword(formData);

    if (error)
      return toast.error(
        <>
          <b>로그인 실패!</b>
          <br />
          {error.status}: {error.message}
        </>
      );

    if (!data.user) return toast.error('확인되지 않은 사용자입니다.');

    const username = data.user.user_metadata?.username;

    toast.success(`어서 오세요, ${username}님!`);

    router.push('/');
  };

  const handleSendLink = async (formData: SendFormValues) => {
    const { data: userData, error: userError } = await supabase.auth.getUser(
      formData.email
    );

    if (!userData.user || userError)
      return new AuthError('확인되지 않은 사용자');

    const { error: sendError } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `auth/reset-password/${userData.user?.id}`,
      }
    );

    if (sendError) return new Error('인증 에러');

    setStep(2);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginHeader}>
        <Logo size="medium" />
        <h2 className="sr-only">로그인</h2>
        <p>
          환영합니다!
          <br />
          로그인 후 이용해주세요.
        </p>
      </div>

      <section>
        <FormProvider {...loginMethods}>
          <LoginForm onSubmitAction={handleLogin} />
        </FormProvider>

        <div className={styles.loginOptions}>
          {
            // TODO: 차후 시간 남으면 로그인유지도 구현
            /* <label
              htmlFor="keep-loggedin"
              style={{ display: 'flex', columnGap: 10 }}
              >
                <input type="checkbox" id="keep-loggedin" />
                로그인 유지
              </label> */
          }

          <button onClick={modal.open} className={styles.optionLink}>
            비밀번호 찾기
            <ArrowRightIcon width={16} height={16} />
          </button>
          <span style={{ display: 'flex', columnGap: 10 }}>
            셔틀러스 회원이 아니신가요?
            <Link href="/auth/register" className={styles.optionLink}>
              가입하기
              <ArrowRightIcon width={16} height={16} />
            </Link>
          </span>
        </div>
      </section>

      <form onSubmit={sendMethods.handleSubmit(handleSendLink)}>
        <Modal
          title={
            step === 1 ? '비밀번호를 잊으셨나요?🥲' : '이메일 전송 완료 ✅'
          }
          visible={modal.isOpen}
          variant="alert"
          confirmText={step === 1 ? '링크 요청' : '확인'}
          onConfirm={
            step === 1 ? sendMethods.handleSubmit(handleSendLink) : modal.close
          }
          onCancel={modal.close}
        >
          <div className={styles.resetForm}>
            {step === 1 ? (
              <>
                <p>
                  가입 시 등록한 이메일을 입력하시면
                  <br />
                  비밀번호 재설정 링크를 보내드립니다.
                </p>
                <Input
                  {...sendMethods.register('email', emailRules)}
                  name="email"
                  placeholder="이메일 입력"
                />
              </>
            ) : (
              <>
                <p>
                  {sendMethods.watch('email') ?? '입력한 주소'}로 이메일을
                  보냈습니다.
                  <br />
                  도착한 링크를 클릭해 비밀번호를 재설정해 주세요!
                </p>
                <span
                  style={{
                    ...textStyle.body.semibold,
                    color: tokens.color.text.caption,
                  }}
                >
                  링크는 5분 뒤 만료됩니다.
                </span>
              </>
            )}
          </div>
        </Modal>
      </form>
    </div>
  );
}
