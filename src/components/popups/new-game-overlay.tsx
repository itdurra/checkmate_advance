// components/NewGameOverlay.tsx
import { AnimatePresence, motion } from 'framer-motion';

import { useScoreStore } from '@/stores/useScoreStore';

export const NewGameOverlay = ({
  show,
  text,
}: {
  show: boolean;
  text: string;
}) => {
  const setAnimateNewGame = useScoreStore((state) => state.setAnimateNewGame);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key='new-game'
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setAnimateNewGame(false)}
          //onAnimationStart={() => playSFX('')}
          className='font-minecraft-bold
pointer-events-none fixed inset-0 z-50 flex items-center justify-center text-5xl text-[#fefcd0]'
        >
          <div className='relative inline-flex items-center justify-center rounded-lg px-8 py-6'>
            <div className='absolute inset-0 rounded-lg bg-[#ddceb4] blur-sm' />
            <span className='relative z-10 uppercase'>{text}</span>
            <span
              className='absolute inset-0 flex animate-pulse items-center justify-center uppercase blur-sm'
              style={{ color: '#c381b5', opacity: 0.6 }}
            >
              {text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
