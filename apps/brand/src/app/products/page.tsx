import Title from '@/shared/components/Header';
import { Button } from '@repo/ui/components/button';
import Link from 'next/link';
import { getProducts } from '@/features/products/server/actions/products';
import ProductList from '@/features/products/components/ProductList';

const Products = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className="flex justify-between">
        <Title title="상품 목록" />
        <Button asChild>
          <Link href="/products/register">상품 등록하기</Link>
        </Button>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default Products;
