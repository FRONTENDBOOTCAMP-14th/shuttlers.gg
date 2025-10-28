'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/libs/supabase/client';
import { passwordCheck, passwordRules } from '@/utils/authValidation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './page.css';

type ResetFormValues = {
  password: string;
  password_check: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetMethods = useForm<ResetFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        toast.error('세션이 만료되었습니다. 다시 시도해주세요.');
        router.push('/auth/login');
        return;
      }

      setEmail(data.session.user.email || '사용자');
    };

    getSession();
  }, [router]);

  const handleResetPassword = async (formData: ResetFormValues) => {
    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (updateError) {
        throw updateError;
      }

      toast.success(`비밀번호 변경 완료!\n새로운 비밀번호로 로그인해주세요.`);
      await supabase.auth.signOut();

      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (e) {
      const error = e as { message?: string; code?: string };

      if (error.message?.includes('same as the old password')) {
        return toast.error('이전 비밀번호와 동일합니다.');
      } else if (error.message?.includes('weak password')) {
        return toast.error('비밀번호는 8자 이상 12자 이하로 설정해주세요.');
      }

      toast.error('비밀번호 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.resetPasswordHeader}>
        <h2>비밀번호 재설정</h2>
        <p>{`${email} 계정의 비밀번호를 재설정합니다.`}</p>
      </div>
      <form
        onSubmit={resetMethods.handleSubmit(handleResetPassword)}
        className={styles.resetForm}
      >
        <Input
          {...resetMethods.register('password', passwordRules)}
          type="password"
          label="새 비밀번호"
          placeholder="비밀번호 입력 (8자 이상 12자 이하)"
        />
        <Input
          {...resetMethods.register(
            'password_check',
            passwordCheck(resetMethods.watch('password'))
          )}
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
        />

        <Button
          type="submit"
          text={isLoading ? '변경 중...' : '완료'}
          size="long"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
