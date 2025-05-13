import React, { ChangeEvent } from 'react';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { useScoreStore } from '@/stores/useScoreStore';

import { DifficultySelect } from '../difficulty-select';
import { ToggleDisplay } from '../toggle-display';
import { ToggleTooltips } from '../toggle-tooltips';

interface PracticeSettingsPopupProps {
  isOpen: boolean;
  closePracticeSettingsPopup: () => void;
}

export const PracticeSettingsPopup = ({
  isOpen,
  closePracticeSettingsPopup,
}: PracticeSettingsPopupProps) => {
  const difficulty = useScoreStore((state) => state.difficulty);
  const game = useScoreStore((state) => state.game);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const gamePosition = useScoreStore((state) => state.gamePosition);

  const [fenError, setFenError] = React.useState<string | null>(null);
  const [position, setPosition ] = React.useState<string>('');

  //custom fen input handler
  const handleFenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fen = e.target.value;
    setPosition(fen);
    try {
      game.load(fen);
      setGamePosition(fen);
      setFenError(null); // Clear error
    } catch (error) {
      setFenError('Invalid FEN'); // Show error
    }
  };

  return (
    <PopupRetro isOpen={isOpen} onClose={closePracticeSettingsPopup}>
      <div className='popup-body-div space-y-2'>
        <p className='popup-title'>Practice Settings</p>
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
        <hr className='border-2 border-dashed border-[#c381b5]'></hr>
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
        <hr className='border-2 border-dashed border-[#c381b5]'></hr>
        <div>
          <div className='grid grid-cols-2 items-center justify-center'>
            <p className='font-minecraft-bold uppercase'>
              Difficulty: {difficulty}
            </p>
            <DifficultySelect />
          </div>
          <p className='popup-subtitle'>
            Determines how advanced your opponent should play.
          </p>
        </div>
        <hr className='border-2 border-dashed border-[#c381b5]'></hr>
        <div>
          <div className='grid grid-cols-2 items-center justify-center'>
            <p className='font-minecraft-bold uppercase'>Custom Position:</p>

            <div>
              <input
                value={position}
                className='w-full rounded-md bg-[#fefcd0] p-2'
                onChange={handleFenInputChange}
                placeholder={gamePosition}
              />
              {fenError && (
                <p className='mt-1 text-sm font-bold text-red-600'>
                  {fenError}
                </p>
              )}
            </div>
          </div>
          <p className='popup-subtitle'>
            Paste a custom FEN notation to update the board.
          </p>
        </div>

        <div className='mt-4'>
          <ButtonRetro onClick={closePracticeSettingsPopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
