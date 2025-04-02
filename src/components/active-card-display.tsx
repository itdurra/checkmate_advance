'use client';

import React from 'react';

import { cardPortrait } from '@/components/portraits';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { useGame } from '@/context/game-context';
import type { Card } from '@/types/card';

type Props = {
  card: Card;
  onSell: () => void;
};

export const ActiveCardDisplay = ({ card, onSell }: Props) => {
  const { isShopOpen } = useGame();

  return (
    <CardRetro className='flex w-[95%] flex-row items-stretch justify-between gap-2'>
      {/* Left Column: Image */}
      <div className='flex w-1/3 items-center justify-center'>
        {cardPortrait(card.image)}
      </div>

      {/* Right Column: Text and Button */}
      <div className='flex w-2/3 flex-col justify-between'>
        <div>
          <p className='font-minecraft-bold text-sm'>{card.name}</p>
          <p className='mt-1 text-xs'>{card.description}</p>
        </div>
        {isShopOpen && (
          <div className='mt-2'>
            <ButtonRetro onClick={onSell}>
              Sell {card.cost / 2} Credits
            </ButtonRetro>
          </div>
        )}
      </div>
    </CardRetro>
  );
};
