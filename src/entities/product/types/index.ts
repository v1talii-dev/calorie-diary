export interface ProductEntry {
  id: string;
  name?: string;
  nutrients?: {
    proteins: number;
    fat: number;
    carbohydrates: number;
    energy: number;
  };
}

export interface ProductList {
  count: number;
  page: number;
  pageCount: number;
  pageSize: number;
  content: ProductEntry[];
}
