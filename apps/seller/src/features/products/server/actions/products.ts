import { z } from 'zod';
import { supabase } from '@/utils/supabase/client';
import {
  Product,
  ProductWithFullRelations,
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

export const getProduct = async (id: string): Promise<Product> => {
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

  if (error) {
    throw new Error(error.message);
  }

  if (!product) {
    throw new Error('Product not found');
  }

  const typedProduct = product as ProductWithFullRelations;

  const mainImage = typedProduct.images.find((image) => image.type === 'main');

  return {
    id: typedProduct.id,
    name: typedProduct.name,
    prices: typedProduct.prices[0]?.price ?? 0,
    discount_price: typedProduct.prices[0]?.discount_price ?? 0,
    image: mainImage?.image_url ?? '',
  };
};
