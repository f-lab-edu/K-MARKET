import { supabase } from "@/utils/supabase/client.ts";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInFormSchema } from "@/features/auth/schemas";

export const signIn = async (data: z.infer<typeof signInFormSchema>) => {
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error;
  }
  redirect("/");
};
