import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';
import { Card } from '@/types/card';
import { abbreviateNumber } from '@/utils/abbreviate-number';

import { CardMini } from '../card-mini';
import { CardPlaceholder } from '../card-placeholder';

export const Stats = () => {
  const { bossProgress, newGamePlus, allCards } = useScoreStore();

  const {
    totalMoneyEarned,
    totalScore,
    highestGameScore,
    highestTurnScore,
    upgradePurchases,
    getMostUsedCards,
  } = useStatsStore();

  const topCards = getMostUsedCards(3);
  const topCardData = topCards
    .map(({ cardId }) => allCards.find((c) => c.id === cardId))
    .filter((c): c is Card => !!c);

  const placeholderCount = 3 - topCardData.length;

  const newGamePlusBossesCount = newGamePlus * bossProgress.length;
  const bossesDefeated =
    bossProgress.filter((b) => b === 2).length + newGamePlusBossesCount;

  return (
    <>
      <p className='font-minecraft-bold mb-2 text-xl text-[#c381b5] sm:text-2xl'>
        CheckmateAdvance.com
      </p>
      <div className='mx-auto mt-4 w-full max-w-[24rem] sm:max-w-md px-6'>
        <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-left font-minecraft text-base'>
          <p>
            Bosses:{' '}
            <span className='stats-style'>{abbreviateNumber(Math.round(bossesDefeated))}</span>
          </p>
          <p>
            Best Turn:{' '}
            <span className='stats-style'>{abbreviateNumber(Math.round(highestTurnScore))}</span>
          </p>

          <p>
            Upgrades:{' '}
            <span className='stats-style'>{abbreviateNumber(Math.round(upgradePurchases))}</span>
          </p>
          <p>
            Best Game:{' '}
            <span className='stats-style'>{abbreviateNumber(Math.round(highestGameScore))}</span>
          </p>

          <p>
            Earned:{' '}
            <span className='stats-style'>${abbreviateNumber(Math.round(totalMoneyEarned))}</span>
          </p>
          <p>
            Total Score:{' '}
            <span className='stats-style'>{abbreviateNumber(Math.round(totalScore))}</span>
          </p>
        </div>
      </div>

      <div className='mt-4'>
        <p className='mb-2 text-base'>Favorite Cards:</p>
        <div className='flex justify-center gap-1 sm:gap-4'>
          {topCardData.map((card) => (
            <CardMini key={card.id} card={card} />
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <CardPlaceholder key={`placeholder-${i}`} />
          ))}
        </div>
      </div>

      <p className='mt-6 font-minecraft text-sm'>CheckmateAdvance.com♟️</p>
    </>
  );
};
