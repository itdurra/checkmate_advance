import React, { useState } from 'react';

import { GameOverPopup } from '@/components/popups/game-over-popup';
import { GameSettingsPopup } from '@/components/popups/game-settings-popup';
import { GameWinnerPopup } from '@/components/popups/game-winner-popup';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { GameStatsPopup } from './popups/game-stats-popup';
import { ButtonAltRetro } from './ui-retro/button-alt-retro';
import { ButtonFlashRetro } from './ui-retro/button-flash-retro';
import { ButtonRetro } from './ui-retro/button-retro';

export const BossUI = () => {
  const isPlayerTurn = useScoreStore((state) => state.isPlayerTurn);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const game = useScoreStore((state) => state.game);

  const { theme, menu, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);
  const [gameSettingsPopup, setGameSettingsPopup] = useState(false);
  const [gameStatsPopup, setGameStatsPopup] = useState(false);

  return (
    <>
      {menu === 'game' && (
        <CardRetro className='p-3 font-minecraft text-lg'>
          {bossProgress[level - 1] !== 2 ? (
            <>
              <div className='grid items-center gap-1'>
                <div className='text-center font-bold'>
                  {isPlayerTurn ? 'Your Turn' : 'Boss Turn'}
                </div>
                <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                  Display
                </ButtonRetro>
                <ButtonRetro onClick={() => setGameOverPopup(true)}>
                  Quit
                </ButtonRetro>
              </div>
            </>
          ) : (
            <>
              <div className='grid items-center gap-1'>
                <div className='text-center text-base font-bold'>Victory!</div>
                <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                  Display
                </ButtonRetro>
                <ButtonFlashRetro onClick={() => setGameWinnerPopup(true)}>
                  ➡ Continue
                </ButtonFlashRetro>
              </div>
            </>
          )}
        </CardRetro>
      )}
      <GameStatsPopup
        isOpen={gameStatsPopup}
        closeGameStatsPopup={() => setGameStatsPopup(false)}
      ></GameStatsPopup>
      <GameOverPopup
        isOpen={gameOverPopup}
        closeGameOverPopup={() => setGameOverPopup(false)}
      />
      <GameWinnerPopup
        isOpen={gameWinnerPopup}
        closeGameWinnerPopup={() => setGameWinnerPopup(false)}
      />
      <GameSettingsPopup
        isOpen={gameSettingsPopup}
        closeGameSettingsPopup={() => setGameSettingsPopup(false)}
      />
    </>
  );
};
