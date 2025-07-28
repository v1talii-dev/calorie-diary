import { Button, DatePicker, type DatePickerRef, Form } from 'antd-mobile';
import { AddSquareOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { type RefObject, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from './style.module.scss';
import type { DiaryRecord } from '@/entities/diary';
import { DiaryList } from '@/features/diaryList';
import { DiaryPopup } from '@/features/diaryPopup';
import { type DiaryFilters, getFilters, setFilters } from '@/pages/diary';
import { DATE_FORMAT } from '@/shared/const/common.ts';
import { AppFlex } from '@/shared/ui/appFlex';

export const DiaryContent = () => {
  const dispatch = useDispatch();
  const [isOpenDiaryPopup, setIsOpenDiaryPopup] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<DiaryRecord>();
  const filters = useSelector(getFilters);

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
    <AppFlex gap={8} fullWidth={true}>
      <AppFlex direction='row' align='center' justify='space-between'>
        <Form
          className={cls.filterForm}
          mode='card'
          initialValues={formFilters}
          onValuesChange={onChangeFilters}
        >
          <Form.Item
            name='date'
            trigger='onConfirm'
            onClick={(__, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
          >
            <DatePicker>
              {value => (value ? dayjs(value).format(DATE_FORMAT) : '')}
            </DatePicker>
          </Form.Item>
        </Form>

        <Button
          color='primary'
          fill='none'
          size='mini'
          onClick={() => onOpenDiaryPopup()}
        >
          <AddSquareOutline fontSize={32} />
        </Button>
      </AppFlex>

      <DiaryList onClickItem={onClickItem} />

      <DiaryPopup
        isOpen={isOpenDiaryPopup}
        value={currentDiary}
        onClose={onCloseDiaryPopup}
      />
    </AppFlex>
  );
};
