import { useEffect } from 'react';
import Image from 'next/image';

import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';

import { ButtonRetro } from '../ui-retro/button-retro';

interface NotEnoughRoomPopupProps {
  isOpen: boolean;
  closeNotEnoughRoomPopup: () => void;
}

export const NotEnoughRoomPopup = ({
  isOpen,
  closeNotEnoughRoomPopup,
}: NotEnoughRoomPopupProps) => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  //music
  const playSting = useMusicStore((state) => state.playSting);


  useEffect(() => {
    if (isOpen) {
      playSting('Fail Stinger 1');
    }
  }, [isOpen]);

  return (
    <PopupRetro isOpen={isOpen} onClose={closeNotEnoughRoomPopup}>
      <div className='popup-body-div'>
        <p className='popup-title'>Cards Full</p>
        <p className='popup-subtitle'>
          <span className='popup-subtitle-emphasis'>Hint: </span>Sell a card to
          make room.
        </p>
        <div className='flex justify-center'>
          <Image
            src={boss.image}
            width={200}
            height={200}
            priority
            quality={100}
            alt='Enemy Profile Picture'
          />
        </div>
        <div className='mt-2 flex flex-col justify-center gap-2 sm:flex-row sm:gap-2'>
          <ButtonRetro onClick={closeNotEnoughRoomPopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
