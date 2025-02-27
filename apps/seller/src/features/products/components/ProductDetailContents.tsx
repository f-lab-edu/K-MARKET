'use client';

import { ProductDetail } from '@/features/products/types/products';
import { MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductDetailContentsProps {
  product: ProductDetail;
}
const ProductDetailContents = ({ product }: ProductDetailContentsProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <DetailImages product={product} />
    </div>
  );
};

export default ProductDetailContents;

const ImageGallery = ({ product }: { product: ProductDetail }) => {
  const mainImage = product.images.find((img) => img.type === 'main');
  const previewImages = product.images.filter((img) => img.type === 'normal');
  return (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <Image
          src={mainImage?.image_url ?? ''}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {previewImages.map((img, idx) => (
          <div
            key={idx}
            className="aspect-square relative rounded-lg overflow-hidden"
          >
            <Image
              src={img.image_url}
              alt={`${product.name} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductInfo = ({ product }: { product: ProductDetail }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            ₩
            {product.discount_price?.toLocaleString() ??
              product.prices.toLocaleString()}
          </span>
          {product.discount_price && (
            <span className="text-lg text-gray-500 line-through">
              ₩{product.prices.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">
          최소 주문 수량: {product.min_qty}개
        </p>
      </div>

      {/* 옵션 선택 */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            옵션 선택
          </label>
          <select className="w-full border border-gray-300 rounded-md py-2 px-3">
            <option value="">옵션을 선택해주세요</option>
            {product.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} (+₩{option.additional_price.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex gap-4">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
          구매하기
        </button>
        <button className="flex-1 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition">
          장바구니
        </button>
        <button className="w-14 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export const DetailImages = ({ product }: { product: ProductDetail }) => {
  const [showAll, setShowAll] = useState(false);
  const detailImages = product.images.filter((img) => img.type === 'detail');
  const displayImages = showAll ? detailImages : detailImages.slice(0, 2);

  if (detailImages.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">상품 상세정보</h2>
      <div className="space-y-4">
        {displayImages.map((img, idx) => (
          <div key={idx} className="relative">
            <Image
              src={img.image_url}
              alt={`${product.name} 상세이미지 ${idx + 1}`}
              width={1200}
              height={800}
              className="w-full rounded-lg"
            />
          </div>
        ))}
        {!showAll && detailImages.length > 2 && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-4 border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-600"
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
};
