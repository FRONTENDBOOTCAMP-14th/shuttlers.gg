'use client';

import Button from '@/components/Button/Button';
import { supabase } from '@/libs/supabase/client';
import { EmailOtpType } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as styles from './page.css';

function Verify() {
  const router = useRouter();
  const params = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const handleVerify = async () => {
      const tokenHash = params.get('token_hash');
      const type = params.get('type');

      if (!tokenHash || !type) {
        setIsVerifying(false);
        return toast.error('잘못된 인증입니다.');
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as EmailOtpType,
        });

        if (error) {
          setIsVerifying(false);
          return toast.error(`인증 실패: ${error.message}`);
        }

        if (data.session) {
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          });

          toast.success('이메일 인증 성공!');

          setTimeout(() => {
            window.close();

            setTimeout(() => {
              router.push('/auth/register');
            }, 500);
          }, 1500);
        }
      } catch (err) {
        toast.error('인증 오류 발생');
        console.error(err);
        setIsVerifying(false);
      }
    };

    handleVerify();
  }, [params, router]);

  return (
    <div className={styles.verifyPage}>
      {isVerifying ? (
        <>
          <div className={styles.statusIcon}>✉️</div>
          <h2>이메일 인증 중입니다...</h2>
          <p>
            잠시만 기다려주세요.
            <br />
            인증 완료 후 이 창을 닫아주세요.
          </p>
        </>
      ) : (
        <>
          <div className={styles.statusIcon}>❌</div>
          <h2>인증 실패</h2>
          <p>
            인증 링크가 만료되었거나 잘못되었습니다.
            <br />
            회원가입 페이지에서 다시 시도해주세요.
          </p>
          <Button
            text="회원가입 페이지로"
            variant="secondary"
            onClick={() => router.push('/auth/register')}
          />
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.verifyPage}>
          <div className={styles.statusIcon}>⏳</div>
          <h2>로딩 중...</h2>
        </div>
      }
    >
      <Verify />
    </Suspense>
  );
}
