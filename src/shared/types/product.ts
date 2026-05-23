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
