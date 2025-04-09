import React from 'react';

import { Stats } from '@/components/popups/stats';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { useGame } from '@/context/game-context';

interface GameCompletePopupProps {
  isOpen: boolean;
  closeGameCompletePopup: () => void;
}

export const GameCompletePopup = ({
  isOpen,
  closeGameCompletePopup,
}: GameCompletePopupProps) => {
  const { setMenu } = useGame();

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameCompletePopup}>
      <div className='text-center font-minecraft text-sm'>
        Thank you for playing Checkmate Advance! The secret password is <strong>fries</strong>, tell that to the Queen de la Meme via a DM and he will send you a handwritten letter thanking you for playing the game!
        <div>
          <ButtonRetro
            onClick={() =>
              window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSd2UyVk5W1cDmfaQTHdwdePJNI62BaiTVbQ67Se_ZZjY6GYLw/viewform?usp=sharing',
                '_blank'
              )
            }
            className='my-4 w-64 py-1 text-lg'
          >
            Give Feedback
          </ButtonRetro>
        </div>
        <div className='mt-6 mt-auto text-center'>
          <button
            onClick={() => setMenu('settings')}
            className='text-sm text-gray-600 underline transition-all hover:text-blue-300'
          >
            View full licenses and credits →
          </button>
        </div>
        <Stats></Stats>
        <div className='mt-4'>
          <ButtonRetro onClick={closeGameCompletePopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
