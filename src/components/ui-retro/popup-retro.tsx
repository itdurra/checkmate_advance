'use client';
import { PropsWithChildren } from 'react';
import { Popup } from 'pixel-retroui';

import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

interface PopupRetroProps extends PropsWithChildren<{}> {
  isOpen: boolean;
  onClose: () => void;
}

export const PopupRetro = ({ children, isOpen, onClose }: PopupRetroProps) => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      bg={boss.bg}
      baseBg={boss.baseBg}
      textColor={boss.textColor}
      borderColor={boss.borderColor}
    >
      {children}
    </Popup>
  );
};
