import { ProgressCircle } from 'antd-mobile';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import cls from './style.module.scss';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { useGetUserSettingsQuery } from '@/entities/user';
import { getCaloriesValue } from '@/shared/lib/catalog.ts';
import { AppFlex } from '@/shared/ui/appFlex';

const currentDate = dayjs();

export const DiaryStatistic = () => {
  const { data: userSettings } = useGetUserSettingsQuery();
  const { data: diary } = useGetDiaryEntriesQuery({
    date: currentDate.toISOString()
  });

  const percentageConsumption = useMemo<number>(() => {
    if (!diary?.totalCalories || !userSettings?.calories_limit) {
      return 0;
    }
    const result = Math.floor(
      (diary.totalCalories * 100) / userSettings.calories_limit
    );
    return result;
  }, [userSettings, diary]);

  const remainingCalories = useMemo<number>(() => {
    if (!diary?.totalCalories || !userSettings?.calories_limit) {
      return 0;
    }
    const result = userSettings?.calories_limit - diary?.totalCalories;
    return result < 0 ? 0 : result;
  }, [userSettings, diary]);

  return (
    <AppFlex align='center'>
      <ProgressCircle
        percent={percentageConsumption > 100 ? 100 : percentageConsumption}
        style={{
          '--size': '120px',
          '--track-width': '8px',
          '--fill-color': `var(--adm-color-${percentageConsumption > 100 ? 'danger' : 'primary'})`
        }}
      >
        <div className={cls.mainText}>{`${percentageConsumption}%`}</div>
        <div className={cls.secondaryText}>
          {getCaloriesValue(diary?.totalCalories)}
        </div>
      </ProgressCircle>

      {remainingCalories > 0 && (
        <AppFlex direction='row' align='center' gap={8}>
          <div className={cls.secondaryText}>Осталось</div>
          <div>{getCaloriesValue(remainingCalories)}</div>
        </AppFlex>
      )}
    </AppFlex>
  );
};
