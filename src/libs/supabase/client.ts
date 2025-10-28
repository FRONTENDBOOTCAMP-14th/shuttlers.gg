import { createBrowserClient } from '@supabase/ssr';
import { Database, Tables } from '../database.types';

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    }
  );
};

export const supabase = createClient();

export type Users = Tables<'users'>;
export type Tournaments = Tables<'bk_tournaments'>;
export type Players = Tables<'players'>;
