import { useState } from 'react';

import bosses from '@/config/bosses.json';
import effects from '@/config/effects.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { abbreviateNumber } from '@/utils/abbreviate-number';
import { calculateBossScore } from '@/utils/calculate-endless-boss-scores';

import { GameOverPopup } from './popups/game-over-popup';
import { GameSettingsPopup } from './popups/game-settings-popup';
import { GameStatsPopup } from './popups/game-stats-popup';
import { GameWinnerPopup } from './popups/game-winner-popup';
import { PracticeSettingsPopup } from './popups/practice-settings-popup';
import { RestartConfirmationPopup } from './popups/restart-confirmation-popup';
import { ButtonAltRetro } from './ui-retro/button-alt-retro';
import { ButtonFlashRetro } from './ui-retro/button-flash-retro';
import { ButtonRetro } from './ui-retro/button-retro';
import { CardRetroAlt } from './ui-retro/card-retro-alt';

export const BossName = () => {
  const resetRun = useScoreStore((state) => state.resetRun);
  const [menuOpen, setMenuOpen] = useState(false);
  const newGamePlus = useScoreStore((state) => state.newGamePlus);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const bossEffect = useScoreStore((state) => state.bossEffect);
  const effect = effects.effects.find((b) => b.effect === bossEffect);

  const money = useScoreStore((state) => state.money);

  const { theme, isShopOpen, menu, setMenu, setIsShopOpen } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);
  const [gameSettingsPopup, setGameSettingsPopup] = useState(false);
  const [gameStatsPopup, setGameStatsPopup] = useState(false);
  const [restartPopup, setRestartPopup] = useState(false);
  const [practiceSettingsPopup, setPracticeSettingsPopup] = useState(false);

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
    case 'practice':
      title = 'Practice';
      break;
    default:
      title = 'Menu';
  }

  return (
    <div>
      {/* Mobile view */}
      <CardRetroAlt className='items-center gap-4 text-center md:hidden md:p-3'>
        {/* Center: Title */}
        <div className='flex flex-row justify-center'>
          <div>
            <div className='font-minecraft-bold flex-grow text-center text-3xl'>
              {title}
            </div>
            {menu === 'game' && (
              <div>
                Score{' '}
                <strong>
                  {abbreviateNumber(
                    calculateBossScore(boss.score, newGamePlus, boss.level)
                  )}
                </strong>{' '}
                or more to win
              </div>
            )}
            {menu === 'game' && boss.level % 3 === 0 && (
              <div className='font-bold'>{effect?.description}</div>
            )}

            {isShopOpen && (
              <div>
                Credits available: <strong>{abbreviateNumber(money)}</strong>
              </div>
            )}
          </div>
          {isShopOpen && menu === 'storymode' && (
            <div className='text-right'>
              <ButtonAltRetro onClick={() => setGameStatsPopup(true)}>
                Info
              </ButtonAltRetro>

              <ButtonRetro onClick={() => setRestartPopup(true)}>
                Restart
              </ButtonRetro>

              <ButtonRetro onClick={() => setMenu('main')}>Quit</ButtonRetro>
            </div>
          )}
          {menu === 'game' && (
            <>
              {bossProgress[level - 1] !== 2 ? (
                <div className='text-right'>
                  <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                    Settings
                  </ButtonRetro>

                  <ButtonRetro onClick={() => setGameOverPopup(true)}>
                    Quit
                  </ButtonRetro>
                </div>
              ) : (
                <div className='text-right'>
                  <ButtonRetro onClick={() => setGameSettingsPopup(true)}>
                    Settings
                  </ButtonRetro>
                  <ButtonFlashRetro onClick={() => setGameWinnerPopup(true)}>
                    ➡ Continue
                  </ButtonFlashRetro>
                </div>
              )}
            </>
          )}
          {menu === 'practice' && (
            <div className='text-right'>
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
          )}
          ;
        </div>
      </CardRetroAlt>
      {/* Browser View */}
      <CardRetroAlt className='hidden items-center gap-4 text-center md:block md:p-3'>
        {/* Center: Title */}
        <div className='font-minecraft-bold flex-grow text-center text-3xl'>
          {title}
        </div>
        {menu === 'game' && (
          <div>
            Score{' '}
            <strong>
              {abbreviateNumber(
                calculateBossScore(boss.score, newGamePlus, boss.level)
              )}
            </strong>{' '}
            or more to win
          </div>
        )}
        {menu === 'game' && boss.level % 3 === 0 && (
          <div className='font-bold'>{effect?.description}</div>
        )}
      </CardRetroAlt>
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
      <RestartConfirmationPopup
        isOpen={restartPopup}
        closeRestartConfirmationPopup={() => setRestartPopup(false)}
      ></RestartConfirmationPopup>
      <PracticeSettingsPopup
        isOpen={practiceSettingsPopup}
        closePracticeSettingsPopup={() => setPracticeSettingsPopup(false)}
      />
    </div>
  );
};
