import React, { useState } from 'react';
import Image from 'next/image';

import { Stats } from '@/components/popups/stats';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { applyBossRewards } from '@/utils/apply-boss-rewards';
import { ButtonFlashRetro } from '../ui-retro/button-flash-retro';

interface GameWinnerPopupProps {
  isOpen: boolean;
  closeGameWinnerPopup: () => void;
}

export const GameWinnerPopup = ({
  isOpen,
  closeGameWinnerPopup,
}: GameWinnerPopupProps) => {
  const game = useScoreStore((state) => state.game);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const gameOver = useScoreStore((state) => state.gameOver);

  const { level, updateBossProgress, bossProgression, setMenu, setIsShopOpen } =
    useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const winnerGame = () => {
    gameOver();
    game.reset();
    setIsShopOpen(true);
    setGamePosition(game.fen());
    closeGameWinnerPopup(); // Close popup
    setMenu('storymode');
    //reward player for beating boss
    applyBossRewards(level);
  };

  const completeGame = () => {
    gameOver();
    game.reset();
    //setIsShopOpen(true);
    setGamePosition(game.fen());
    closeGameWinnerPopup(); // Close popup
    setMenu('settings');
    //reward player for beating boss
    applyBossRewards(level);
  };

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameWinnerPopup}>
      {bossProgress['8'] !== 2 ? (
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
          <div className='mt-2 w-full max-w-md'>
            <Stats></Stats>
          </div>
          <ButtonFlashRetro className='mt-4' onClick={winnerGame}>
            Main Menu
          </ButtonFlashRetro>
        </div>
      ) : (
        <div className='text-center'>
          <p className='font-minecraft-bold mb-2 text-3xl drop-shadow-md'>
            You Beat the Demo!
          </p>
          <div className='text-md mx-auto max-w-72'>Reward: a handwritten thank you letter. Just send your address via the Feedback form!</div>
          <div className='mt-2'>
            <ButtonRetro
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSd2UyVk5W1cDmfaQTHdwdePJNI62BaiTVbQ67Se_ZZjY6GYLw/viewform?usp=sharing',
                  '_blank'
                )
              }
              className='my-4 w-64 py-1 text-lg'
            >
              Give Feedback
            </ButtonRetro>
          </div>
          <div className='mt-2'>
            <ButtonRetro
              onClick={() => setMenu('settings')}
                            className='my-4 w-64 py-1 text-lg'
            >
           Acknowledgements
            </ButtonRetro>
          </div>
          <div className='mt-6'>
            <Stats></Stats>
          </div>
        </div>
      )}
    </PopupRetro>
  );
};
