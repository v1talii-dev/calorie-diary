export interface Product {
  id: string;
  product_name: string;
  url: string;
  nutriments: {
    proteins_100g: number;
    fat_100g: number;
    carbohydrates_100g: number;
    'energy-kcal_100g': number;
  };
}

export interface ProductList {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
}
