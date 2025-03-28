import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

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

  const { level, updateBossProgress, bossProgression, setMenu } = useGame();
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
    setGamePosition(game.fen());
    closeGameWinnerPopup(); // Close popup after resigning
    setMenu('storymode');
  };

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameWinnerPopup}>
      <Image
        src={boss.image}
        width={200}
        height={200}
        priority
        quality={100}
        alt='Enemy Profile Picture'
      />
      <div className='text-center'>
        <h2 className='font-minecraft-bold text-center text-lg'>{boss.name}</h2>
        <ButtonRetro onClick={resignGame}>Main Menu</ButtonRetro>
      </div>
    </PopupRetro>
  );
};
