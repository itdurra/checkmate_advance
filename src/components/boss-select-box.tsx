'use client';
import React, { useState } from 'react';

import { GameStatsPopup } from '@/components/popups/game-stats-popup';
import { RestartConfirmationPopup } from '@/components/popups/restart-confirmation-popup';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { QuitConfirmationPopup } from './popups/quit-confirmation-popup';
import { CardRetroAlt } from './ui-retro/card-retro-alt';

export const BossSelectBox = () => {
  const money = useScoreStore((state) => state.money);
  const { theme, level, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameStatsPopup, setGameStatsPopup] = useState(false);
  const [restartPopup, setRestartPopup] = useState(false);
  const [quitPopup, setQuitPopup] = useState(false);

  return (
    <>
      <CardRetroAlt className='items center mt-6 flex hidden flex-col gap-2 p-2 text-center md:block'>
        <div className='flex flex-row justify-center gap-2 md:flex-col'>
          <ButtonAltRetro onClick={() => setGameStatsPopup(true)}>
            Info
          </ButtonAltRetro>
          <ButtonRetro onClick={() => setRestartPopup(true)}>
            Restart
          </ButtonRetro>
          <ButtonRetro onClick={() => setQuitPopup(true)}>Quit</ButtonRetro>
        </div>
      </CardRetroAlt>
      <GameStatsPopup
        isOpen={gameStatsPopup}
        closeGameStatsPopup={() => setGameStatsPopup(false)}
      ></GameStatsPopup>
      <RestartConfirmationPopup
        isOpen={restartPopup}
        closeRestartConfirmationPopup={() => setRestartPopup(false)}
      ></RestartConfirmationPopup>
      <QuitConfirmationPopup
        isOpen={quitPopup}
        closeQuitConfirmationPopup={() => setQuitPopup(false)}
      ></QuitConfirmationPopup>
    </>
  );
};
