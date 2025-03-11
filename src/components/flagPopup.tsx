import React, { useRef,useState } from 'react';
import Image from 'next/image';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface FlagPopupProps {
  isOpen: boolean;
  closeFlagPopup: () => void;
}

export const FlagPopup = ({ isOpen, closeFlagPopup }: FlagPopupProps) => {
  const {
    engine,
    level,
    game,
    setGamePosition,
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
  //const offerDrawRef = useRef(false);

  const resignGame = () => {
    console.log('Player resigned. Updating loss count.');
    updateBossProgress(level, 'loss'); // Register loss in boss progression
    setEnemyMessage('You have resigned. The AI wins!');
    setPlayerMessage('Game Over');
    game.reset();
    console.log(game.fen());
    setGamePosition(game.fen());
    closeFlagPopup(); // Close popup after resigning
    setMenu('storymode');
  };

  //TODO fix this as offerDraw is called correctly
  /*
  function offerDraw() {
    offerDrawRef.current = true;

    // Evaluate the position
    engine.evaluatePosition(game.fen(), boss.depth);
    engine.onMessage(({ positionEvaluation }) => {
      if (positionEvaluation !== undefined && offerDrawRef.current) {
        const evaluation = parseInt(positionEvaluation, 10) / 100;
        if (evaluation >= -1 && evaluation <= 1) {
          console.log('Draw accepted!');
          updateBossProgress(level, 'draw');
          setEnemyMessage('Draw accepted.');
          setPlayerMessage('Game ends in a draw.');
          game.reset();
          setGamePosition(game.fen());
          setMenu('storymode');
        } else {
          console.log('Draw rejected!');
          setEnemyMessage('Draw rejected!!');
          setEnemyMessage('The AI refuses the draw.');
        }
      }
      console.log("testing", offerDrawRef, positionEvaluation);
      offerDrawRef.current = false;
    });
  }
  */

  return (
    <PopupRetro isOpen={isOpen} onClose={closeFlagPopup}>
      <Image
        src={boss.image}
        width={200}
        height={200}
        priority
        quality={100}
        alt='Enemy Profile Picture'
      />
      <h2 className='font-minecraft-bold text-lg'>{boss.name}</h2>
      <div className='font-minecraft text-sm'>Win: {bossProgression[level]['win']} Draw: {bossProgression[level]['draw']} Loss: {bossProgression[level]['loss']}</div>
      <ButtonRetro onClick={resignGame}>Resign</ButtonRetro>
    </PopupRetro>
  );
};
