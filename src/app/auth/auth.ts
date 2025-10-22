import type { LoginForm } from '@/@types/forms';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient();

export const handleLogin = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error)
    return toast.error(`로그인 실패!\n ${error.status}: ${error.message}`);

  if (!data.user) return toast.error('확인되지 않은 사용자입니다.');

  const name = data.user.user_metadata?.name;

  toast.success(`어서 오세요, ${name}님!`);
  router.push('/');
};
