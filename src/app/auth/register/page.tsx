'use client';

import type { Profile, RegisterForm } from '@/@types/forms';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/libs/supabase/client';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as styles from './page.css';

export default function RegisterPage() {
  const router = useRouter();
  const methods = useForm<RegisterForm>({ mode: 'onChange' });
  const [step, setStep] = useState<1 | 2>(1);
  const [gender, setGender] = useState<Profile['gender']>();
  const [grade, setGrade] = useState<Profile['national_grade']>();
  const [checked, setChecked] = useState(false);

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            namd: formData.name,
            gender,
            grade,
          },
        },
      });

      if (error)
        return toast.error(
          `인증 오류 발생\n ${error.status}: ${error.message}`
        );
      if (!data.user) return;

      const { error: registerError } = await supabase.from('users').insert({
        id: data.user.id,
        email: formData.email,
        name: formData.name,
        gender: formData.gender,
        national_grade: formData.national_grade,
        created_at: new Date().toISOString(),
      });

      if (registerError)
        return toast.error(
          `회원가입 요청에 실패했습니다.\n ${registerError.code}: ${registerError.message}`
        );

      toast.success('회원가입 성공!\n로그인 화면으로 이동합니다.');
      router.push('./login');
    } catch (err) {
      console.error(err);
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleEmailAuth = () => {};

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 24,
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <h2 style={{ ...textStyle.subtitle.bold }}>회원가입</h2>
        <p
          style={{
            ...textStyle.heading.semibold,
            color: tokens.color.text.body,
            textAlign: 'center',
            marginBottom: 70,
          }}
        >
          {step === 1
            ? '계정 등록 후 다양한 기능들을 활용해 보세요.'
            : '회원님의 정보를 입력해주세요.'}
        </p>
      </div>

      <div style={{ width: '100%' }}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleRegister)}
            className={styles.registerForm}
          >
            {step === 1 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    columnGap: 12,
                  }}
                >
                  <Input
                    type="email"
                    name="email"
                    label="이메일(아이디)"
                    placeholder="이메일 입력"
                  />
                  <Button
                    text="인증하기"
                    variant="secondary"
                    onClick={handleEmailAuth}
                  />
                </div>
                <Input
                  type="password"
                  name="password"
                  label="비밀번호"
                  placeholder="8자 이상 12자 이하"
                />
                <Input
                  type="password"
                  name="password-check"
                  label="비밀번호 확인"
                  placeholder="8자 이상 12자 이하"
                />
                <Button
                  text="다음으로"
                  variant="primary"
                  size="long"
                  onClick={() => setStep(2)}
                />
              </>
            )}
            {step === 2 && (
              <>
                <Input
                  type="text"
                  name="name"
                  label="이름"
                  placeholder="실명을 입력해주세요."
                />
                <div
                  style={{
                    ...textStyle.heading.semibold,
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 12,
                    color: tokens.color.text.body,
                  }}
                >
                  <span>성별</span>
                  <div style={{ display: 'flex', columnGap: 10 }}>
                    <Button
                      text="남성"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGender('male')}
                    />
                    <Button
                      text="여성"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGender('female')}
                    />
                  </div>
                </div>
                <div
                  style={{
                    ...textStyle.heading.semibold,
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 12,
                    color: tokens.color.text.body,
                  }}
                >
                  <span>급수</span>
                  <div style={{ display: 'flex', columnGap: 10 }}>
                    <Button
                      text="초심"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGrade('초심')}
                    />
                    <Button
                      text="D"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGrade('D')}
                    />
                    <Button
                      text="C"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGrade('C')}
                    />
                    <Button
                      text="B"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGrade('B')}
                    />
                    <Button
                      text="A"
                      variant="dark"
                      size="long"
                      rounded
                      onClick={() => setGrade('A')}
                    />
                  </div>
                </div>

                <label
                  htmlFor="agree"
                  style={{
                    ...textStyle.body.regular,
                    color: tokens.color.text.caption,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    columnGap: 10,
                    marginTop: 16,
                  }}
                >
                  <input
                    type="checkbox"
                    id="agree"
                    onChange={() => setChecked((prev) => !prev)}
                  />
                  <button className={styles.optionLink}>
                    개인정보 수집 및 이용 약관
                  </button>
                  에 동의합니다.
                </label>

                <Button
                  type="submit"
                  text="가입 완료"
                  variant="primary"
                  size="long"
                  onClick={() => setStep(2)}
                  disabled={!checked}
                />
              </>
            )}
          </form>
        </FormProvider>
      </div>
    </>
  );
}
