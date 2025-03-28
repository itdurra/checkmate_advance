import React from 'react';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { useScoreStore } from '@/stores/useScoreStore';
import { useGame } from '@/context/game-context';

interface GameStatsPopupProps {
  isOpen: boolean;
  closeGameStatsPopup: () => void;
}

export const GameStatsPopup = ({
  isOpen,
  closeGameStatsPopup,
}: GameStatsPopupProps) => {
  const {
    money,
    score,
    pieceScore,
    squareScore,
    playerMaterial,
    enemyMaterial,
    activeCards,
    seenShopCards,
    bossProgress,
  } = useScoreStore();

  const bossesDefeated = bossProgress.filter((b) => b === 2).length;
  const bossesSkipped = bossProgress.filter((b) => b === 1).length;
  const bossesTotal = bossProgress.length;

  return (
    <PopupRetro isOpen={isOpen} onClose={closeGameStatsPopup}>
      <div className='text-center font-minecraft text-sm'>
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

        <div className='mt-4'>
          <ButtonRetro onClick={closeGameStatsPopup}>Close</ButtonRetro>
        </div>
      </div>
    </PopupRetro>
  );
};
