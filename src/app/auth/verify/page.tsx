'use client';

import { useEffect } from 'react';

export default function VerifyPage() {
  useEffect(() => {
    window.localStorage.setItem('verified', 'true');
  }, []);

  return (
    <div>
      <p>
        이메일 인증 성공! <br />
        원래 창으로 돌아가 마저 가입을 진행해주세요.
      </p>
    </div>
  );
}
