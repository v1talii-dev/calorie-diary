import { DotLoading } from 'antd-mobile';
import cls from './style.module.scss';

export const MainLoading = () => {
  return (
    <div className={cls.mainLoading}>
      <DotLoading color='primary' />
    </div>
  );
};
