'use client';
import { PropsWithChildren } from 'react';
import { Button } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface ButtonRetroProps extends PropsWithChildren<{}> {
  onClick: () => void;
  className?: string;
}

export const ButtonRetro = ({
  children,
  onClick,
  className,
}: ButtonRetroProps) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <Button
      bg={color.bg}
      textColor={color.textColor}
      borderColor={color.borderColor}
      shadow={color.shadowColor}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};
