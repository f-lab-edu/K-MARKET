'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { signInFormSchema } from '@/features/auth/schemas';
import { createClient } from '@/utils/supabase/server';

export const signIn = async (payload: z.infer<typeof signInFormSchema>) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/');
};
