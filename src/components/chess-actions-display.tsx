'use client';
import React from 'react';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { cardPortrait } from '@/components/portraits';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';

export const ChessActionsDisplay = () => {
  // Zustand store
  const activeCards = useScoreStore((state) => state.activeCards);
  const maxCards = useScoreStore((state) => state.maxCards);

  // Game context
  const { theme } = useGame();
  const color = themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  function sell() {
    // Sell functionality implementation
  }

  // Render individual card component
  const renderCard = (card: typeof activeCards[0]) => (
    <CardRetro key={card.id} className='flex w-[95%] flex-row items-stretch justify-between gap-2'>
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
        <div className='mt-2'>
          <ButtonRetro onClick={() => sell()}>Sell</ButtonRetro>
        </div>
      </div>
    </CardRetro>
  );

  return (
    <CardRetro className='mx-auto h-[350px] w-full space-y-4 overflow-y-auto px-2'>
      <div>{activeCards.length} / {maxCards}</div>
      {/* Render cards individually */}
      {activeCards[0] && renderCard(activeCards[0])}
      {activeCards[1] && renderCard(activeCards[1])}
      {activeCards[2] && renderCard(activeCards[2])}
      {activeCards[3] && renderCard(activeCards[3])}
      {activeCards[4] && renderCard(activeCards[4])}
      {/* Add more lines if you expect more than 5 active cards */}
    </CardRetro>
  );
};