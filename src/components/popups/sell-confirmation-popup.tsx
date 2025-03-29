import React, { useState } from 'react';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import type { Card } from '@/types/card';

import { useScoreStore } from '@/stores/useScoreStore';

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
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const [isFlagPopupOpen, setIsFlagPopupOpen] = useState(false);

  function sellCard(){
    removeCard(card.id);
    useScoreStore.setState((state) => ({
      money: money + (card.cost / 2),
    }));
    closeSellConfirmationPopup();
  }

  return (
    <PopupRetro isOpen={isOpen} onClose={closeSellConfirmationPopup}>
      <div className='text-center'>
        <p className='my-4'>Are you sure you want to sell {card.name}?</p>
        <ButtonAltRetro onClick={() => sellCard()}>Yes</ButtonAltRetro>
        <ButtonRetro onClick={closeSellConfirmationPopup}>No</ButtonRetro>
      </div>
    </PopupRetro>
  );
};
