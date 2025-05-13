import React from 'react';

import { Stats } from '@/components/popups/stats';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';

import { ToggleDisplay } from '../toggle-display';
import { ToggleTooltips } from '../toggle-tooltips';

interface GameSettingsPopupProps {
  isOpen: boolean;
  closeGameSettingsPopup: () => void;
}

export const GameSettingsPopup = ({
  isOpen,
  closeGameSettingsPopup,
}: GameSettingsPopupProps) => {
  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameSettingsPopup}>
      <div className='popup-body-div space-y-2'>
        <p className='popup-title'>Settings</p>
        <div>
          <div className='grid grid-cols-2 items-center justify-center'>
            <p className='font-minecraft-bold uppercase'>Square Values: </p>
            <ToggleDisplay></ToggleDisplay>
          </div>
          <p className='popup-subtitle'>
            Square values default to hidden at 0, but can be increased by having
            active cards in your hand. They will display on the board.
          </p>
        </div>
        <hr className='border-dashed border-[#c381b5] border-2'></hr>
        <div>
          <div className='grid grid-cols-2 items-center justify-center'>
            <p className='font-minecraft-bold uppercase'>Tutorial Info: </p>
            <ToggleTooltips></ToggleTooltips>
          </div>
          <p className='popup-subtitle'>
            Display helpful popups with tutorial information about the game when
            mousing over certain items.
          </p>
        </div>
        <div className='mt-4'>
          <ButtonRetro onClick={closeGameSettingsPopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
