export interface Product {
  id: string;
  product_name: string;
  nutriments: {
    proteins_100g: number | null;
    fat_100g: number | null;
    carbohydrates_100g: number | null;
    'energy-kcal_100g': number | null;
  };
}

export interface ProductList {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
}
