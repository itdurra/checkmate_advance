import { useState } from 'react';
import { motion } from 'framer-motion';

import { useScoreStore } from '@/stores/useScoreStore';

export const TooltipRetro = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  const showTooltips = useScoreStore((state) => state.showTooltips);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && showTooltips && (
        <motion.div
          className="tooltip"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};
