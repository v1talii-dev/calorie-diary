import { CalendarPicker } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import 'dayjs/locale/ru'; // Импортируем русскую локаль
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

type DateValue = Date | null;

interface AppDatePickerProps {
  value?: DateValue;
  onChange?: (value: DateValue) => void;
}

export const AppDatePicker = (props: AppDatePickerProps) => {
  const { value, onChange } = props;
  const [visible, setVisible] = useState(false);

  const formatValue = useCallback(() => {
    if (!value) {
      return 'Выберите дату';
    }
    return dayjs(value).format('DD.MM.YYYY');
  }, [value]);

  const handleOpenCalendar = useCallback(() => setVisible(true), []);
  const handleCloseCalendar = useCallback(() => setVisible(false), []);

  const handleDateChange = useCallback(
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
        onClick={handleOpenCalendar}
        className={cls.trigger}
      >
        <span>{formatValue()}</span>
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
        onClose={handleCloseCalendar}
        onMaskClick={handleCloseCalendar}
        onChange={handleDateChange}
      />
    </>
  );
};
