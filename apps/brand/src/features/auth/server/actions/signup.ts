import { supabase } from "@/utils/supabase/client";
import { z } from "zod";
import { signUpFormSchema } from "@/features/auth/schemas";
import { uploadFileAndGetUrl } from "@/utils/file";

export const signup = async (payload: z.infer<typeof signUpFormSchema>) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });
  if (authError) {
    const isAlreadyExists = authError.code === "user_already_exists";
    if (isAlreadyExists) {
      return {
        message: "이미 가입된 이메일 입니다.",
      };
    }
    return {
      message: "회원가입에 실패하였습니다. 다시 확인해주세요.",
    };
  }

  const userId = authData?.user?.id;
  if (!userId) {
    return { message: "User ID is missing." };
  }

  const userData = await Promise.all([
    registerUser(payload),
    registerBrand(payload, userId),
  ]);

  const isError = userData.some((result) => !result.data);
  if (isError && userId) {
    await supabase.auth.admin.deleteUser(userId);
    return {
      message: "회원가입에 실패하였습니다. 다시 확인해주세요",
    };
  }

  return { data: authData, message: "회원가입에 성공하였습니다." };
};

const registerUser = async (payload: z.infer<typeof signUpFormSchema>) => {
  const { data, error } = await supabase.from("users").insert({
    email: payload.email,
    password: payload.password,
    name: payload.name,
    phone: payload.phone,
    role: "brand",
  });
  return { data, error };
};

const registerBrand = async (
  payload: z.infer<typeof signUpFormSchema>,
  id: string,
) => {
  const businessLicenseUrl = await uploadFileAndGetUrl(
    payload.businessRegCert,
    "business-documents",
  );
  const idCardUrl = await uploadFileAndGetUrl(
    payload.idCard,
    "business-documents",
  );

  const { data, error } = await supabase.from("brands").insert({
    id: id,
    business_name_kr: payload.brandNameKo,
    business_name_en: payload.brandNameEn,
    ceo_name: payload.ceoName,
    business_number: payload.businessNumber,
    business_address: payload.businessAddress,
    business_license: businessLicenseUrl,
    id_card: idCardUrl,
  });
  return { data, error };
};
