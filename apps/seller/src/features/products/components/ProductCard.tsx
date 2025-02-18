import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">
              {product.discount_price ? product.discount_price : product.prices}
              원
            </span>
            {product.discount_price && (
              <span className="text-sm text-gray-500 line-through">
                {product.prices}원
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
