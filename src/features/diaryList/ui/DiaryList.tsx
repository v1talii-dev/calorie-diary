import { List } from 'antd-mobile';
import { useCallback } from 'react';
import cls from './style.module.scss';
import { getCaloriesValue, getWeightValue } from '@/shared/lib/catalog.ts';

// TODO: удалить моки
const items: { id: number; name: string; weight: number; calories: number }[] =
  [
    {
      id: 1,
      name: 'Bombbar pro complex whey Vanilla Ice Cream',
      weight: 30,
      calories: 400
    }
  ];

export const DiaryList = () => {
  const onClickItem = useCallback(() => {
    console.log('onClickItem');
  }, []);

  return (
    <List className={cls.diaryList}>
      {items.map(item => (
        <List.Item
          key={item.id}
          description={getWeightValue(item.weight)}
          extra={getCaloriesValue(item.calories)}
          onClick={onClickItem}
        >
          {item.name}
        </List.Item>
      ))}
    </List>
  );
};
