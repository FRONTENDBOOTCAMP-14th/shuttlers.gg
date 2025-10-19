import { createClient } from '@/libs/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: '인증되지 않은 유저' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: '유저 정보 불러오기 실패' },
      { status: 500 }
    );
  }

  return NextResponse.json({ user: data });
}
