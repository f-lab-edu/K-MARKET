import { supabase } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

import { z } from 'zod';
import { signInFormSchema } from '@/features/auth/schemas';

export const signIn = async (payload: z.infer<typeof signInFormSchema>) => {
  const { data, error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    return error;
  }

  supabase.auth.setSession({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
  redirect('/');
};
