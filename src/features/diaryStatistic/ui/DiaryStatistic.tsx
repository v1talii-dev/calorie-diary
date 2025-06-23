import { ProgressCircle } from 'antd-mobile';
import cls from './style.module.scss';
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
          '--fill-color': `var(--adm-color-${percent > 100 ? 'danger' : 'success'})`
        }}
      >
        <div className={cls.mainText}>{`${percent}%`}</div>
        <div className={cls.secondaryText}>{`${calories} кал.`}</div>
      </ProgressCircle>

      <AppFlex direction='row' align='center' gap={8}>
        <div className={cls.secondaryText}>Осталось</div>
        <div>650 кал.</div>
      </AppFlex>
    </AppFlex>
  );
};
