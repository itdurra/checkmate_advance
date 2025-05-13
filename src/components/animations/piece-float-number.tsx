import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const PieceFloatNumber = ({
  show,
  value,
  onComplete,
}: {
  show: boolean;
  value: number;
  onComplete?: () => void;
}) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const textColor = value > 0 ? color.altbaseBg : color.bg;


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -40 }}
          exit={{ opacity: 0, y: -60}}
        transition={{
            type:'spring',
            stiffness: 500,
            damping: 30,
            duration: 0.15
        }}
          style={{
            color: 'black',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          className='absolute left-1/2 top-0 -translate-x-1/2'
          onAnimationComplete={onComplete}
        >
          {value > 0 ? `+${value}` : value}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
