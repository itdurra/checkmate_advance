'use client';

import React from 'react';

import { cardPortrait } from '@/components/portraits';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { useGame } from '@/context/game-context';
import type { Card } from '@/types/card';
import { RarityClassMap } from '@/utils/rarity-class-map';

import { CardRetroNoMotion } from './ui-retro/card-retro-no-motion';
import { CardDescription } from './card-description';

type Props = {
  card: Card;
  onSell: () => void;
};

export const ActiveCardDisplay = ({ card, onSell }: Props) => {
  const { isShopOpen, menu } = useGame();

  return (
    <>
      <CardRetroNoMotion
        className={`mb-6 flex flex-row items-stretch justify-between gap-2 transition-all ${
          !card.active ? 'opacity-40 grayscale' : ''
         }`}
      >
        {/* Left Column: Image */}
        <div className='flex w-1/3 flex-col items-center justify-center'>
          {cardPortrait(card.image)}
          <div className={`p-1 text-xs uppercase ${RarityClassMap[card.rarity]}`}>{card.rarity}</div>
        </div>

        {/* Right Column: Text and Button */}
        <div className='flex w-2/3 flex-col justify-between'>
          <div>
            <p className='font-minecraft-bold text-sm'>{card.name}</p>
            <p className='mt-1 text-xs'>
              <CardDescription
                description={card.description}
                value={card.value}
              />
            </p>
          </div>
          {isShopOpen && (
            <div className='mt-2'>
              <ButtonRetro onClick={onSell}>
                {menu !== 'practice' ? `$${card.cost / 2}` : 'Sell'}
              </ButtonRetro>
            </div>
          )}
        </div>
      </CardRetroNoMotion>
      {!card.active && (
        <div className='absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-red-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          Disabled by boss effect
        </div>
      )}
    </>
  );
};
