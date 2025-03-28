import { useState } from 'react';

import { CardRetro } from '@/components/ui-retro/card-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { custom } from '@/components/chessboard/theme';
import { useGame } from '@/context/game-context';

import { roundedPortrait } from './portraits';
import { useScoreStore } from '@/stores/useScoreStore';

export const BossLevelSelect = () => {
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const setBossResult = useScoreStore((state) => state.setBossResult);
  const getNextThreeBosses = useScoreStore((state) => state.getNextThreeBosses);

  const { theme, setMenu, level, setLevel, isShopOpen, setIsShopOpen } =
    useGame();

  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const bossLevels = getNextThreeBosses(); // [5, 6, 7] for example
  const validBossLevels = [1, 2, 3, 5, 6, 7, 8, 9, 10]; // boss 4 is skipped
  const unskippableBosses = [3, 7, 10];

  const selectedBosses = bosses.bosses.filter((b) =>
    bossLevels.includes(b.level)
  );

  type PieceCode =
    | 'wP'
    | 'wN'
    | 'wB'
    | 'wR'
    | 'wQ'
    | 'wK'
    | 'bP'
    | 'bN'
    | 'bB'
    | 'bR'
    | 'bQ'
    | 'bK';

  const pieceMap: PieceCode[] = [
    'bP',
    'bN',
    'bQ',
    'bP',
    'bN',
    'bQ',
    'bP',
    'bN',
    'bQ',
  ];

  return (
    <CardRetroNoMotion className='h-[576px] text-center'>
      <div>Defeat all 9 bosses</div>
      <div className='mx-auto w-[95%] p-3'>
        <div className='grid grid-cols-3 gap-4'>
          {selectedBosses.map((boss, index) => {
            const pieceCode = pieceMap[index] || 'wP';
            const bossIndex = validBossLevels.indexOf(boss.level);
            const bossState = bossProgress[bossIndex]; // 0 = not played, 1 = skipped, 2 = won

            let difficulty = '';
            if (boss.level <= 3) difficulty = 'Easy';
            else if (boss.level <= 7) difficulty = 'Medium';
            else difficulty = 'Hard';

            return (
              <div key={boss.level} className='flex flex-col items-center'>
                <CardRetro className='relative h-full p-2 text-center'>
                  {roundedPortrait(boss.image, setLevel, boss.level)}

                  <div className='font-minecraft-bold text-lg'>{boss.name}</div>
                  <div className='font-minecraft text-sm'>
                    Win Condition: Score at least {boss.score}
                  </div>
                  <div className='font-minecraft text-sm'>
                    Reward: {boss.description}
                  </div>

                  <div className='mt-4 flex justify-center'>
                    <img
                      src={custom[pieceCode][0]}
                      alt='boss piece'
                      className='h-8 w-8'
                    />
                  </div>

                  <div className='font-minecraft text-lg uppercase'>
                    {difficulty}
                  </div>

                  {/* Conditional buttons or overlay */}
                  {bossState === 0 ? (
                    <>
                      <ButtonAltRetro
                        onClick={() => {
                          setLevel(boss.level);
                          setBossResult(bossIndex, 2); // win
                          setMenu('game');
                        }}
                      >
                        Start
                      </ButtonAltRetro>
                      {!unskippableBosses.includes(boss.level) && (
                        <>
                          <div className='font-minecraft text-sm'>or</div>
                          <ButtonRetro
                            onClick={() => {
                              setBossResult(bossIndex, 1); // skip
                            }}
                          >
                            Skip
                          </ButtonRetro>
                        </>
                      )}
                    </>
                  ) : (
                    <div className='font-minecraft-bold absolute inset-0 z-10 flex items-center justify-center rounded bg-black/70 text-xl text-white'>
                      {bossState === 2 ? 'COMPLETED' : 'SKIPPED'}
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
