import classNames from 'classnames';
import { type HTMLAttributes, memo, type ReactNode } from 'react';
import cls from './style.module.scss';
import { type AppSize } from '@/shared/types/appUi';

interface AppFlexProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  gap?: AppSize | null;
  align?: 'flex-start' | 'center' | 'flex-end';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  wrap?: 'nowrap' | 'wrap';
  fullHeight?: boolean;
  fullWidth?: boolean;
}

export const AppFlex = memo((props: AppFlexProps) => {
  const {
    children,
    className,
    direction = 'column',
    gap = 16,
    align,
    justify,
    wrap,
    fullHeight,
    fullWidth,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls['app-flex'], className, {
        [cls[`app-flex--direction-${direction}`]]: !!direction,
        [cls[`app-flex--gap-${gap}`]]: !!gap,
        [cls[`app-flex--align-${align}`]]: !!align,
        [cls[`app-flex--justify-${justify}`]]: !!justify,
        [cls[`app-flex--wrap-${wrap}`]]: !!wrap,
        [cls[`app-flex--full-height`]]: fullHeight,
        [cls[`app-flex--full-width`]]: fullWidth
      })}
      {...otherProps}
    >
      {children}
    </div>
  );
});
