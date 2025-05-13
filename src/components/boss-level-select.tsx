import { useEffect } from 'react';

import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import effects from '@/config/effects.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { abbreviateNumber } from '@/utils/abbreviate-number';
import { disablePieceCards } from '@/utils/apply-boss-effects';
import { calculateBossScore } from '@/utils/calculate-endless-boss-scores';
import { pieceMap } from '@/utils/piece-map';

import { roundedPortrait } from './portraits';

export const BossLevelSelect = () => {
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const newGamePlus = useScoreStore((state) => state.newGamePlus);
  const getNextThreeBosses = useScoreStore((state) => state.getNextThreeBosses);
  const setBossEffect = useScoreStore((state) => state.setBossEffect);
  const bossEffect = useScoreStore((state) => state.bossEffect);

  const { theme, setMenu, level, setLevel } = useGame();

  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const bossLevels = getNextThreeBosses();

  const selectedBosses = bosses.bosses.filter((b) =>
    bossLevels.includes(b.level)
  );

  const currentLevelIndex = bossProgress.findIndex((status) => status === 0);
  const mobileBosses = selectedBosses.filter(
    (boss) =>
      boss.level === currentLevelIndex + 1 ||
      boss.level === currentLevelIndex + 2
  );
  

  useEffect(() => {
    const level = currentLevelIndex + 1;
    if ((level - 1) % 3 === 0) {
      setBossEffect();
    }
    //console.log((level - 1) % 3);
  }, []);


  return (
    <CardRetroNoMotion className='text-center md:h-[576px]'>
      <div>Defeat all 9 bosses</div>
      <div className='mx-auto w-[95%] p-3'>
        {/* Mobile: Show only next boss */}

        <div className='block grid grid-cols-2 gap-4 lg:hidden'>
          {mobileBosses.map((boss) => {
            const pieceCode = pieceMap[boss.level - 1] || 'wP'; // Now using boss.level directly
            const bossState = bossProgress[boss.level - 1]; // Direct array access using level - 1
            const currentLevelIndex = bossProgress.findIndex(
              (status) => status === 0
            );
            const currentLevel = currentLevelIndex + 1; // because levels are 1-indexed
            const isEffectBoss = boss.level % 3 === 0;
            const effect = effects.effects.find((b) => b.effect === bossEffect);


            //hardcoding because lazy
            if (bossProgress[0] === 2) {
              level == 1;
            }

            return (
              <div
                key={boss.level}
                className='flex items-center justify-center'
              >
                <CardRetro className='relative h-96 w-32 p-2 text-center'>
                  <div className='px-4'>{roundedPortrait(boss.image, setLevel, boss.level)}</div>

                  <div className='font-minecraft-bold text-lg'>{boss.name}</div>

                  <div className='text-center font-minecraft text-sm text-gray-400'>
                    Score at least:
                    <div className='font-minecraft-bold rounded bg-[#c381b5] py-2 text-4xl leading-none text-black'>
                      {abbreviateNumber(
                        calculateBossScore(boss.score, newGamePlus, boss.level)
                      )}
                    </div>
                  </div>
                  <div className='my-2 text-center font-minecraft text-sm text-gray-400'>
                    Reward:
                    <div className='text-black'>{boss.description}</div>
                  </div>
                  {isEffectBoss && (
                    <div className='my-2 text-center font-minecraft text-sm text-gray-400'>
                      Effect:
                      <div className='text-black'>{effect?.description}</div>
                    </div>
                  )}

                  {bossState === 0 && boss.level === currentLevel ? (
                    <>
                      <ButtonAltRetro
                        onClick={() => {
                          setLevel(boss.level);
                          setMenu('game');
                          if (boss.level % 3 === 0) {
                            disablePieceCards();
                          }
                          //call disabledcards() when boss is level 3,6,9 so divisible by three
                        }}
                      >
                        Start
                      </ButtonAltRetro>
                    </>
                  ) : (
                    <div className='font-minecraft-bold absolute inset-0 z-10 flex items-center justify-center rounded bg-black/70 text-xl text-white'>
                      {bossState === 2 ? 'COMPLETE' : 'LOCKED'}
                    </div>
                  )}
                </CardRetro>
              </div>
            );
          })}
        </div>
        {/* Browser: Show three bosses */}
        <div className='hidden grid-cols-3 gap-4 lg:grid'>
          {selectedBosses.map((boss, index) => {
            const pieceCode = pieceMap[boss.level - 1] || 'wP'; // Now using boss.level directly
            const bossState = bossProgress[boss.level - 1]; // Direct array access using level - 1
            const currentLevelIndex = bossProgress.findIndex(
              (status) => status === 0
            );
            const currentLevel = currentLevelIndex + 1; // because levels are 1-indexed
            const isEffectBoss = boss.level % 3 === 0;
            const effect = effects.effects.find((b) => b.effect === bossEffect);

            //hardcoding because lazy
            if (bossProgress[0] === 2) {
              level == 1;
            } else if (bossProgress[1]) {
            }

            return (
              <div key={boss.level} className='flex flex-col items-center'>
                <CardRetro className='relative h-96 w-36 p-2 text-center'>
                  <div className='px-4'>{roundedPortrait(boss.image, setLevel, boss.level)}</div>

                  <div className='font-minecraft-bold text-lg'>{boss.name}</div>

                  <div className='text-center font-minecraft text-sm text-gray-400'>
                    Score at least:
                    <div className='font-minecraft-bold rounded bg-[#c381b5] py-2 text-4xl leading-none text-black'>
                      {abbreviateNumber(
                        calculateBossScore(boss.score, newGamePlus, boss.level)
                      )}
                    </div>
                  </div>
                  <div className='my-2 text-center font-minecraft text-sm text-gray-400'>
                    Reward:
                    <div className='text-black'>{boss.description}</div>
                  </div>
                  {isEffectBoss && (
                    <div className='my-2 text-center font-minecraft text-sm text-gray-400'>
                      Effect:
                      <div className='text-black'>{effect?.description}</div>
                    </div>
                  )}

                  {bossState === 0 && boss.level === currentLevel ? (
                    <>
                      <ButtonAltRetro
                        onClick={() => {
                          setLevel(boss.level);
                          setMenu('game');
                          if (boss.level % 3 === 0) {
                            disablePieceCards();
                          }
                        }}
                      >
                        Start
                      </ButtonAltRetro>
                    </>
                  ) : (
                    <div className='font-minecraft-bold absolute inset-0 z-10 flex items-center justify-center rounded bg-black/70 text-xl text-white'>
                      {bossState === 2 ? 'COMPLETE' : 'LOCKED'}
                    </div>
                  )}
                </CardRetro>
              </div>
            );
          })}
        </div>
      </div>
    </CardRetroNoMotion>
  );
};
