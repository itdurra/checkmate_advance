import React, { useRef,useState } from 'react';
import Image from 'next/image';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { useScoreStore } from '@/stores/useScoreStore';

interface GameOverPopupProps {
  isOpen: boolean;
  closeGameOverPopup: () => void;
}

export const GameOverPopup = ({ isOpen, closeGameOverPopup }: GameOverPopupProps) => {
    const game = useScoreStore((state) => state.game);
    const setGamePosition = useScoreStore((state) => state.setGamePosition);
    const gameOver = useScoreStore((state) => state.gameOver);
  
  const {
    level,
    setEnemyMessage,
    setPlayerMessage,
    updateBossProgress,
    bossProgression,
    setMenu,
  } = useGame();
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
    closeGameOverPopup(); // Close popup after resigning
    setMenu('storymode');
  };


  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameOverPopup}>
      <Image
        src={boss.image}
        width={200}
        height={200}
        priority
        quality={100}
        alt='Enemy Profile Picture'
      />
      <div className = 'text-center'>
      <h2 className='font-minecraft-bold text-lg text-center'>{boss.name}</h2>
      <ButtonRetro onClick={resignGame}>Main Menu</ButtonRetro>
      </div>
    </PopupRetro>
  );
};
