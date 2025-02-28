'use server';

import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';

interface CustomerUser extends User {
  brand_id: number;
  created_at: string;
  email: string;
  id: string;
  name: string;
  password: string;
  phone: string;
  role: string;
}

export async function getCurrentUser(): Promise<CustomerUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Error fetching user:', error);
    return null;
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!userData) {
    return null;
  }

  return userData as CustomerUser;
}
