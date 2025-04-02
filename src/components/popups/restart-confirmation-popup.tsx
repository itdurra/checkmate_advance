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

  function RestartRun(){
      resetRun();
      setIsShopOpen(false);
      closeRestartConfirmationPopup();
  }

  return (
    <PopupRetro isOpen={isOpen} onClose={closeRestartConfirmationPopup}>
      <div className='text-center'>
        <p className='my-4'>Delete progress and restart your run?</p>
        <ButtonAltRetro onClick={() => RestartRun()}>Yes</ButtonAltRetro>
        <ButtonRetro onClick={closeRestartConfirmationPopup}>No</ButtonRetro>
        <Stats></Stats>
      </div>
    </PopupRetro>
  );
};
