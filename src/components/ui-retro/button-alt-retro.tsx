'use client';
import { PropsWithChildren } from 'react';
import { Button } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';

interface ButtonAltRetroProps extends PropsWithChildren<{}> {
  onClick: () => void;
  className?: string;
}

export const ButtonAltRetro = ({
  children,
  onClick,
  className,
}: ButtonAltRetroProps) => {
  const playSFX = useMusicStore((state) => state.playSFX);

  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <Button
      bg={color.altbg}
      textColor={color.alttextColor}
      borderColor={color.altborderColor}
      shadow={color.altshadowColor}
      onClick={() => {
        onClick();
        playSFX('click5');
      }}
      className={className}
    >
      {children}
    </Button>
  );
};
