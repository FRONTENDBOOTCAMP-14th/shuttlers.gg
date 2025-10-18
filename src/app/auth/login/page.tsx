'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { Logo } from '@/components/Logo';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import * as styles from './page.css';

export default function LoginPage() {
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
        <form className={styles.loginForm}>
          <Input type="email" placeholder="이메일 입력" />
          <Input
            type="password"
            placeholder="비밀번호 입력 (8자 이상, 12자 이하)"
          />

          <Button text="로그인" type="submit" variant="primary" size="long" />
        </form>

        <div className={styles.loginOptions}>
          <a className={styles.optionLink} href="#">
            비밀번호 찾기
            <ArrowRightIcon width={16} />
          </a>
          <span style={{ display: 'flex', columnGap: 10 }}>
            셔틀러스 회원이 아니신가요?
            <a className={styles.optionLink} href="#">
              가입하기
              <ArrowRightIcon width={16} />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
