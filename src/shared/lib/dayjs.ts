import dayjs from 'dayjs';

export function getDateRangeArray(
  startDate: string,
  endDate: string,
  format = 'YYYY-MM-DD'
) {
  const result = [];
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  let current = start;

  while (current.isSameOrBefore(end, 'day')) {
    result.push(current.format(format));
    current = current.add(1, 'day');
  }

  return result;
}
