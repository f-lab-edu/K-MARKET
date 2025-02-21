export interface Product {
  id: number;
  name: string;
  prices: number;
  discount_price?: number;
  image: string;
}

interface ProductImage {
  image_url: string;
  type: string;
}

interface ProductPrice {
  price: number;
  discount_price: number | null;
  min_qty: number;
}
export interface ProductWithRelations {
  id: number;
  name: string;
  prices: ProductPrice[];
  images: ProductImage[];
}

interface ProductOption {
  id: number;
  name: string;
  additional_price: number;
}
export interface ProductDetail extends Omit<Product, 'image'> {
  images: ProductImage[];
  min_qty: number;
  options: ProductOption[];
}
