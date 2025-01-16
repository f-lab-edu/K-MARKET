import Title from "@/shared/components/Header.tsx";
import { Button } from "@repo/ui/components/button.tsx";
import Link from "next/link";

const Products = () => {
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
