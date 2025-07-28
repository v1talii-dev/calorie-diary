import { ProgressCircle } from 'antd-mobile';
import dayjs from 'dayjs';
import cls from './style.module.scss';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { getCaloriesValue } from '@/shared/lib/catalog.ts';
import { AppFlex } from '@/shared/ui/appFlex';

const currentDate = dayjs();

export const DiaryStatistic = () => {
  const percent = 50;
  const { data } = useGetDiaryEntriesQuery({
    date: currentDate.toISOString()
  });

  return (
    <AppFlex align='center'>
      <ProgressCircle
        percent={percent > 100 ? 100 : percent}
        style={{
          '--size': '120px',
          '--track-width': '8px',
          '--fill-color': `var(--adm-color-${percent > 100 ? 'danger' : 'primary'})`
        }}
      >
        <div className={cls.mainText}>{`${percent}%`}</div>
        <div className={cls.secondaryText}>
          {getCaloriesValue(data?.totalCalories)}
        </div>
      </ProgressCircle>

      <AppFlex direction='row' align='center' gap={8}>
        <div className={cls.secondaryText}>Осталось</div>
        <div>{getCaloriesValue(650)}</div>
      </AppFlex>
    </AppFlex>
  );
};
