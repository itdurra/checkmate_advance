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
            const currentLevelIndex = bossProgress.findIndex((status) => status === 0);
            const currentLevel = currentLevelIndex + 1; // because levels are 1-indexed

            //hardcoding because lazy
            if(bossProgress[0] === 2){
              level == 1;
            }else if(bossProgress[1]){
              
            }
            const nextBossState = bossProgress[boss.level]; // used to tell which level we are on

            let difficulty = '';
            if (boss.level <= 3) difficulty = 'Easy';
            else if (boss.level <= 7) difficulty = 'Medium';
            else difficulty = 'Hard';

            return (
              <div key={boss.level} className='flex flex-col items-center'>
                <CardRetro className='relative h-full p-2 text-center'>
                  {roundedPortrait(boss.image, setLevel, boss.level)}

                  <div className='font-minecraft-bold text-lg'>{boss.name}</div>

                  <div className='text-center font-minecraft text-sm text-gray-400'>
                    Score at least:
                    <div className='font-minecraft-bold text-4xl leading-none text-black rounded py-2 bg-[#c381b5]'>
                      {boss.score}
                    </div>
                  </div>
                  <div className='mt-2 text-center font-minecraft text-sm text-gray-400'>
                    Reward: 
                    <div className='text-black'>
                    {boss.description}
                    </div>
                  </div>

                  <div className='mt-2 flex justify-center'>
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

                  {bossState === 0 && boss.level === currentLevel ? (
                    <>
                      <ButtonAltRetro
                        onClick={() => {
                          setLevel(boss.level);
                          setMenu('game');
                        }}
                      >
                        Start
                      </ButtonAltRetro>
                    </>
                  ) : (
                    <div className='font-minecraft-bold absolute inset-0 z-10 flex items-center justify-center rounded bg-black/70 text-xl text-white'>
                      {bossState === 2 ? 'COMPLETED' : 'LOCKED'}
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
