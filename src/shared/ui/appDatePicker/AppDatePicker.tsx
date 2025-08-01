import { CalendarPicker } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import cls from './style.module.scss';
import { DATE_FORMAT } from '@/shared/const/common.ts';
import { AppFlex } from '@/shared/ui/appFlex';

type DateValue = Date | null;

interface AppDatePickerProps {
  value?: DateValue;
  onChange?: (value: DateValue) => void;
}

export const AppDatePicker = (props: AppDatePickerProps) => {
  const { value, onChange } = props;
  const [visible, setVisible] = useState(false);

  const formatedValue = useMemo(() => {
    if (!value) {
      return 'Выберите дату';
    }
    return dayjs(value).format(DATE_FORMAT);
  }, [value]);

  const minValue = useMemo(() => {
    if (!value) {
      return undefined;
    }
    const date = dayjs(value);
    const result = date
      .set('month', date.get('month') - 1)
      .startOf('month')
      .toDate();
    return result;
  }, [value]);

  const maxValue = useMemo(() => {
    if (!value) {
      return undefined;
    }
    const date = dayjs(value);
    const result = date
      .set('month', date.get('month') + 1)
      .endOf('month')
      .toDate();
    return result;
  }, [value]);

  const onOpenCalendar = useCallback(() => setVisible(true), []);

  const onCloseCalendar = useCallback(() => setVisible(false), []);

  const onDateChange = useCallback(
    (val: Date | null) => {
      onChange?.(val);
      setVisible(false);
    },
    [onChange]
  );

  return (
    <>
      <AppFlex
        direction='row'
        align='center'
        gap={8}
        onClick={onOpenCalendar}
        className={cls.trigger}
      >
        <span>{formatedValue}</span>
        <DownOutline fontSize={12} />
      </AppFlex>

      <CalendarPicker
        weekStartsOn='Monday'
        selectionMode='single'
        confirmText='Закрыть'
        popupBodyStyle={{
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
        visible={visible}
        value={value}
        min={minValue}
        max={maxValue}
        onClose={onCloseCalendar}
        onMaskClick={onCloseCalendar}
        onChange={onDateChange}
      />
    </>
  );
};
