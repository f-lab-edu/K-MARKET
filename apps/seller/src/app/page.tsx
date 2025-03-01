import Header from '@/components/Header';
import MainCarousel from '@/features/home/components/MainCarousel';
import CategorySection from '@/features/categories/components/CategorySection';
import FeaturedProducts from '@/features/products/components/FeaturedProducts';
import { getProducts } from '@/features/products/server/actions/products';

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="min-h-screen bg-white">
      <MainCarousel />
      <CategorySection />
      <FeaturedProducts products={products} />
    </main>
  );
}
