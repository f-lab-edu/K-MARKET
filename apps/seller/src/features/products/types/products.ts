export interface Product {
  id: number;
  name: string;
  prices: number;
  discount_price?: number;
  image: string;
}

export interface ProductWithRelations {
  id: number;
  name: string;
  prices: Array<{
    price: number;
    discount_price: number | null;
    min_qty: number;
  }>;
  images: Array<{
    image_url: string;
    type: string;
  }>;
}

export interface ProductWithFullRelations extends ProductWithRelations {
  categories: Array<{
    name: string;
  }>;
  images: Array<{
    image_url: string;
    type: string;
  }>;
}
