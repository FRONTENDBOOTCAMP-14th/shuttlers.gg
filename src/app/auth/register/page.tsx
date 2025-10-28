'use client';

import type { RegisterFormValues } from '@/@types/forms';
import RegisterForm from '@/app/auth/register/RegisterForm';
import { supabase } from '@/libs/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './page.css';

export default function RegisterPage() {
  const router = useRouter();
  const methods = useForm<RegisterFormValues>({ mode: 'onChange' });
  const [step, setStep] = useState<1 | 2>(1);

  const handleRegister = async (formData: RegisterFormValues) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user || userError) {
        return toast.error('이메일 인증이 완료되지 않았습니다.');
      }

      const { error: upsertError } = await supabase.from('users').upsert(
        {
          id: user.id,
          email: user.email,
          name: formData.name,
          gender: formData.gender,
          national_grade: formData.national_grade,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'id',
        }
      );

      if (upsertError)
        return toast.error(
          `회원가입 요청에 실패했습니다.\n${upsertError.message}`
        );

      toast.success('회원가입 성공! \n로그인 화면으로 이동합니다.');
      await supabase.auth.signOut();

      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerHeader}>
        <h2>회원가입</h2>
        <p>
          {step === 1
            ? '계정 등록 후 다양한 기능들을 활용해 보세요.'
            : '회원님의 정보를 입력해주세요.'}
        </p>
      </div>
      <FormProvider {...methods}>
        <RegisterForm
          step={step}
          onSubmitAction={handleRegister}
          onClickNext={() => setStep(2)}
        />
      </FormProvider>
    </div>
  );
}
