import { z } from 'zod';
import { signUpFormSchema } from '@/features/auth/schemas';
import { uploadFileAndGetUrl } from '@/utils/file';
import { supabase } from '@/utils/supabase/client';

export const signup = async (payload: z.infer<typeof signUpFormSchema>) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
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
    return {
      message: '회원가입에 실패하였습니다. 다시 확인해주세요.',
    };
  }

  const authUserId = authData?.user?.id;
  if (!authUserId) {
    return { message: 'User ID is missing.' };
  }

  const businessLicenseUrl = await uploadFileAndGetUrl(
    payload.businessRegCert,
    'business-documents',
  );
  const idCardUrl = await uploadFileAndGetUrl(
    payload.idCard,
    'business-documents',
  );
  const { data, error } = await supabase.rpc('register_user', {
    auth_user_id: authUserId,
    email: payload.email,
    phone: payload.phone,
    name: payload.name,
    role: 'brand',
    business_name_kr: payload.brandNameKo,
    business_name_en: payload.brandNameEn,
    ceo_name: payload.ceoName,
    business_number: payload.businessNumber,
    business_address: payload.businessAddress,
    business_license: businessLicenseUrl,
    id_card: idCardUrl,
  });
};
