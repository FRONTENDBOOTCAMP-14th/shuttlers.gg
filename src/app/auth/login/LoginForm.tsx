'use client';

import type { LoginFormValues } from '@/@types/forms';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { emailRules, passwordRules } from '@/utils/authValidation';
import { useFormContext } from 'react-hook-form';
import * as styles from './LoginForm.css';

type LoginFormProps = {
  onSubmitAction: (formData: LoginFormValues) => void;
};

export default function LoginForm({ onSubmitAction }: LoginFormProps) {
  const { handleSubmit, register } = useFormContext<LoginFormValues>();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitAction)}
        autoComplete="off"
        noValidate
        className={styles.loginForm}
      >
        <Input
          {...register('email', emailRules)}
          type="email"
          placeholder="이메일 입력"
        />
        <Input
          {...register('password', passwordRules)}
          type="password"
          placeholder="비밀번호 입력 (8자 이상 12자 이하)"
        />

        <Button text="로그인" type="submit" variant="primary" size="long" />
      </form>
    </>
  );
}
