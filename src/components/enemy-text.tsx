'use client';
import React from 'react';
import { Bubble } from 'pixel-retroui';

import { BubbleRetro } from '@/components/ui-retro/bubble-retro';
import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

export const EnemyText = () => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { enemyMessage } = useGame();

  return (
    <BubbleRetro
      className={'mt-0 h-full w-5/6 p-1 text-left text-xs md:w-full'}
    >
      {enemyMessage}
    </BubbleRetro>
  );
};
