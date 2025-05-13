import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';

import { StatsAndButtons } from './stats-and-buttons';

interface RestartConfirmationPopupProps {
  isOpen: boolean;
  closeRestartConfirmationPopup: () => void;
}

export const RestartConfirmationPopup = ({
  isOpen,
  closeRestartConfirmationPopup,
}: RestartConfirmationPopupProps) => {
  const resetRun = useScoreStore((state) => state.resetRun);
  const resetStats = useStatsStore((state) => state.resetStats);
  const { setIsShopOpen } = useGame();

  function RestartRun() {
    resetRun();
    resetStats();
    setIsShopOpen(false);
    closeRestartConfirmationPopup();
  }

  return (
    <PopupRetro isOpen={isOpen} onClose={closeRestartConfirmationPopup}>
      <div className='popup-body-div'>
        <p className='popup-title'>Restart Run?</p>
        <p className='popup-subtitle'>
          <span className='popup-subtitle-emphasis'>Warning: </span>You will lose all boss progress, and unlocked cards. Each new run
          randomizes the cards you will see in the shop.
        </p>
        <StatsAndButtons onContinue={RestartRun} text='Restart'></StatsAndButtons>
      </div>
    </PopupRetro>
  );
};
