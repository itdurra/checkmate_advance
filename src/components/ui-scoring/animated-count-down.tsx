'use client';

import React from 'react';
import { AnimatePresence,motion } from 'framer-motion';

interface AnimatedCountDownProps {
  value: number;
}

export const AnimatedCountDown = ({ value }: { value: number }) => {
  const isUrgent = value <= 3;

  return (
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0, textShadow: '0 0 8px #fff'}}
        animate={{ y: 0, opacity: 1, textShadow: '0 0 0px transparent' }}
        exit={{ y: 10, opacity: 0, textShadow: '0 0 8px #fff' }}
        transition={{
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99],
          scale: { duration: 0.3, times: [0, 0.5, 1] },
        }}
        className='inline-block px-[2px] font-bold'>
        {value}
      </motion.span>
  );
};
