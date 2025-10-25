'use client';

import { supabase } from '@/libs/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function VerifyPage() {
  const params = useSearchParams();
  const tokenHash = params.get('token_hash');
  const type = params.get('type');

  useEffect(() => {
    const handleVerify = async () => {
      if (!tokenHash || !type) return;

      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as any,
      });

      if (error) return toast.error(`인증 실패: ${error.message}`);
      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        toast.success('이메일 인증 성공!');
      }
    };

    handleVerify();
  }, [tokenHash, type]);

  return (
    <div>
      <p>
        이메일 인증 중입니다. <br />
        완료 후 창을 닫아주세요.
      </p>
    </div>
  );
}
