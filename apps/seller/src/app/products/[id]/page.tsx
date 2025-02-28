import ProductDetailContents from '@/features/products/components/ProductDetailContents';
import { getProduct } from '@/features/products/server/actions/products';
import { ProductDetail } from '@/features/products/types/products';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params;
  const product = (await getProduct(id)) as ProductDetail;

  return <ProductDetailContents product={product} />;
};

export default ProductPage;
