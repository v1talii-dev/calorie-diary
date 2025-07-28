export const getCaloriesValue = (value?: number) =>
  value ? `${value} ккал` : '';

export const getWeightValue = (value?: number) => (value ? `${value} г` : '');

export const getCalculatedCalories = (weight?: number, energy?: number) => {
  return Math.floor(((weight || 0) * (energy || 0)) / 100);
};

export const getCaloriesPerPortion = (
  energy?: number,
  portion: number = 100
) => {
  if (!energy) {
    return '';
  }
  return `${getCaloriesValue(energy)} / ${getWeightValue(portion)}`;
};
