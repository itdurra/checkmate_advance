import Image from 'next/image';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';


interface NotEnoughMoneyPopupProps {
  isOpen: boolean;
  closeNotEnoughMoneyPopup: () => void;
}

export const NotEnoughMoneyPopup = ({
  isOpen,
  closeNotEnoughMoneyPopup,
}: NotEnoughMoneyPopupProps) => {

  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <PopupRetro isOpen={isOpen} onClose={closeNotEnoughMoneyPopup}>
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
        <p>Not enough money... </p>
        <p>Win a game to earn some cash.</p>
      </div>
    </PopupRetro>
  );
};
