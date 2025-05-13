import React from 'react';

import { PopupRetro } from '@/components/ui-retro/popup-retro';
import hints from '@/config/hints.json';

import { StatsAndButtons } from './stats-and-buttons';

interface GameStatsPopupProps {
  isOpen: boolean;
  closeGameStatsPopup: () => void;
}

export const GameStatsPopup = ({
  isOpen,
  closeGameStatsPopup,
}: GameStatsPopupProps) => {
  const randomHint =
    hints.hints[Math.floor(Math.random() * hints.hints.length)];

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameStatsPopup}>
      <div className='popup-body-div'>
        <p className='popup-title'>Run Summary</p>
        <p className='popup-subtitle'>
          <span className='popup-subtitle-emphasis'>Hint:</span> {randomHint}
        </p>
        <StatsAndButtons
          onContinue={closeGameStatsPopup}
          text='Close'
        ></StatsAndButtons>
      </div>
    </PopupRetro>
  );
};
