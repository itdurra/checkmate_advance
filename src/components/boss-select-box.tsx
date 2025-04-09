'use client';
import React, { useState } from 'react';

import { GameStatsPopup } from '@/components/popups/game-stats-popup';
import { RestartConfirmationPopup } from '@/components/popups/restart-confirmation-popup';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

export const BossSelectBox = () => {
  const money = useScoreStore((state) => state.money);
  const resetRun = useScoreStore((state) => state.resetRun);
  const {
    theme,
    mapping,
    setMapping,
    menu,
    setMenu,
    level,
    bossProgression,
    setIsShopOpen,
    isShopOpen,
  } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameStatsPopup, setGameStatsPopup] = useState(false);
  const [restartPopup, setRestartPopup] = useState(false);

  return (
    <>
      <CardRetro className='items center mt-6 flex flex-col gap-2 p-2 text-center'>
        <div className='font-minecraft-bold text-lg'>Credits: {money}</div>
        <div className='flex flex-row justify-center gap-2 md:flex-col'>
          <ButtonAltRetro onClick={() => setGameStatsPopup(true)}>
            Info
          </ButtonAltRetro>
          <ButtonRetro onClick={() => setRestartPopup(true)}>
            Restart
          </ButtonRetro>
          <ButtonRetro onClick={() => setMenu('main')}>Quit</ButtonRetro>
        </div>
      </CardRetro>
      <GameStatsPopup
        isOpen={gameStatsPopup}
        closeGameStatsPopup={() => setGameStatsPopup(false)}
      ></GameStatsPopup>
      <RestartConfirmationPopup
        isOpen={restartPopup}
        closeRestartConfirmationPopup={() => setRestartPopup(false)}
      ></RestartConfirmationPopup>
    </>
  );
};
