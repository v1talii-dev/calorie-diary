import type { ProductEntry } from '@/entities/product';

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

export const getProductName = (product?: ProductEntry) => {
  const result: string[] = [];
  if (product?.name) {
    result.push(product.name);
  }
  // TODO product brand
  return result.join(' / ');
};
