import { supabase } from '@/utils/supabase/client';
import { Product } from '@/features/products/types/products';

export const getProducts = async (): Promise<Product[]> => {
  const { data: products, error } = await supabase.from('products').select('*');

  console.log(products);
  if (error) {
    throw new Error(error.message);
  }

  return products;
};
