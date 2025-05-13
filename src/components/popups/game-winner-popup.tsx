import React, { useEffect, useState } from 'react';

import { Stats } from '@/components/popups/stats';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';
import { useScoreStore } from '@/stores/useScoreStore';
import { enableAllCards } from '@/utils/apply-boss-effects';
import { applyBossRewards } from '@/utils/apply-boss-rewards';

import { StatsAndButtons } from './stats-and-buttons';

interface GameWinnerPopupProps {
  isOpen: boolean;
  closeGameWinnerPopup: () => void;
}

export const GameWinnerPopup = ({
  isOpen,
  closeGameWinnerPopup,
}: GameWinnerPopupProps) => {
  //music
  const playSting = useMusicStore((state) => state.playSting);
  //game
  const game = useScoreStore((state) => state.game);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const gameOver = useScoreStore((state) => state.gameOver);
  const newGamePlus = useScoreStore((state) => state.newGamePlus);
  const setNewGamePlus = useScoreStore((state) => state.setNewGamePlus);

  const { level, updateBossProgress, bossProgression, setMenu, setIsShopOpen } =
    useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme, setLevel } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  useEffect(() => {
    if (isOpen) {
      if(bossProgress['8'] !== 2){
        playSting('Victory Stinger 1');
      } else {
        playSting('Epilogue');
      }
    }
  }, [isOpen]);

  const winnerGame = () => {
    gameOver();
    game.reset();
    setIsShopOpen(true);
    setGamePosition(game.fen());
    closeGameWinnerPopup(); // Close popup
    setMenu('storymode');
    //reward player for beating boss
    applyBossRewards(level);
    enableAllCards(); //needed for when cards are disabled
  };

  const completeGame = () => {
    gameOver();
    game.reset();
    setIsShopOpen(true);
    setGamePosition(game.fen());
    closeGameWinnerPopup(); // Close popup
    setMenu('storymode');
    //reward player for beating boss
    applyBossRewards(level);
    enableAllCards(); //needed for when cards are disabled
    setLevel(1);
    setNewGamePlus();
  };

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameWinnerPopup}>
      {bossProgress['8'] !== 2 ? (
        <div className='popup-body-div'>
          <p className='popup-title'>You Win</p>
          <p className='popup-subtitle'>
            <span className='popup-subtitle-emphasis'>Reward:</span>{' '}
            {boss.description}
          </p>
          <StatsAndButtons
            onContinue={winnerGame}
            text='Continue'
          ></StatsAndButtons>
        </div>
      ) : (
        <div className='text-center'>
          <p className='popup-title'>You Beat the Game!</p>
          <p className='popup-subtitle'>
            <span className='popup-subtitle-emphasis'>Reward: </span> You have
            unlocked endless mode. Continue playing to get a high score!
          </p>
          <StatsAndButtons
            onContinue={completeGame}
            text='Endless Mode'
          ></StatsAndButtons>
        </div>
      )}
    </PopupRetro>
  );
};
