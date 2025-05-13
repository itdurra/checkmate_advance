'use client';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

interface AccordionRetroProps extends PropsWithChildren<{}> {
  className: string;
  title: string;
}

export const AccordionRetro = ({
  children,
  className,
  title,
}: AccordionRetroProps) => {
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
      <Accordion
        bg={color.bg}
        textColor={color.textColor}
        borderColor={color.borderColor}
        shadowColor={color.shadowColor}
        className={className}
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};
