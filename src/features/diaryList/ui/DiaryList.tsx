import { Dialog, ErrorBlock, List, SwipeAction } from 'antd-mobile';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import cls from './style.module.scss';
import {
  type DiaryRecord,
  useDeleteDiaryEntryMutation,
  useGetDiaryEntriesQuery,
  getFilters
} from '@/entities/diary';
import { getCaloriesPerPortion, getProductName } from '@/shared/lib/catalog.ts';
import SearchIcon from '@/shared/media/icons/search.svg';
import { AppListSkeleton } from '@/shared/ui/appSkeleton';

interface DiaryListProps {
  onClickItem: (item: DiaryRecord) => void;
}

export const DiaryList = (props: DiaryListProps) => {
  const { onClickItem } = props;
  const filters = useSelector(getFilters);
  const { data, error, isFetching } = useGetDiaryEntriesQuery({
    dateStart: filters.date,
    dateEnd: filters.date
  });
  const [deleteDiaryEntry] = useDeleteDiaryEntryMutation();

  const onClickDeleteAction = (payload: DiaryRecord) => {
    Dialog.show({
      content: 'Вы действительно хотите удалить запись в дневнике?',
      closeOnAction: true,
      actions: [
        [
          { key: 'cancel', text: 'Нет' },
          {
            key: 'delete',
            text: 'Удалить',
            danger: true,
            bold: true,
            onClick: () => onDelete(payload)
          }
        ]
      ]
    });
  };

  const onDelete = async (payload: DiaryRecord) => {
    try {
      await deleteDiaryEntry(payload.id).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  if (isFetching) {
    return <AppListSkeleton />;
  }

  if (error) {
    return <ErrorBlock status='default' description={JSON.stringify(error)} />;
  }

  if (!data?.entries?.length) {
    return (
      <ErrorBlock image={SearchIcon} title='Дневник пуст' description='' />
    );
  }

  return (
    <List className={cls.diaryList}>
      {data.entries.map(item => (
        <SwipeAction
          key={item.id}
          rightActions={[
            {
              key: 'delete',
              text: 'Удалить',
              color: 'danger',
              onClick: () => onClickDeleteAction(item)
            }
          ]}
        >
          <List.Item
            description={getCaloriesPerPortion(item.calories, item.weight)}
            extra={dayjs(item.date).format('HH:mm')}
            onClick={() => onClickItem(item)}
          >
            {getProductName(item.product)}
          </List.Item>
        </SwipeAction>
      ))}
    </List>
  );
};
