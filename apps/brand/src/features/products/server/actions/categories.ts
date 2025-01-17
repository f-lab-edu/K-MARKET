import { supabase } from "@/utils/supabase/client";
import { Category } from "@/features/products/types/categories";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
