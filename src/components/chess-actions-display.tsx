'use client';

import React, { useState } from 'react';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { useScoreStore } from '@/stores/useScoreStore';
import { useGame } from '@/context/game-context';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { ActiveCardDisplay } from './active-card-display';
import { SellConfirmationPopup } from '@/components/popups/sell-confirmation-popup';
import type { Card } from '@/types/card';

export const ChessActionsDisplay = () => {
  const activeCards = useScoreStore((state) => state.activeCards);
  const maxCards = useScoreStore((state) => state.maxCards);
  const { theme, level } = useGame();

  const [cardToSell, setCardToSell] = useState<Card | null>(null);

  const color = themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <>
      <CardRetro className='mr-auto mt-6 h-[350px] w-full overflow-y-auto px-2'>
        <div>
          {activeCards.length} / {maxCards}
        </div>

        {activeCards.map((card) => (
          <ActiveCardDisplay key={card.id} card={card} onSell={() => setCardToSell(card)} />
        ))}
      </CardRetro>

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
