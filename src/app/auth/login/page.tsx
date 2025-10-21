'use client';

import { LoginFormValues } from '@/@types/forms';
import LoginForm from '@/app/auth/login/LoginForm';
import Logo from '@/components/Logo/Logo';
import { supabase } from '@/libs/supabase/client';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './page.css';

export default function LoginPage() {
  const router = useRouter();
  const methods = useForm<LoginFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
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
        <FormProvider {...methods}>
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

          <Link href="#" className={styles.optionLink}>
            비밀번호 찾기
            <ArrowRightIcon width={16} />
          </Link>
          <span style={{ display: 'flex', columnGap: 10 }}>
            셔틀러스 회원이 아니신가요?
            <Link href="./register" className={styles.optionLink}>
              가입하기
              <ArrowRightIcon width={16} />
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}
