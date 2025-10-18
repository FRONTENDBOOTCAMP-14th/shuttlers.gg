'use client';

import type { LoginForm } from '@/@types/forms';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Logo from '@/components/Logo';
import { createClient } from '@/libs/supabase/client';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './page.css';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const methods = useForm<LoginForm>({
    mode: 'onChange',
  });

  const handleSubmit = async (formData: LoginForm) => {
    const { data, error } = await supabase.auth.signInWithPassword(formData);

    if (error)
      return toast.error(`로그인 실패!\n ${error.status}: ${error.message}`);

    if (!data.user) return toast.error('확인되지 않은 사용자입니다.');

    const name = data.user.user_metadata?.name;

    toast.success(`어서 오세요, ${name}님!`);
    router.push('/');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 24,
          alignItems: 'center',
        }}
      >
        <Logo size="medium" />
        <h2 className="sr-only">로그인</h2>
        <p
          style={{
            ...textStyle.heading.semibold,
            color: tokens.color.text.body,
            textAlign: 'center',
            marginBottom: 70,
          }}
        >
          환영합니다!
          <br />
          로그인 후 이용해주세요.
        </p>
      </div>

      <div className={styles.formContainer}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            autoComplete="off"
            noValidate
            className={styles.loginForm}
          >
            <Input name="email" type="email" placeholder="이메일 입력" />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호 입력 (8자 이상, 12자 이하)"
            />

            <Button text="로그인" type="submit" variant="primary" size="long" />
          </form>
        </FormProvider>

        <div className={styles.loginOptions}>
          <label
            htmlFor="keep-loggedin"
            style={{ display: 'flex', columnGap: 10 }}
          >
            <input type="checkbox" id="keep-loggedin" />
            로그인 유지
          </label>
          <span style={{ display: 'flex', columnGap: 10 }}>
            셔틀러스 회원이 아니신가요?
            <Link href="./register" className={styles.optionLink}>
              가입하기
              <ArrowRightIcon width={16} />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
