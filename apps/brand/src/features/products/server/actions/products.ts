import { z } from 'zod';
import { registerProductFormSchema } from '@/features/products/components/schemas';
import { supabase } from '@/utils/supabase/client';
import { Product } from '@/features/products/types/products';
import { formatDate } from '@/utils/date';
import { formatKRWPrice } from '@/utils/price';
/**
 * 상품 등록
 * **/
export const registerProduct = async (
  productData: z.infer<typeof registerProductFormSchema>,
) => {
  if (!productData) return;

  const { data, error } = await supabase.rpc('create-product', {
    category_id: Number(productData.category),
    name: productData.name,
    price: Number(productData.price),
    discount_price: Number(productData.discount_price),
    min_qty: Number(productData.min_qty),
    options: productData.useOptions && mapOptions(productData.options),
    images: [...productData.images, ...productData.details],
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const mapOptions = (
  options: z.infer<typeof registerProductFormSchema>['options'],
) => {
  return options.map((option) => {
    return {
      ...option,
      additional_price: Number(option.price),
    };
  });
};

/**
 * 상품 조회
 * **/

export const getProducts = async (): Promise<Product[]> => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories:category_id (name)');

  if (error) {
    throw new Error(error.message);
  }

  return Promise.all(
    products.map(async (product) => {
      return {
        ...product,
        category_name: product.categories.name,
        price: formatKRWPrice(product.price),
        created_at: formatDate(product.created_at),
        updated_at: formatDate(product.updated_at),
      };
    }),
  );
};
