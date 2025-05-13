'use client';

import React, { useState } from 'react';

import { SellConfirmationPopup } from '@/components/popups/sell-confirmation-popup';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import type { Card } from '@/types/card';
import { abbreviateNumber } from '@/utils/abbreviate-number';

import { CardRetroAlt } from './ui-retro/card-retro-alt';
import { ActiveCardDisplay } from './active-card-display';

export const ChessActionsDisplay = () => {
  const activeCards = useScoreStore((state) => state.activeCards);
  const maxCards = useScoreStore((state) => state.maxCards);
  const money = useScoreStore((state) => state.money);
  const { theme, menu, level } = useGame();

  const [cardToSell, setCardToSell] = useState<Card | null>(null);

  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <>
      <CardRetroAlt className='h-[350px] overflow-y-auto overflow-x-hidden px-2 md:mt-6'>
        <div className='flex flex-row justify-between'>
          <div>
            {activeCards.length} / {maxCards}
          </div>{' '}
          <div className=''>${abbreviateNumber(money)}</div>
        </div>

        {activeCards.map((card, index) => (
          <ActiveCardDisplay
            key={`${card.id}-${index}`}
            card={card}
            onSell={() => setCardToSell(card)}
          />
        ))}

        {/* Empty shadows for missing cards */}
        {Array.from({ length: maxCards - activeCards.length }).map((_, idx) => (
          <div
            key={`shadow-${idx}`}
            className='mb-6 h-[100px] w-full rounded-md border-2 border-dashed border-gray-400 opacity-50'
          />
        ))}
      </CardRetroAlt>

      {/* Render popup outside of scrollable CardRetro */}
      {cardToSell && (
        <SellConfirmationPopup
          isOpen={true}
          closeSellConfirmationPopup={() => setCardToSell(null)}
          card={cardToSell}
        />
      )}
    </>
  );
};
