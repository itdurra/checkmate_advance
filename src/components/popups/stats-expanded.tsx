import React from 'react';

import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';

export const StatsExpanded = () => {
  const { money, seenShopCards, bossProgress, newGamePlus } = useScoreStore();

  const {
    totalMoneySpent,
    totalMoneyEarned,
    totalScore,
    highestGameScore,
    highestTurnScore,
    bestTurnHand,
    bossFightSummaries,
    upgradePurchases,
  } = useStatsStore();

  const newGamePlusBossesCount = newGamePlus * bossProgress.length;
  const bossesDefeated =
    bossProgress.filter((b) => b === 2).length + newGamePlusBossesCount;
  /*
    const bossesTotal =
    bossProgress.length +
    newGamePlus * bossProgress.length +
    newGamePlusBossesCount;
  */

  return (
    <>
      <p className='font-minecraft-bold mb-2 text-lg'>Run Summary</p>
      <div className='space-y-2 text-sm'>
        <div className='grid grid-cols-2 gap-x-6 gap-y-2 text-left text-sm'>
          <p>🏆 Bosses Defeated: {bossesDefeated}</p>
          <p>🆙 Upgrades: {upgradePurchases}</p>

          <p>🧠 Cards Seen: {seenShopCards.size}</p>
          <p>🏅 Best Game: {highestGameScore}</p>

          <p>💰 Total Earned: ${totalMoneyEarned}</p>
          <p>📈 Total Score: {totalScore}</p>

          <p>💰 Total Spent: ${totalMoneySpent}</p>
          <p>⭐ Best Turn: {highestTurnScore}</p>
        </div>

        <hr className='my-3 border-white/20' />

        {bestTurnHand && bestTurnHand.length > 0 && (
          <table className='mt-2 w-full border border-white/20 text-left text-xs'>
            <caption className='mb-1 font-semibold'>Best Turn Hand</caption>
            <thead>
              <tr>
                <th className='border border-white/20 px-2 py-1'>Card Name</th>
                <th className='border border-white/20 px-2 py-1'>
                  Upgrade Level
                </th>
              </tr>
            </thead>
            <tbody>
              {bestTurnHand.map((card) => (
                <tr key={card.id}>
                  <td className='border border-white/10 px-2 py-1'>
                    {card.name}
                  </td>
                  <td className='border border-white/10 px-2 py-1'>
                    {card.upgradeLevel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {bossFightSummaries && bossFightSummaries.length > 0 && (
          <div className='max-h-[200px] overflow-y-auto rounded border border-white/20'>
            <table className='mt-4 w-full border border-white/20 text-left text-xs'>
              <caption className='mb-1 font-semibold'>Boss Battles</caption>
              <thead>
                <tr>
                  <th className='border border-white/20 px-2 py-1'>Level</th>
                  <th className='border border-white/20 px-2 py-1'>Result</th>
                  <th className='border border-white/20 px-2 py-1'>
                    Final Turn
                  </th>
                  <th className='border border-white/20 px-2 py-1'>Cards</th>
                  <th className='border border-white/20 px-2 py-1'>PGN</th>
                </tr>
              </thead>
              <tbody>
                {bossFightSummaries.map((fight) => (
                  <tr key={fight.level}>
                    <td className='border border-white/10 px-2 py-1'>
                      {fight.level}
                    </td>
                    <td className='border border-white/10 px-2 py-1'>
                      {fight.result}
                    </td>
                    <td className='border border-white/10 px-2 py-1'>
                      {fight.finalTurn}
                    </td>
                    <td className='border border-white/10 px-2 py-1'>
                      {fight.cardsUsed.map((card, i) => (
                        <span key={i} className='mr-1 inline-block'>
                          {card.name} +{card.upgradeLevel}
                        </span>
                      ))}
                    </td>
                    <td className='max-w-[100px] border border-white/10 px-2 py-1'>
                      <div className='overflow-x-auto whitespace-nowrap'>
                        {fight.pgn}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
