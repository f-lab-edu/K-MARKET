import Title from '@/shared/components/Header';
import RegisterProductForm from '@/features/products/components/form/RegisterProductForm';
import { getCategories } from '@/features/products/server/actions/categories';

const RegisterProduct = async () => {
  const categories = await getCategories();

  return (
    <div>
      <Title title="상품 등록" />
      <RegisterProductForm categories={categories} />
    </div>
  );
};

export default RegisterProduct;
