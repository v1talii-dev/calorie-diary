import { Button, Form } from 'antd-mobile';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiltersSkeleton } from '../filtersSkeleton/FiltersSkeleton.tsx';
import cls from './style.module.scss';
import {
  type DiaryRecord,
  type DiaryFilters,
  useGetDiaryEntriesQuery,
  getFilters,
  setFilters
} from '@/entities/diary';
import { DiaryList } from '@/features/diaryList';
import { DiaryPopup } from '@/features/diaryPopup';
import { AppDatePicker } from '@/shared/ui/appDatePicker/AppDatePicker.tsx';
import { AppFlex } from '@/shared/ui/appFlex';

export const DiaryContent = () => {
  const dispatch = useDispatch();
  const [isOpenDiaryPopup, setIsOpenDiaryPopup] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<DiaryRecord>();
  const filters = useSelector(getFilters);
  const { isFetching } = useGetDiaryEntriesQuery({
    dateStart: filters.date,
    dateEnd: filters.date
  });

  const formFilters = useMemo(() => {
    return {
      ...filters,
      date: new Date(filters.date)
    };
  }, [filters]);

  const onOpenDiaryPopup = useCallback(() => {
    setIsOpenDiaryPopup(true);
  }, []);

  const onCloseDiaryPopup = useCallback(() => {
    setIsOpenDiaryPopup(false);
    setCurrentDiary(undefined);
  }, []);

  const onClickItem = (item: DiaryRecord) => {
    setCurrentDiary(item);
    onOpenDiaryPopup();
  };

  const onChangeFilters = (
    filters: { date: Date } & Omit<DiaryFilters, 'date'>
  ) => {
    const result = {
      ...filters,
      date: filters.date.toISOString()
    };
    dispatch(setFilters(result));
  };

  return (
    <AppFlex className={cls.content} gap={16} fullWidth={true}>
      {isFetching ? (
        <FiltersSkeleton />
      ) : (
        <AppFlex direction='row' align='center' justify='space-between'>
          <Form
            className={cls.filterForm}
            initialValues={formFilters}
            onValuesChange={onChangeFilters}
          >
            <Form.Item name='date' noStyle>
              <AppDatePicker />
            </Form.Item>
          </Form>

          <Button color='primary' onClick={() => onOpenDiaryPopup()}>
            Добавить
          </Button>
        </AppFlex>
      )}

      <DiaryList onClickItem={onClickItem} />

      <DiaryPopup
        isOpen={isOpenDiaryPopup}
        value={currentDiary}
        onClose={onCloseDiaryPopup}
      />
    </AppFlex>
  );
};
