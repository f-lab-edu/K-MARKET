import { z } from 'zod';
import { registerProductFormSchema } from '@/features/products/components/schemas';
import { supabase } from '@/utils/supabase/client';
import { Product } from '@/features/products/types/products';
import { formatDate } from '@/utils/date';
import { formatKRWPrice } from '@/utils/price';
import { uploadFileAndGetUrl } from '@/utils/file';

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
    options: productData.useOptions ? mapOptions(productData.options) : null,
    images: [
      ...(await mapImages(productData.images)),
      ...(await mapImages(productData.details)),
    ],
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const mapImages = async (
  images: z.infer<typeof registerProductFormSchema>['details' | 'images'],
) => {
  return await Promise.all(
    images.map(async (image, index) => {
      if (!image.file) return;
      return {
        image_url: await uploadFileAndGetUrl(image.file, 'products'),
        sort_order: index,
        type: image.type,
      };
    }),
  );
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
    .select(
      `
    *,
    prices:product_prices(price, discount_price, min_qty),
    categories(name),
    images:product_images(image_url, type)
  `,
    )
    .eq('images.type', 'main'); // type이 'main'인 것만 필터링

  if (error) {
    throw new Error(error.message);
  }

  return Promise.all(
    products.map(async (product) => {
      return {
        ...product,
        category_name: product.categories.name,
        price: formatKRWPrice(product.prices[0].price),
        discount_price: formatKRWPrice(product.prices[0].discount_price),
        min_qty: product.prices[0].min_qty,
        image: product.images[0].image_url,
        created_at: formatDate(product.created_at),
        updated_at: formatDate(product.updated_at),
      };
    }),
  );
};
