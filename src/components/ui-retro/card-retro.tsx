'use client';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { Card } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface CardRetroProps extends PropsWithChildren<{}> {
  className: string;
}

export const CardRetro = ({ children, className }: CardRetroProps) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <motion.div
      whileHover={{ scale: 1.1 }} // ✅ Scales up on hover
      whileTap={{ scale: 0.95 }} // ✅ Shrinks slightly on click
      transition={{ type: 'spring', stiffness: 300, damping: 15 }} // ✅ Smooth spring effect
      //className={className}
    >
      <Card
        bg={color.bg}
        textColor={color.textColor}
        borderColor={color.borderColor}
        shadowColor={color.shadowColor}
        className={className}
      >
        {children}
      </Card>
    </motion.div>
  );
};
