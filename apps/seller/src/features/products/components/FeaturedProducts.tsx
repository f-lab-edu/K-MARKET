import React from 'react';
import { ProductCard } from './ProductCard';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: '프리미엄 티셔츠',
      price: 29000,
      image: '/images/product-1.jpg',
      discount: 20,
    },
    {
      id: 2,
      name: '캐주얼 데님 팬츠',
      price: 59000,
      image: '/images/product-2.jpg',
      discount: 15,
    },
    {
      id: 3,
      name: '클래식 스니커즈',
      price: 89000,
      image: '/images/product-3.jpg',
      discount: 30,
    },
    {
      id: 4,
      name: '가죽 크로스백',
      price: 129000,
      image: '/images/product-4.jpg',
      discount: 10,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">인기 상품</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
