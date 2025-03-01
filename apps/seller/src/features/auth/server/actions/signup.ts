'use server';

import { z } from 'zod';
import { signUpFormSchema } from '@/features/auth/schemas';
import { uploadFileAndGetUrl } from '@/utils/file';
import { createClient } from '@/utils/supabase/server';
import { AuthResponse, User } from '@supabase/supabase-js';

interface SignUpResponse {
  data?: { userId: string };
  message: string;
}

export const signup = async (
  payload: z.infer<typeof signUpFormSchema>,
): Promise<SignUpResponse> => {
  const supabase = await createClient();

  const { data: authData, error: authError }: AuthResponse =
    await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

  if (authError) {
    const isAlreadyExists = authError.code === 'user_already_exists';
    if (isAlreadyExists) {
      return {
        message: '이미 가입된 이메일 입니다.',
      };
    }

    const user = authData?.user as User | null;
    if (!user?.id) {
      return {
        message: 'User ID is missing.',
      };
    }

    await supabase.auth.admin.deleteUser(user.id);
    return {
      message: '회원가입에 실패하였습니다. 다시 확인해주세요.',
    };
  }

  const authUserId = authData?.user?.id as string;
  if (!authUserId) {
    return { message: 'User ID is missing.' };
  }

  try {
    const businessLicenseUrl = await uploadFileAndGetUrl(
      payload.businessLicense,
      'business-documents',
    );

    const { error } = await supabase.rpc('register_seller', {
      auth_user_id: authUserId,
      email: payload.email,
      phone: payload.phone,
      name: payload.name,
      role: 'seller',
      business_name: payload.businessName,
      representative: payload.representative,
      business_number: payload.businessNumber,
      business_address: payload.businessAddress,
      business_license: businessLicenseUrl,
    });

    if (error) {
      await supabase.auth.admin.deleteUser(authUserId);
      return {
        message: '회원가입에 실패하였습니다. 다시 시도해주세요.',
      };
    }

    return {
      data: { userId: authUserId },
      message: '회원가입이 완료되었습니다.',
    };
  } catch (error) {
    await supabase.auth.admin.deleteUser(authUserId);
    return {
      message: '회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
