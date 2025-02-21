import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    discount?: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

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
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
              {product.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">
              {discountedPrice.toLocaleString()}원
            </span>
            {product.discount && (
              <span className="text-sm text-gray-500 line-through">
                {product.price.toLocaleString()}원
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
