'use client';
import React from 'react';
import Image from 'next/image';

import { BubbleRetro } from '@/components/ui-retro/bubble-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import { useGame } from "@/context/game-context";

export const PlayerText = () => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { playerMessage } = useGame();

  return (
    <CardRetro
        className='p-3 h-full text-center'
    >
        <BubbleRetro>
            {playerMessage}
        </BubbleRetro>
        <Image
            src='/gameboyhappy.png'
            width={100}
            height={100}
            priority
            quality={100}
            alt='Enemy Profile Picture'
        /> 
    </CardRetro>
  );
};
