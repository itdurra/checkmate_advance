'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion'; // ← import motion
import { Button } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';

interface ButtonAltRetroProps extends PropsWithChildren<{}> {
  onClick: () => void;
  className?: string;
}

export const ButtonFlashRetro = ({
  children,
  onClick,
  className,
}: ButtonAltRetroProps) => {
  const playSFX = useMusicStore((state) => state.playSFX);

  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1], // Pulse between normal and 5% larger size
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity, // Loop forever
        ease: 'easeInOut',
      }}
    >
      <Button
        bg={color.altbg}
        textColor={color.alttextColor}
        borderColor={color.altborderColor}
        shadow={color.altshadowColor}
        onClick={() => {
          onClick();
          playSFX('click5');
        }}
        className={`${className} transition-transform duration-200`}
      >
        {children}
      </Button>
    </motion.div>
  );
};
