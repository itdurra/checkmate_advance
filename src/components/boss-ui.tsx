import React, { useState } from 'react';

import { GameOverPopup } from '@/components/popups/game-over-popup';
import { GameSettingsPopup } from '@/components/popups/game-settings-popup';
import { GameWinnerPopup } from '@/components/popups/game-winner-popup';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { MoveHistory } from './chessboard/move-history';
import { GameStatsPopup } from './popups/game-stats-popup';
import { PracticeSettingsPopup } from './popups/practice-settings-popup';
import { ButtonAltRetro } from './ui-retro/button-alt-retro';
import { ButtonFlashRetro } from './ui-retro/button-flash-retro';
import { ButtonRetro } from './ui-retro/button-retro';
import { CardRetroAlt } from './ui-retro/card-retro-alt';

export const BossUI = () => {
  const isPlayerTurn = useScoreStore((state) => state.isPlayerTurn);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const resetRun = useScoreStore((state) => state.resetRun);

  const { theme, menu, level, setMenu, setIsShopOpen, isShopOpen } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);
  const [gameSettingsPopup, setGameSettingsPopup] = useState(false);
  const [practiceSettingsPopup, setPracticeSettingsPopup] = useState(false);
  const [gameStatsPopup, setGameStatsPopup] = useState(false);

  return (
    <>
      {menu === 'game' && (
        <CardRetroAlt className='p-3 font-minecraft text-lg'>
          {bossProgress[level - 1] !== 2 ? (
            <>
              <div className='items-center gap-1'>
                <MoveHistory></MoveHistory>
                <div className='text-center font-bold'>
                  {isPlayerTurn ? 'Your Turn' : 'Boss Turn'}
                </div>
                {/* Large screens */}
                <div className='hidden grid-cols-2 lg:grid'>
                  <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                    Settings
                  </ButtonRetro>
                  <ButtonRetro onClick={() => setGameOverPopup(true)}>
                    Quit
                  </ButtonRetro>
                </div>
                {/* Medium screens - truncate settings text */}
                <div className='grid grid-cols-2 lg:hidden'>
                  <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                    ⚙️
                  </ButtonRetro>
                  <ButtonRetro onClick={() => setGameOverPopup(true)}>
                    Quit
                  </ButtonRetro>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='grid items-center gap-1'>
                <div className='text-center text-base font-bold'>Victory!</div>
                <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                  Settings
                </ButtonRetro>
                <ButtonFlashRetro onClick={() => setGameWinnerPopup(true)}>
                  ➡ Continue
                </ButtonFlashRetro>
              </div>
            </>
          )}
        </CardRetroAlt>
      )}
      {menu === 'practice' && (
        <CardRetroAlt className='p-3 font-minecraft text-lg'>
          <>
            <div className='items-center gap-1'>
              <div className='text-center font-bold'>
                {isPlayerTurn ? 'Your Turn' : 'Boss Turn'}
              </div>
              {/* Large screens */}
              <div className='hidden grid-cols-2 lg:grid'>
                <ButtonRetro onClick={() => setPracticeSettingsPopup(true)}>
                  Settings
                </ButtonRetro>
                <ButtonRetro
                  onClick={() => {
                    resetRun();
                    setIsShopOpen(false);
                    setMenu('main');
                  }}
                >
                  Quit
                </ButtonRetro>
                {isShopOpen ? (
                  <ButtonAltRetro onClick={() => setIsShopOpen(false)}>
                    Game
                  </ButtonAltRetro>
                ) : (
                  <ButtonAltRetro onClick={() => setIsShopOpen(true)}>
                    Shop
                  </ButtonAltRetro>
                )}
              </div>
              {/* Medium screens - truncate settings text */}
              <div className='grid grid-cols-2 lg:hidden'>
                <ButtonRetro onClick={() => setPracticeSettingsPopup(true)}>
                  ⚙️
                </ButtonRetro>
                <ButtonRetro
                  onClick={() => {
                    resetRun();
                    setIsShopOpen(false);
                    setMenu('main');
                  }}
                >
                  Quit
                </ButtonRetro>
                {isShopOpen ? (
                  <ButtonRetro onClick={() => setIsShopOpen(false)}>
                    Game
                  </ButtonRetro>
                ) : (
                  <ButtonAltRetro onClick={() => setIsShopOpen(true)}>
                    Shop
                  </ButtonAltRetro>
                )}
              </div>
            </div>
          </>
        </CardRetroAlt>
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
      <PracticeSettingsPopup
        isOpen={practiceSettingsPopup}
        closePracticeSettingsPopup={() => setPracticeSettingsPopup(false)}
      />
    </>
  );
};
