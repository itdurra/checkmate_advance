import { Stats } from '@/components/popups/stats';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

interface RestartConfirmationPopupProps {
  isOpen: boolean;
  closeRestartConfirmationPopup: () => void;
}

export const RestartConfirmationPopup = ({
  isOpen,
  closeRestartConfirmationPopup,
}: RestartConfirmationPopupProps) => {
  const resetRun = useScoreStore((state) => state.resetRun);
  const { setIsShopOpen } = useGame();

  function RestartRun() {
    resetRun();
    setIsShopOpen(false);
    closeRestartConfirmationPopup();
  }

  return (
    <PopupRetro isOpen={isOpen} onClose={closeRestartConfirmationPopup}>
      <div className='text-center'>
        <p className='font-minecraft-bold my-4 text-lg'>
          Delete progress and restart your run?
        </p>
        <div className='mx-auto w-[90%] max-w-72 text-center'>
          <p className='mb-4'>
            You will lose all boss progress, and unlocked cards. Each new run randomizes the cards you
            will see in the shop.
          </p>
        </div>
        <ButtonAltRetro onClick={() => RestartRun()}>Yes</ButtonAltRetro>
        <ButtonRetro onClick={closeRestartConfirmationPopup}>No</ButtonRetro>
        <div className='mt-6'>
          <Stats></Stats>
        </div>
      </div>
    </PopupRetro>
  );
};
