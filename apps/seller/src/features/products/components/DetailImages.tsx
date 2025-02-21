'use client';

import { ProductImage } from '@/features/products/types/products';
import Image from 'next/image';
import { useState } from 'react';

interface DetailImagesProps {
  images: ProductImage[];
  productName: string;
}

export default function DetailImages({
  images,
  productName,
}: DetailImagesProps) {
  const [showAll, setShowAll] = useState(false);
  const detailImages = images.filter((img) => img.type === 'detail');
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
              alt={`${productName} 상세이미지 ${idx + 1}`}
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
}
