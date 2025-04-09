'use client';

import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import tooltips from '@/config/tooltips.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { TooltipRetro } from './ui-retro/tooltip-retro';
import { BoxCountDown } from './ui-scoring/box-count-down';
import { BoxCountUp } from './ui-scoring/box-count-up';

export const ScoreDisplay = () => {
  const score = useScoreStore((state) => state.score);
  const turns = useScoreStore((state) => state.turns);
  const money = useScoreStore((state) => state.money);
  const pieceScore = useScoreStore((state) => state.pieceScore);
  const squareScore = useScoreStore((state) => state.squareScore);
  const materialAdvantage = useScoreStore((state) =>
    state.getMaterialAdvantage()
  );

  const { theme, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <>
      <div className='mt-4 grid grid-cols-2 items-center gap-1'>
        <TooltipRetro text={tooltips.score}>
          <BoxCountUp value={Math.round(score)} text={'Score'}></BoxCountUp>
        </TooltipRetro>
        <TooltipRetro text='Turns remaining before game ends. Plan wisely!'>
          <BoxCountDown value={turns} text={'Turns'}></BoxCountDown>
        </TooltipRetro>
      </div>
      <div className='mt-2 flex items-center'>
        <div className='flex-1'>
          <TooltipRetro text={tooltips.piece}>
            <BoxCountUp value={pieceScore} text='Piece' />
          </TooltipRetro>
        </div>

        <div className='flex-none px-2 text-4xl font-bold text-gray-700'>×</div>

        <div className='flex-1'>
          <TooltipRetro text={tooltips.advantage}>
            <BoxCountUp value={materialAdvantage} text='Advantage' />
          </TooltipRetro>
        </div>
      </div>
    </>
  );
};
