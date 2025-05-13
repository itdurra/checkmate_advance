'use client';
import { PropsWithChildren } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface DropdownAltRetroProps extends PropsWithChildren<{}> {
  title: string;
  className?: string;
}

export const DropdownAltRetro = ({
  children,
  title,
  className,
}: DropdownAltRetroProps) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <DropdownMenu
      bg={color.altbg}
      textColor={color.alttextColor}
      borderColor={color.altborderColor}
      shadowColor={color.altshadowColor}
      className={className}
    >
      <DropdownMenuTrigger>{title}</DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};
