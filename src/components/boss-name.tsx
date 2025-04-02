import React, { useState } from 'react';

import { GameOverPopup } from '@/components/popups/game-over-popup';
import { GameWinnerPopup } from '@/components/popups/game-winner-popup';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { ButtonRetro } from './ui-retro/button-retro';

export const BossName = () => {
  const isPlayerTurn = useScoreStore((state) => state.isPlayerTurn);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const game = useScoreStore((state) => state.game);

  const { theme, isShopOpen, menu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);

  // Determine what to display based on the current menu state
  let title = '';
  switch (menu) {
    case 'storymode':
      if (isShopOpen) {
        title = 'Shop';
      } else {
        title = 'Level Select';
      }
      break;
    case 'game':
      title = boss.name;
      break;
    default:
      title = 'Menu';
  }

  return (
    <>
      <div>
        <CardRetro className='flex items-center gap-4 md:p-3'>
          {/* Center: Title */}
          <div className='font-minecraft-bold flex-grow text-center text-3xl'>
            {title}
          </div>
          {menu === 'game' && (
            <>
              {bossProgress[level - 1] !== 2 ? (
                <>
                  <div>{isPlayerTurn ? 'Your Turn' : 'Enemy Turn'}</div>
                  <ButtonRetro onClick={() => setGameOverPopup(true)}>
                    Quit
                  </ButtonRetro>
                </>
              ) : (
                <>
                  <div>You Win</div>
                  <ButtonRetro onClick={() => setGameWinnerPopup(true)}>
                    Next
                  </ButtonRetro>
                </>
              )}
            </>
          )}
        </CardRetro>
        <GameOverPopup
          isOpen={gameOverPopup}
          closeGameOverPopup={() => setGameOverPopup(false)}
        />
        <GameWinnerPopup
          isOpen={gameWinnerPopup}
          closeGameWinnerPopup={() => setGameWinnerPopup(false)}
        />
      </div>
    </>
  );
};
