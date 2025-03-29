import Image from 'next/image';

import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

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

  return (
    <PopupRetro isOpen={isOpen} onClose={closeNotEnoughRoomPopup}>
        <div className='flex justify-center mb-4'>
      <Image
        src={boss.image}
        width={200}
        height={200}
        priority
        quality={100}
        alt='Enemy Profile Picture'
      />
      </div>
      <div className='text-center'>
        <p>Not enough room... </p>
        <p>Sell a card to make room.</p>
      </div>
    </PopupRetro>
  );
};
