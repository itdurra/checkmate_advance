'use client';

import { motion } from 'framer-motion';

import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

// 💫 Motion wrapper for values
const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ y: -10, opacity: 0, textShadow: '0 0 8px #fff' }}
      animate={{ y: 0, opacity: 1, textShadow: '0 0 0px transparent' }}
      exit={{ y: 10, opacity: 0, textShadow: '0 0 8px #fff' }}
      transition={{
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        scale: { duration: 0.3, times: [0, 0.5, 1] },
      }}
      className='inline-block px-[2px] font-bold'
    >
      {value}
    </motion.span>
  );
};

export const ScoreDisplay = () => {
  const score = useScoreStore((state) => state.score);
  const turns = useScoreStore((state) => state.turns);
  const money = useScoreStore((state) => state.money);
  const pieceScore = useScoreStore((state) => state.pieceScore);
  const squareScore = useScoreStore((state) => state.squareScore);
  const materialAdvantage = useScoreStore((state) =>
    state.getMaterialAdvantage()
  );

  const { theme, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];



  return (
    <>
      <CardRetro className='mt-6 text-left text-lg md:p-4'>
        <div className='flex flex-col place-items-center gap-2 font-minecraft'>
          {/* Final Score */}
          <div className='ml-2 text-3xl md:text-4xl'>
            <AnimatedNumber value={score} />
          </div>
          <div>Game Score</div>
          <div className='text-sm'>Score {boss.score} points to win</div>
        </div>
      </CardRetro>

      <CardRetro className='mt-6 text-left md:p-4'>
        <div className='font-minecraft-bold flex flex-col items-center gap-2 text-xl  md:text-3xl'>
          <div className='flex flex-row items-end gap-4'>
            {/* Piece Score */}
            <div className='flex flex-col items-center'>
              <AnimatedNumber value={pieceScore} />
              <span className='mt-1 text-xs'>(Piece</span>
            </div>

            {/* + */}
            <div className='text-2xl md:text-3xl'>+</div>

            {/* Square Score */}
            <div className='flex flex-col items-center'>
              <AnimatedNumber value={squareScore} />
              <span className='mt-1 text-xs'>Square)</span>
            </div>

            {/* × */}
            <div className='text-2xl md:text-3xl'>×</div>

            {/* Material Advantage */}
            <div className='flex flex-col items-center'>
              <AnimatedNumber value={materialAdvantage} />
              <span className='mt-1 text-xs'>Mat.</span>
            </div>
          </div>
        </div>
      </CardRetro>

      <CardRetro className='mt-6 text-left text-lg md:p-4'>
        <div className='grid grid-cols-2 place-items-center gap-2 font-minecraft'>
          <div className=''>
            Turns: <AnimatedNumber value={turns} />
          </div>
          <div className=''>
            $<AnimatedNumber value={money} />
          </div>
        </div>
      </CardRetro>
    </>
  );
};
