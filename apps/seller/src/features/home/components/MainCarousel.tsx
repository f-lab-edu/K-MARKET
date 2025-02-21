import React from 'react';

const MainCarousel = () => {
  // 실제 구현시에는 이미지 슬라이더 라이브러리(예: swiper) 사용 예정
  return (
    <section className="w-full h-[400px] bg-gray-100">
      <div className="container mx-auto h-full">
        <div className="relative h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              특별한 상품을 만나보세요
            </h1>
            <p className="text-xl mb-8">최대 70% 할인된 가격으로 제공됩니다</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              할인 상품 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCarousel;
