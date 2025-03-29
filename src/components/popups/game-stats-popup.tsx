import React from 'react';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { useScoreStore } from '@/stores/useScoreStore';
import { Stats } from '@/components/popups/stats';

interface GameStatsPopupProps {
  isOpen: boolean;
  closeGameStatsPopup: () => void;
}

export const GameStatsPopup = ({
  isOpen,
  closeGameStatsPopup,
}: GameStatsPopupProps) => {

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameStatsPopup}>
      <div className='text-center font-minecraft text-sm'>
        <Stats></Stats>
        <div className='mt-4'>
          <ButtonRetro onClick={closeGameStatsPopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
