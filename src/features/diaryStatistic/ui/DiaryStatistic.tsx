import { ProgressCircle } from 'antd-mobile';
import cls from './style.module.scss';
import { getCaloriesValue } from '@/shared/lib/catalog.ts';
import { AppFlex } from '@/shared/ui/appFlex';

export const DiaryStatistic = () => {
  const percent = 50;
  const calories = 650;

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
        <div className={cls.secondaryText}>{getCaloriesValue(calories)}</div>
      </ProgressCircle>

      <AppFlex direction='row' align='center' gap={8}>
        <div className={cls.secondaryText}>Осталось</div>
        <div>{getCaloriesValue(650)}</div>
      </AppFlex>
    </AppFlex>
  );
};
