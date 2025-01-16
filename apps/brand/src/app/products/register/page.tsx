import Title from "@/shared/components/Header.tsx";
import RegisterProductForm from "@/features/products/components/form/RegisterProductForm.tsx";

const Products = () => {
  return (
    <div>
      <Title title="상품 등록" />
      <RegisterProductForm />
    </div>
  );
};

export default Products;
