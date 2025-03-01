'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { signInFormSchema } from '@/features/auth/schemas';
import { createClient } from '@/utils/supabase/server';

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const signIn = async (payload: z.infer<typeof signInFormSchema>) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    throw new AuthError(error.message);
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (!userData) {
    throw new AuthError('User not found');
  }

  if (userData?.role === 'brand') {
    await supabase.auth.signOut();
    throw new AuthError('브랜드 계정은 로그인할 수 없습니다');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};
