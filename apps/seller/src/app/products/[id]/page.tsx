import { getProduct } from '@/features/products/server/actions/products';
import React from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const product = await getProduct(id);
  return <div className="max-w-screen-xl mx-auto"></div>;
};

export default ProductPage;
