'use client';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { Card } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface CardRetroAltProps extends PropsWithChildren<{}> {
  className: string;
}

export const CardRetroAlt = ({ children, className }: CardRetroAltProps) => {
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
        bg={color.altotherbg}
        textColor={color.altothertextColor}
        borderColor={color.altotherborderColor}
        shadowColor={color.altothershadowColor}
        className={className}
      >
        {children}
      </Card>
    </motion.div>
  );
};
