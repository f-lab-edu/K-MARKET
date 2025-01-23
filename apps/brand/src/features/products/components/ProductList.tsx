import React from "react";
import { Product } from "@/features/products/types/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import Image from "next/image";
import { Button } from "@repo/ui/components/button";

interface ProductListProps {
  products:Product[];
}

const ProductList = ({products}: ProductListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>카테고리</TableHead>
          <TableHead>이미지</TableHead>
          <TableHead>상품 이름</TableHead>
          <TableHead>가격</TableHead>
          <TableHead className="w-32">등록일</TableHead>
          <TableHead className="w-32">수정일</TableHead>
          <TableHead className="w-10"></TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.category_name}</TableCell>
            <TableCell>
              <Image
                src={product.main_image_url}
                alt={product.name}
                width={100}
                height={100}
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.created_at}</TableCell>
            <TableCell>{product.updated_at}</TableCell>
            <TableCell>
              <Button variant="secondary">수정</Button>
            </TableCell>
            <TableCell>
              <Button variant="destructive">삭제</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductList;
