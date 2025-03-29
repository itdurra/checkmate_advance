import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { Stats } from '@/components/popups/stats';

import { useScoreStore } from '@/stores/useScoreStore';

interface GameWinnerPopupProps {
  isOpen: boolean;
  closeGameWinnerPopup: () => void;
}

export const GameWinnerPopup = ({
  isOpen,
  closeGameWinnerPopup,
}: GameWinnerPopupProps) => {
  const game = useScoreStore((state) => state.game);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const gameOver = useScoreStore((state) => state.gameOver);

  const { level, updateBossProgress, bossProgression, setMenu, setIsShopOpen } =
    useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const [isFlagPopupOpen, setIsFlagPopupOpen] = useState(false);

  const resignGame = () => {
    gameOver();
    //console.log('Player resigned. Updating loss count.');
    updateBossProgress(level, 'loss'); // Register loss in boss progression
    game.reset();
    setIsShopOpen(true);
    setGamePosition(game.fen());
    closeGameWinnerPopup(); // Close popup after resigning
    setMenu('storymode');
  };

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameWinnerPopup}>
      <div className='text-center'>
        <Image
          src={boss.image}
          width={200}
          height={200}
          priority
          quality={100}
          alt='Enemy Profile Picture'
          className='mx-auto'
        />
        <p className='font-minecraft-bold mb-2 text-3xl drop-shadow-md'>
          You Win
        </p>        
        <p>Reward: {boss.description}</p>
        <div className='w-full max-w-md mt-2'>
          <Stats></Stats>
        </div>
        <ButtonRetro className='mt-4' onClick={resignGame}>
          Main Menu
        </ButtonRetro>
      </div>
    </PopupRetro>
  );
};
