import React from 'react';

import { shopPortrait } from '@/components/portraits';
import type { Card } from '@/types/card';

import { CardRetro } from './ui-retro/card-retro';

type CardMiniProps = {
  card: Card;
};

export const CardMini = ({ card }: CardMiniProps) => (
  <CardRetro className='flex h-32 w-20 sm:h-36 sm:w-24 flex-col items-center text-xs'>
    <div className='mb-1'>{shopPortrait(card.image)}</div>
    <p className='font-minecraft-bold text-xs leading-tight'>{card.name}</p>
  </CardRetro>
);
