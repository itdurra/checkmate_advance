import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';

import { StatsAndButtons } from './stats-and-buttons';

interface QuitConfirmationPopupProps {
  isOpen: boolean;
  closeQuitConfirmationPopup: () => void;
}

export const QuitConfirmationPopup = ({
  isOpen,
  closeQuitConfirmationPopup,
}: QuitConfirmationPopupProps) => {
  const resetRun = useScoreStore((state) => state.resetRun);
  const resetStats = useStatsStore((state) => state.resetStats);
  const { setIsShopOpen, setMenu } = useGame();

  function QuitRun() {
    resetRun();
    resetStats();
    setIsShopOpen(false);
    closeQuitConfirmationPopup();
    setMenu("main");
  }

  return (
    <PopupRetro isOpen={isOpen} onClose={closeQuitConfirmationPopup}>
      <div className='popup-body-div'>
        <p className='popup-title'>Quit Run?</p>
        <p className='popup-subtitle'>
          <span className='popup-subtitle-emphasis'>Warning: </span>You will lose all boss progress, and unlocked cards.
        </p>
        <StatsAndButtons onContinue={QuitRun} text='Quit'></StatsAndButtons>
      </div>
    </PopupRetro>
  );
};
