'use client';
import { PropsWithChildren } from 'react';
import { Bubble } from 'pixel-retroui';

import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

interface BubbleRetroProps extends PropsWithChildren<{}> {
  className?: string;
}

export const BubbleRetro = ({ children, className }: BubbleRetroProps) => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <Bubble
        direction="left"
        bg={boss.bg}
        textColor={boss.textColor}
        borderColor={boss.borderColor}
        className={className}
        >
          {children}
    </Bubble>
  );
};
