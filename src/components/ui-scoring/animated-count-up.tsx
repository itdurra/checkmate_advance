'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCountUpProps {
  value: number;
}

export const AnimatedCountUp = ({ value }: AnimatedCountUpProps) => {
  const isRapidIncrease = value >= 10; // Example threshold for visual feedback

  return (
    <motion.span
      key={value}
      initial={{ 
        y: 10, 
        opacity: 0,
        textShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
      }}
      animate={{ 
        y: 0, 
        opacity: 1,
        textShadow: '0 0 0px transparent',
      }}
      transition={{
        duration: 0.4,
        ease: [0.2, 0.8, 0.4, 1],
        opacity: { duration: 0.3 }
      }}
      className='inline-block px-[2px] font-bold'
    >
      {value}
    </motion.span>
  );
};