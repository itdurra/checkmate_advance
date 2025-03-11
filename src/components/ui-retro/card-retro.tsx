'use client';
import { PropsWithChildren } from 'react';
import { Card } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface CardRetroProps extends PropsWithChildren<{}> {
  className: string;
}

export const CardRetro = ({ children, className }: CardRetroProps) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <Card
      bg={color.bg}
      textColor={color.textColor}
      borderColor={color.borderColor}
      shadowColor={color.shadowColor}
      className={className}
    >
      {children}
    </Card>
  );
};
