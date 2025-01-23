import { supabase } from "@/utils/supabase/client";
import { Category } from "@/features/products/types/categories";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const findCategory = async (id: number): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data?.[0] || null;
};
