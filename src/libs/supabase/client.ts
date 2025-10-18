import { createBrowserClient } from '@supabase/ssr';
import {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../database.types';

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export type Users = Tables<'users'>;
export type UsersInsert = TablesInsert<'users'>;
export type UsersUpdate = TablesUpdate<'users'>;
