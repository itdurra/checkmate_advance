import React, { useState } from 'react';

import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import type { Card } from '@/types/card';

interface SellConfirmationPopupProps {
  isOpen: boolean;
  closeSellConfirmationPopup: () => void;
  card: Card;
}

export const SellConfirmationPopup = ({
  isOpen,
  closeSellConfirmationPopup,
  card,
}: SellConfirmationPopupProps) => {
  const removeCard = useScoreStore((state) => state.removeCard);
  const money = useScoreStore((state) => state.money);

  const { level, setMenu, setIsShopOpen } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme, menu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const [isFlagPopupOpen, setIsFlagPopupOpen] = useState(false);

  function sellCard() {
    removeCard(card.id);
    useScoreStore.setState((state) => ({
      money: money + card.cost / 2,
    }));
    closeSellConfirmationPopup();
  }

  return (
    <PopupRetro isOpen={isOpen} onClose={closeSellConfirmationPopup}>
      <div className='popup-body-div'>
        <p className='popup-title'>Sell Card?</p>
        <p className='popup-subtitle'>
          <span className='popup-subtitle-emphasis'>Warning: </span>
          {menu === 'practice'
            ? 'Sold cards are released from the player, and may appear again in the shop.'
            : 'Sold cards are released from the player hand, and can be added again in the shop.'}
        </p>
        <div className='mt-2 flex flex-col justify-center gap-2 sm:flex-row sm:gap-2'>
          <ButtonAltRetro onClick={() => sellCard()}>Yes</ButtonAltRetro>
          <ButtonRetro onClick={closeSellConfirmationPopup}>No</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
