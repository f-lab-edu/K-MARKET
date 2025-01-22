import { supabase } from "@/utils/supabase/client";

export const uploadFileAndGetUrl = async (file: File, bucketName: string) => {
  if (!bucketName) return null;
  if (!file) return null;

  const fileExt = file.name.split(".").pop(); // 파일 확장자 추출
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }
  return supabase.storage.from(bucketName).getPublicUrl(`${data!.path}`).data
    .publicUrl;
};
