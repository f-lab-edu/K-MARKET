import React from 'react';
import Link from 'next/link';

const CategorySection = () => {
  const categories = [
    { id: 1, name: '의류', icon: '👕', path: '/categories/clothing' },
    { id: 2, name: '신발', icon: '👟', path: '/categories/shoes' },
    { id: 3, name: '가방', icon: '👜', path: '/categories/bags' },
    { id: 4, name: '액세서리', icon: '💍', path: '/categories/accessories' },
    { id: 5, name: '디지털', icon: '📱', path: '/categories/digital' },
    { id: 6, name: '스포츠', icon: '⚽', path: '/categories/sports' },
    { id: 7, name: '뷰티', icon: '💄', path: '/categories/beauty' },
    { id: 8, name: '가구/인테리어', icon: '🪑', path: '/categories/furniture' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">카테고리</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.path}
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-gray-900">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
