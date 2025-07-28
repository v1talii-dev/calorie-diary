import { ErrorBlock, List, Skeleton } from 'antd-mobile';
import { useSelector } from 'react-redux';
import cls from './style.module.scss';
import { type DiaryRecord, useGetDiaryEntriesQuery } from '@/entities/diary';
import { getFilters } from '@/pages/diary';
import { getCaloriesValue, getWeightValue } from '@/shared/lib/catalog.ts';

interface DiaryListProps {
  onClickItem: (item: DiaryRecord) => void;
}

export const DiaryList = (props: DiaryListProps) => {
  const { onClickItem } = props;
  const filters = useSelector(getFilters);
  const { data, error, isLoading } = useGetDiaryEntriesQuery({
    date: filters.date
  });

  if (isLoading) {
    return <Skeleton.Paragraph lineCount={5} animated />;
  }

  if (error) {
    return <ErrorBlock status='default' />;
  }

  if (!data?.entries?.length) {
    return <ErrorBlock status='empty' title='Дневник пуст' description='' />;
  }

  return (
    <List className={cls.diaryList}>
      {data.entries.map(item => (
        <List.Item
          key={item.id}
          description={getWeightValue(item.weight)}
          extra={getCaloriesValue(item.calories)}
          onClick={() => onClickItem(item)}
        >
          {item.product?.product_name}
        </List.Item>
      ))}
    </List>
  );
};
