'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { GameOverPopup } from '@/components/game-over-popup';
import { GameWinnerPopup } from '@/components/game-winner-popup';
import { CardRetro } from '@/components/ui-retro/card-retro';

import { BarRetro } from '@/components/ui-retro/bar-retro';
import { AccordionRetro } from '@/components/ui-retro/accordion-retro';
import { PieceValues } from '@/components/piece-values';

import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

// 💫 Motion wrapper for values
const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: 1.2, opacity: 1 }}
      exit={{ scale: 1, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='font-bold'
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

  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);

  useEffect(() => {
    if (turns === 0) setGameOverPopup(true);
  }, [turns]);

  useEffect(() => {
    if (score >= boss.score) setGameWinnerPopup(true);
  }, [score, boss.score]);

  return (
    <>
      <CardRetro className='mt-4 text-left text-lg md:p-4'>
        <div className='flex flex-col place-items-center gap-2 font-minecraft'>
          {/* Final Score */}
          <div className='ml-2 text-3xl md:text-4xl'>
            <AnimatedNumber value={score} />
          </div>
          <div>Game Score</div>
          <div className='text-sm'>Score 2000 points to win</div>
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

      <CardRetro className='mt-4 text-left text-lg md:p-4'>
        <div className='grid grid-cols-2 place-items-center gap-2 font-minecraft'>
          <div className=''>
            Turns: <AnimatedNumber value={turns} />
          </div>
          <div className=''>
            $<AnimatedNumber value={money} />
          </div>
        </div>
      </CardRetro>

      <GameOverPopup
        isOpen={gameOverPopup}
        closeGameOverPopup={() => setGameOverPopup(false)}
      />
      <GameWinnerPopup
        isOpen={gameWinnerPopup}
        closeGameWinnerPopup={() => setGameWinnerPopup(false)}
      />
    </>
  );
};
