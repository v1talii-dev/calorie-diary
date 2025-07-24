import { List } from 'antd-mobile';
import cls from './style.module.scss';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { getWeightValue } from '@/shared/lib/catalog.ts';

export const DiaryList = () => {
  const { data: entries, error, isLoading } = useGetDiaryEntriesQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;
  if (!entries || entries.length === 0) return <div>Нет записей</div>;

  return (
    <List className={cls.diaryList}>
      {entries.map(item => (
        <List.Item
          key={item.id}
          description={getWeightValue(item.weight)}
          // extra={getCaloriesValue()}
        >
          TODO: product name...
        </List.Item>
      ))}
    </List>
  );
};
