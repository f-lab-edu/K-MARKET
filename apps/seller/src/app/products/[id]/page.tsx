import DetailImages from '@/features/products/components/DetailImages';
import ProductDetailContents from '@/features/products/components/ProductDetailContents';
import { getProduct } from '@/features/products/server/actions/products';
import { ProductDetail } from '@/features/products/types/products';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params;
  const product = (await getProduct(id)) as ProductDetail;

  return <ProductDetailContents product={product} />;
};

export default ProductPage;
