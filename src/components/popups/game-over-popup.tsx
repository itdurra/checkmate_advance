import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

interface GameOverPopupProps {
  isOpen: boolean;
  closeGameOverPopup: () => void;
}

export const GameOverPopup = ({
  isOpen,
  closeGameOverPopup,
}: GameOverPopupProps) => {
  const game = useScoreStore((state) => state.game);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);

  const {
    level,
    setMenu,
  } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { money, activeCards, seenShopCards, bossProgress, resetRun } = useScoreStore();

  const bossesDefeated = bossProgress.filter((b) => b === 2).length;
  const bossesSkipped = bossProgress.filter((b) => b === 1).length;
  const bossesTotal = bossProgress.length;

  const resignGame = () => {
    resetRun();
    game.reset();
    setGamePosition(game.fen());
    closeGameOverPopup(); // Close popup after resigning
    setMenu('storymode');
  };

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameOverPopup}>
      <div className='text-center font-minecraft text-sm'>
        <p className='font-minecraft-bold mb-2 text-2xl'>Game Over</p>
        <p className='font-minecraft-bold mb-2 text-lg'>Run Summary</p>

        <div className='space-y-1'>
          <p>
            🏆 Bosses Defeated: {bossesDefeated} / {bossesTotal}
          </p>
          <p>🎭 Bosses Skipped: {bossesSkipped}</p>
          <p>🧠 Cards Seen in Shop: {seenShopCards.size}</p>
          <p>🃏 Cards Added to Hand: {activeCards.length}</p>

          <hr className='my-2 border-white/20' />

          <p>💰 Money Remaining: ${money}</p>
        </div>
        <ButtonRetro onClick={resignGame}>Main Menu</ButtonRetro>
      </div>
    </PopupRetro>
  );
};
