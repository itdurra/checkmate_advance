import React from 'react';
import { useScoreStore } from '@/stores/useScoreStore';

export const Stats = () => {
  const { money, activeCards, seenShopCards, bossProgress } = useScoreStore();

  const bossesDefeated = bossProgress.filter((b) => b === 2).length;
  const bossesSkipped = bossProgress.filter((b) => b === 1).length;
  const bossesTotal = bossProgress.length;

  return (
    <>
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
    </>
  );
};
