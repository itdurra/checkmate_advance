import React from 'react';

import { Stats } from '@/components/popups/stats';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';

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
