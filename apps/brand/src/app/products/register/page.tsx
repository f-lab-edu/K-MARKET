import Title from "@/shared/components/Header";
import RegisterProductForm from "@/features/products/components/form/RegisterProductForm";

const Products = () => {
  return (
    <div>
      <Title title="상품 등록" />
      <RegisterProductForm />
    </div>
  );
};

export default Products;
