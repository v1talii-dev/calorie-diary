import type { Product } from '@/entities/product';

export const getCaloriesValue = (value?: number | null) =>
  value ? `${value} ккал` : '';

export const getWeightValue = (value?: number) => (value ? `${value} г` : '');

export const getCalculatedCalories = (
  weight?: number,
  calories?: number | null
) => {
  if (!calories) {
    return 0;
  }
  return Math.floor(((weight || 0) * (calories || 0)) / 100);
};

export const getCaloriesPerPortion = (
  calories?: number | null,
  portion: number = 100
) => {
  if (!calories) {
    return '';
  }
  return `${getCaloriesValue(Math.floor(calories))} / ${getWeightValue(portion)}`;
};

export const getProductName = (product: Product) => {
  const result: string[] = [];
  if (product?.brands) {
    result.push(product.brands);
  }
  if (product?.product_name) {
    result.push(product.product_name);
  }
  return result.join(' / ').replace(/&quot;/g, '"');
};
