import Title from '@/shared/components/Header';
import RegisterProductForm from '@/features/products/components/form/RegisterProductForm';
import { getCategories } from '@/features/products/server/actions/categories';
import { getCurrentUser } from '@/features/auth/server/actions/users';

const RegisterProduct = async () => {
  const user = await getCurrentUser();
  const categories = await getCategories();
  const brandId = user?.brand_id;
  return (
    <div>
      <Title title="상품 등록" />
      <RegisterProductForm categories={categories} brandId={brandId} />
    </div>
  );
};

export default RegisterProduct;
