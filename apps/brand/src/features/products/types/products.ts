export interface Product extends ProductPrice {
  created_at: string;
  updated_at: string;
  id: number;
  category_name: string;
  name: string;
  image: string;
}

interface ProductImage {
  image_url: string;
  type: string;
}

interface ProductPrice {
  price: number;
  discount_price?: number | null;
  min_qty: number;
}

export interface ProductWithRelations {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  prices: ProductPrice[];
  categories: {
    name: string;
  };
  created_at: string;
  updated_at: string;
}
