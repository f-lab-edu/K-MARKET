import { z } from 'zod';
import { supabase } from '@/utils/supabase/client';
import {
  Product,
  ProductDetail,
  ProductWithRelations,
} from '../../types/products';

export const getProducts = async (): Promise<Product[]> => {
  const { data: products, error } = await supabase.from('products').select(`
    *,
    prices:product_prices(
      price,
      discount_price,
      min_qty
    ),
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

  return typedProducts.map(
    (product): Product => ({
      id: product.id,
      name: product.name,
      prices: product.prices[0]?.price ?? 0,
      discount_price: product.prices[0]?.discount_price ?? 0,
      image: mainImagesMap.get(product.id) ?? '',
    }),
  );
};

export const getProduct = async (id: string): Promise<ProductDetail> => {
  const { data: product, error } = await supabase
    .from('products')
    .select(
      `
    *,
    prices:product_prices(price, discount_price, min_qty),
    categories(name),
    images:product_images(image_url, type),
    options:product_options(id, name, additional_price)
  `,
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!product) {
    throw new Error('Product not found');
  }

  return {
    id: product.id,
    name: product.name,
    prices: product.prices[0]?.price ?? 0,
    discount_price: product.prices[0]?.discount_price ?? 0,
    min_qty: product.prices[0]?.min_qty ?? 0,
    images: product.images,
    options: product.options,
  };
};
