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
      <div className='text-center font-minecraft text-sm'>
        <p className='font-minecraft-bold my-4 text-lg'>
          Hide/Display Square Values
        </p>
        <ToggleDisplay></ToggleDisplay>
        <div className='mx-auto mt-4 w-[90%] max-w-72 text-center'>
          <p className='mb-4'>
            Square values default to hidden at 0, but can be increased by having
            active cards in your hand. They will display on the board.
          </p>
        </div>
        <p className='font-minecraft-bold my-4 text-lg'>
          Hide/Display Tool Tips
        </p>
        <ToggleTooltips></ToggleTooltips>
        <div className='mx-auto mt-4 w-[90%] max-w-72 text-center'>
          <p className='mb-4'>
            Display helpful popups with tutorial information about the game when mousing over certain items.
          </p>
        </div>
        <div className='mt-4'>
          <ButtonRetro onClick={closeGameSettingsPopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
