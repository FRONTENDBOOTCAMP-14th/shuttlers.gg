'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { passwordCheck, passwordRules } from '@/utils/authValidation';
import { useForm } from 'react-hook-form';
import * as styles from './page.css';

type ResetFormValues = {
  password: string;
  password_check: string;
};

export default function ResetPasswordPage() {
  const resetMethods = useForm<ResetFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleResetPassword = async () => {};

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.resetPasswordHeader}>
        <h2>비밀번호 재설정</h2>
        <p>' ' 계정의 비밀번호를 재설정합니다.</p>
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
            passwordCheck(
              resetMethods.watch('password'),
              resetMethods.watch('password_check')
            )
          )}
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
        />

        <Button type="submit" text="완료" size="long" />
      </form>
    </div>
  );
}
