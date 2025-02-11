import { supabase } from '@/utils/supabase/client';

export const getProducts = async (): Promise<any[]> => {
  const { data: products, error } = await supabase.from('products').select('*');

  console.log(products);
  if (error) {
    throw new Error(error.message);
  }

  return products;
};
