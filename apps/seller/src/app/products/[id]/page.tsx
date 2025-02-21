import DetailImages from '@/features/products/components/DetailImages';
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

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 이미지 갤러리 */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={
                product.images.find((img) => img.type === 'main')?.image_url ??
                product.images[0]?.image_url ??
                ''
              }
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images
              .filter((img) => img.type === 'normal')
              .map((img, idx) => (
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

        {/* 상품 정보 */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* 가격 정보 */}
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

          {/* 구매 버튼 */}
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
      </div>

      {/* 상품 상세 이미지 */}
      <DetailImages images={product.images} productName={product.name} />
    </div>
  );
};

export default ProductPage;
