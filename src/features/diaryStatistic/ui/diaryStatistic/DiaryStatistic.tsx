import { ProgressCircle } from 'antd-mobile';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cls from './style.module.scss';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { useGetUserSettingsEntryQuery } from '@/entities/user';
import { StatisticSkeleton } from '@/features/diaryStatistic/ui/statisticSkeleton/StatisticSkeleton.tsx';
import { getFilters } from '@/pages/diary';
import { getCaloriesValue } from '@/shared/lib/catalog.ts';
import { AppFlex } from '@/shared/ui/appFlex';

export const DiaryStatistic = () => {
  const filters = useSelector(getFilters);
  const { data: userSettings, isFetching: isFetchingUserSettings } =
    useGetUserSettingsEntryQuery();
  const { data: diary, isFetching: isFetchingDiary } = useGetDiaryEntriesQuery({
    dateStart: filters.date,
    dateEnd: filters.date
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
    if (!userSettings?.calories_limit) {
      return 0;
    }
    const result = userSettings?.calories_limit - (diary?.totalCalories ?? 0);
    return result < 0 ? 0 : result;
  }, [userSettings, diary]);

  const excessCalories = useMemo<number>(() => {
    if (!userSettings?.calories_limit) {
      return 0;
    }
    const result = (diary?.totalCalories ?? 0) - userSettings?.calories_limit;
    return result < 0 ? 0 : result;
  }, [userSettings, diary]);

  if (isFetchingUserSettings || isFetchingDiary) {
    return <StatisticSkeleton />;
  }

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

      <AppFlex direction='row' align='center' gap={8}>
        {remainingCalories > 0 && (
          <>
            <div className={cls.secondaryText}>Осталось</div>
            <div>{getCaloriesValue(remainingCalories)}</div>
          </>
        )}
        {excessCalories > 0 && (
          <>
            <div className={cls.secondaryText}>Превышение</div>
            <div>{getCaloriesValue(excessCalories)}</div>
          </>
        )}
      </AppFlex>
    </AppFlex>
  );
};
