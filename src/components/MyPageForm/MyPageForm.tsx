'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/libs/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as styles from './MyPageForm.css';

const schema = z
  .object({
    name: z.string().trim().min(1, '이름을 입력하세요').max(40),
    gender: z.enum(['male', 'female', 'other']).nullable().optional(),
    grade: z.enum(['초심', 'D', 'C', 'B', 'A']).nullable().optional(),
    password: z.string().min(8, '8자 이상').optional().or(z.literal('')),
    passwordConfirm: z.string().optional().or(z.literal('')),
  })
  .refine((v) => !v.password || v.password === v.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

type FormValues = z.infer<typeof schema>;

type MyPageFormProps = {
  userId: string;
};

export function MyPageForm({ userId }: MyPageFormProps) {
  const { id, name, email, gender, grade, loading, error, save, canEdit } =
    useUser(userId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name || '',
      gender: gender ?? null,
      grade: grade ?? null,
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  // 서버 값이 바뀌면 폼 초기화
  useEffect(() => {
    reset({
      name: name || '',
      gender: gender ?? null,
      grade: grade ?? null,
      password: '',
      passwordConfirm: '',
    });
  }, [name, gender, grade, reset]);

  const wGender = watch('gender');
  const wGrade = watch('grade');

  const onSubmit = handleSubmit(async (values) => {
    await save({
      name: values.name,
      gender: values.gender ?? null,
      grade: values.grade ?? null,
    });

    if (canEdit && values.password && values.password.length >= 8) {
      const { error: pwErr } = await supabase.auth.updateUser({
        password: values.password,
      });
      if (pwErr) console.error(pwErr);
    }

    reset({
      name: values.name,
      gender: values.gender ?? null,
      grade: values.grade ?? null,
      password: '',
      passwordConfirm: '',
    });
  });

  if (loading) return <div className={styles.Form}>불러오는 중…</div>;
  if (error) return <div className={styles.Form}>에러: {error}</div>;

  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      {/* 이름 */}
      <div className={styles.Item}>
        <div className={styles.ItemLabel}>이름</div>
        <div>
          <Input
            type="text"
            label="이름"
            placeholder="이름"
            {...register('name')}
          />
          {errors.name && (
            <div className={styles.errorText}>{errors.name.message}</div>
          )}
        </div>
      </div>

      {/* 성별 */}
      <div className={styles.Item}>
        <div className={styles.ItemLabel}>성별</div>
        <div className={styles.GenderButtonGroup}>
          {(['male', 'female', 'other'] as const).map((g) => (
            <Button
              key={g}
              text={g === 'male' ? '남성' : g === 'female' ? '여성' : '기타'}
              type="button"
              variant={wGender === g ? 'secondary' : 'dark'}
              rounded
              size="long"
              onClick={() => setValue('gender', g, { shouldDirty: true })}
            />
          ))}
        </div>
      </div>

      {/* 비밀번호 */}
      <div className={styles.Item}>
        <div className={styles.ItemLabel}>비밀번호</div>
        <Input
          type="password"
          label="비밀번호"
          placeholder="새 비밀번호"
          {...register('password')}
        />
        {errors.password && (
          <div className={styles.errorText}>{errors.password.message}</div>
        )}
      </div>
      <div className={styles.Item}>
        <div className={styles.ItemLabel}>비밀번호 확인</div>
        <Input
          type="password"
          label="비밀번호 확인"
          placeholder="새 비밀번호 확인"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <div className={styles.errorText}>
            {errors.passwordConfirm.message}
          </div>
        )}
      </div>

      {/* 급수 */}
      <div className={styles.itemFull}>
        <div className={styles.ItemLabel}>전국 급수</div>
        <div className={styles.GradeButtonGroup}>
          {(['초심', 'D', 'C', 'B', 'A'] as const).map((g) => (
            <Button
              key={g}
              text={g}
              type="button"
              variant={wGrade === g ? 'secondary' : 'dark'}
              rounded
              size="long"
              onClick={() => setValue('grade', g, { shouldDirty: true })}
            />
          ))}
        </div>
      </div>

      <Button
        text={isSubmitting ? '저장 중…' : '변경 완료'}
        type="submit"
        variant="primary"
        disabled={!canEdit || !isDirty || isSubmitting}
      />
      {!canEdit && (
        <div className={styles.helperText}>본인 정보만 수정할 수 있습니다.</div>
      )}
    </form>
  );
}
