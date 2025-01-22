import Title from "@/shared/components/Header";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { getProducts } from "@/features/products/server/actions/products";

const Products = async () => {
  const products = await getProducts();
  console.log(products, "products");
  return (
    <div>
      <div className="flex justify-between">
        <Title title="상품 목록" />
        <Button asChild>
          <Link href="/products/register">상품 등록하기</Link>
        </Button>
      </div>
    </div>
  );
};

export default Products;
