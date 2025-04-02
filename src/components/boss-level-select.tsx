import Image from 'next/image';

import { custom } from '@/components/chessboard/theme';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { roundedPortrait } from './portraits';

export const BossLevelSelect = () => {
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const setBossResult = useScoreStore((state) => state.setBossResult);
  const getNextThreeBosses = useScoreStore((state) => state.getNextThreeBosses);

  const { theme, setMenu, level, setLevel } = useGame();

  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const bossLevels = getNextThreeBosses();
  const unskippableBosses = [3, 6, 9];

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
    'bP',
  ];

  return (
    <CardRetroNoMotion className='h-[576px] text-center'>
      <div>Defeat all 9 bosses</div>
      <div className='mx-auto w-[95%] p-3'>
        <div className='grid grid-cols-3 gap-4'>
          {selectedBosses.map((boss, index) => {
            const pieceCode = pieceMap[boss.level - 1] || 'wP'; // Now using boss.level directly
            const bossState = bossProgress[boss.level - 1]; // Direct array access using level - 1

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
                    <Image
                      src={custom[pieceCode][0]}
                      alt='boss piece'
                      width={32}
                      height={32}
                      className='h-8 w-8'
                    />
                  </div>

                  <div className='font-minecraft text-lg uppercase'>
                    {difficulty}
                  </div>

                  {bossState === 0 ? (
                    <>
                      <ButtonAltRetro
                        onClick={() => {
                          setLevel(boss.level);
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
                              setBossResult(boss.level - 1, 1); // skip
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
