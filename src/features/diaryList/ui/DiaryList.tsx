import { ErrorBlock, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import cls from './style.module.scss';
import { type DiaryRecord, useGetDiaryEntriesQuery } from '@/entities/diary';
import { getFilters } from '@/pages/diary';
import { getCaloriesPerPortion } from '@/shared/lib/catalog.ts';
import { AppListSkeleton } from '@/shared/ui/appSkeleton';

interface DiaryListProps {
  onClickItem: (item: DiaryRecord) => void;
}

export const DiaryList = (props: DiaryListProps) => {
  const { onClickItem } = props;
  const filters = useSelector(getFilters);
  const { data, error, isFetching } = useGetDiaryEntriesQuery({
    date: filters.date
  });

  if (isFetching) {
    return <AppListSkeleton />;
  }

  if (error) {
    return <ErrorBlock status='default' description={JSON.stringify(error)} />;
  }

  if (!data?.entries?.length) {
    return <ErrorBlock status='empty' title='Дневник пуст' description='' />;
  }

  return (
    <List className={cls.diaryList}>
      {data.entries.map(item => (
        <List.Item
          key={item.id}
          description={getCaloriesPerPortion(item.calories, item.weight)}
          extra={dayjs(item.date).format('HH:mm')}
          onClick={() => onClickItem(item)}
        >
          {item.product?.product_name}
        </List.Item>
      ))}
    </List>
  );
};
