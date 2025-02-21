import { z } from 'zod';
import { supabase } from '@/utils/supabase/client';

/**
 * 상품 상세 조회
 * **/

export const getProduct = async (id: string): Promise<any> => {
  const { data: product, error } = await supabase
    .from('products')
    .select(
      `
    *,
    prices:product_prices(price, discount_price, min_qty),
    categories(name),
    images:product_images(image_url, type)
  `,
    )
    .eq('id', id)
    .single();
  //TODO : return type 정하기
};
