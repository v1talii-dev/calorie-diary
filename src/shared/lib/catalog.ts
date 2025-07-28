export const getCaloriesValue = (value?: number) =>
  value ? `${value} ккал` : '';

export const getWeightValue = (value?: number) => (value ? `${value} г` : '');

export const getCalculatedCalories = (weight?: number, energy?: number) => {
  return Math.floor(((weight || 0) * (energy || 0)) / 100);
};
