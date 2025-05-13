'use client';
import { PropsWithChildren } from 'react';
import { Card } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface CardRetroAltNoMotionProps extends PropsWithChildren<{}> {
  className: string;
}

export const CardRetroAltNoMotion = ({ children, className }: CardRetroAltNoMotionProps) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <Card
      bg={color.altotherbg}
      textColor={color.altothertextColor}
      borderColor={color.altotherborderColor}
      shadowColor={color.altothershadowColor}
      className={className}
    >
      {children}
    </Card>
  );
};
