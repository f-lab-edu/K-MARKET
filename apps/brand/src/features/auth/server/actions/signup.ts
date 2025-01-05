import { supabase } from "@/utils/supabase/client.ts";
import { z } from "zod";
import { signUpFormSchema } from "@/features/auth/schemas";

export const signup = async (payload: z.infer<typeof signUpFormSchema>) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
  });
  if (authError) {
    console.error("Auth Error:", authError); // 개발자용 로그
    return {
      message:
        "회원가입에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요.",
    };
  }
  try {
    const userId = authData?.user?.id;
    if (!userId) {
      return { message: "User ID is missing." };
    }

    await registerUser(payload);
    await registerBrand(payload, userId);

    return { data: authData, message: "회원가입에 성공하였습니다." };
  } catch (error) {
    console.error("Registration Error:", error); // 개발자용 로그
    return {
      message:
        "회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
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
  const businessLicenseUrl = await uploadFile(payload.businessRegCert);
  const idCardUrl = await uploadFile(payload.idCard);

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

const uploadFile = async (file: File) => {
  if (!file) return null;

  const fileExt = file.name.split(".").pop(); // 파일 확장자 추출
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("business-documents")
    .upload(fileName, file);

  if (error) {
    throw new Error("파일 업로드 실패");
  }
  return supabase.storage
    .from("business-documents")
    .getPublicUrl(`${data!.path}`).data.publicUrl;
};
