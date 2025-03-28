import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { useScoreStore } from '@/stores/useScoreStore';

interface NotEnoughMoneyPopupProps {
  isOpen: boolean;
  closeNotEnoughMoneyPopup: () => void;
}

export const NotEnoughMoneyPopup = ({
  isOpen,
  closeNotEnoughMoneyPopup,
}: NotEnoughMoneyPopupProps) => {
  const game = useScoreStore((state) => state.game);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const gameOver = useScoreStore((state) => state.gameOver);

  const { level, setMenu, setIsShopOpen } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const [isFlagPopupOpen, setIsFlagPopupOpen] = useState(false);

  return (
    <PopupRetro isOpen={isOpen} onClose={closeNotEnoughMoneyPopup}>
        <div className='flex justify-center mb-4'>
      <Image
        src={boss.image}
        width={200}
        height={200}
        priority
        quality={100}
        alt='Enemy Profile Picture'
      />
      </div>
      <div className='text-center'>
        <p>Not enough money... </p>
        <p>Win a game to earn some cash.</p>
      </div>
    </PopupRetro>
  );
};
