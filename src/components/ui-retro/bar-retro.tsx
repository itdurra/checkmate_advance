'use client';
import { PropsWithChildren } from 'react';
import { ProgressBar } from 'pixel-retroui';

interface BarRetroProps extends PropsWithChildren<{}> {
  size: 'sm' | 'md' | 'lg' | undefined;
  color: string;
  progress: number;
  className?: string;
}

export const BarRetro = ({
  children,
  size,
  color,
  progress,
  className,
}: BarRetroProps) => {
  //<ProgressBar size='sm' color='blue' progress={25} className='w-full'/>
  return (
    <ProgressBar
      size={size}
      color={color}
      progress={progress}
      className={className}
    />
  );
};
