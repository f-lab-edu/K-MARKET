import { z } from 'zod';
import { registerProductFormSchema } from '@/features/products/components/schemas';
import { supabase } from '@/utils/supabase/client';
import {
  Product,
  ProductWithRelations,
} from '@/features/products/types/products';
/**
 * 상품 등록
 * **/
export const registerProduct = async (
  productData: z.infer<typeof registerProductFormSchema>,
) => {
  if (!productData) return;

  const { data, error } = await supabase.rpc('create_product', {
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
  const { data: products, error } = await supabase.from('products').select(`
    *,
    prices:product_prices(
      price,
      discount_price,
      min_qty
    ),
    categories(name),
    images:product_images(
      image_url,
      type
    )
  `);

  if (error) {
    throw new Error(`상품 조회 중 오류가 발생했습니다: ${error.message}`);
  }

  if (!products) {
    return [];
  }

  const typedProducts = products as ProductWithRelations[];

  const mainImagesMap = new Map(
    typedProducts.flatMap((product) =>
      product.images
        .filter((image) => image.type === 'main')
        .map((image) => [product.id, image.image_url]),
    ),
  );

  const mapProducts = typedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category_name: product.categories.name,
    price: product.prices[0]?.price ?? 0,
    discount_price: product.prices[0]?.discount_price ?? 0,
    min_qty: product.prices[0]?.min_qty ?? 0,
    image: mainImagesMap.get(product.id) ?? '',
    created_at: product.created_at,
    updated_at: product.updated_at,
  }));

  console.log('mapProducts', mapProducts);
  return mapProducts;
};
