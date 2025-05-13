import { AnimatePresence, motion } from 'framer-motion';

import type { Card } from '@/types/card';

import { ActiveCardDisplay } from '../active-card-display';
import { CardRetro } from '../ui-retro/card-retro';

export const FormulaDisplay = ({
  show,
  label,
  value,
  cards,
  onComplete,
}: {
  show: boolean;
  label: string;
  value: number;
  cards: Card[];
  onComplete?: () => void;
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key='formula-display'
          initial={{ opacity: 1, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          onAnimationComplete={onComplete}
          className='pointer-events-none inset-0 z-50 flex items-center justify-center'
        >
          <CardRetro className='font-minecraft-bold relative flex flex-col items-center gap-4 px-8 py-6'>
            {/* Main Text */}
            <div className='relative z-10 flex flex-col items-center text-4xl uppercase'>
              <span className=''>{label}</span>
              <span className='text-6xl'>{value}</span>
            </div>

            {/* Cards */}
            <div className='relative z-10 mt-2 flex gap-2'>
              {cards.map((card, index) => (
                <ActiveCardDisplay
                  key={`${card.id}-${index}`}
                  card={card}
                  onSell={function (): void {}}
                ></ActiveCardDisplay>
              ))}
            </div>
          </CardRetro>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
