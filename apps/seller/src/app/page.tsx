import Header from '@/components/Header';
import MainCarousel from '@/features/home/components/MainCarousel';
import CategorySection from '@/features/categories/components/CategorySection';
import FeaturedProducts from '@/features/products/components/FeaturedProducts';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <MainCarousel />
      <CategorySection />
      <FeaturedProducts />
    </main>
  );
}
