'use client';
import { PropsWithChildren } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface DropdownRetroProps extends PropsWithChildren<{}> {
  title: string;
  className?: string;
}

export const DropdownRetro = ({
  children,
  title,
  className,
}: DropdownRetroProps) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <DropdownMenu
      bg={color.bg}
      textColor={color.textColor}
      borderColor={color.borderColor}
      shadowColor={color.shadowColor}
      className={className}
    >
      <DropdownMenuTrigger>{title}</DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};
