import { RegisterFormValues, type Profile } from '@/@types/forms';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as styles from './RegisterForm.css';

type RegisterFromProps = {
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
}: RegisterFromProps) {
  const { handleSubmit, register, setValue } =
    useFormContext<RegisterFormValues>();

  const [gender, setGender] = useState<Profile['gender']>();
  const [grade, setGrade] = useState<Profile['national_grade']>();
  const [checked, setChecked] = useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitAction)}
        className={styles.registerForm}
      >
        {step === 1 && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <Input
                {...(register('email'), { required: true })}
                type="email"
                label="이메일(아이디)"
                placeholder="이메일 입력"
              />
              <Button text="인증하기" variant="secondary" />
            </div>
            <Input
              {...(register('password'), { required: true })}
              type="password"
              label="비밀번호"
              placeholder="8자 이상 12자 이하"
            />
            <Input
              {...(register('password_check'), { required: true })}
              type="password"
              label="비밀번호 확인"
              placeholder="8자 이상 12자 이하"
            />
            <Button
              type="button"
              text="다음으로"
              variant="primary"
              size="long"
              onClick={onClickNext}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Input
              {...(register('name'), { required: true })}
              type="text"
              label="이름"
              placeholder="실명을 입력해주세요."
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
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
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
              disabled={!checked}
            />
          </>
        )}
      </form>
    </>
  );
}
