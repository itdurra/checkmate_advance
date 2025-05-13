import { useEffect } from 'react';

import { PopupRetro } from '@/components/ui-retro/popup-retro';
import hints from '@/config/hints.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';
import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';
import { enableAllCards } from '@/utils/apply-boss-effects';

import { StatsAndButtons } from './stats-and-buttons';

interface GameOverPopupProps {
  isOpen: boolean;
  closeGameOverPopup: () => void;
}

export const GameOverPopup = ({
  isOpen,
  closeGameOverPopup,
}: GameOverPopupProps) => {
  //music
  const playSting = useMusicStore((state) => state.playSting);
  //game
  const game = useScoreStore((state) => state.game);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const isGameOver = useScoreStore((state) => state.isGameOver);
  const { setMenu } = useGame();
  const { resetRun } = useScoreStore();
  const { resetStats } = useStatsStore();
  const randomHint =
    hints.hints[Math.floor(Math.random() * hints.hints.length)];

  const resignGame = () => {
    resetRun();
    resetStats();
    game.reset();
    setGamePosition(game.fen());
    closeGameOverPopup(); // Close popup after resigning
    setMenu('storymode');
    enableAllCards(); //needed for when cards are disabled
  };

  useEffect(() => {
    if (isOpen && isGameOver) {
      playSting('Fail Stinger 2');
    }
  }, [isOpen]);

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameOverPopup}>
      <div className='popup-body-div'>
        <p className='popup-title'>
          {isGameOver ? 'Game Over' : 'Resign Run?'}
        </p>
        <p className='popup-subtitle'>
          <span className='popup-subtitle-emphasis'>Hint:</span> {randomHint}
        </p>
        <StatsAndButtons
          onContinue={resignGame}
          text={isGameOver ? 'Continue' : 'Resign'}
        ></StatsAndButtons>
      </div>
    </PopupRetro>
  );
};
