import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BossDisplay } from '@/components/boss-display';
import { BossName } from '@/components//boss-name';
import { ChessActionsDisplay } from '@/components//chess-actions-display';
import { ChessBoard } from '@/components//chessboard/chess-board';
import { ScoreDisplay } from '@/components/score-display';
import { ToggleDisplay } from '@/components/toggle-display';
import { AccordionRetro } from '@/components/ui-retro/accordion-retro';
import { PieceValues } from '@/components/piece-values';

export const Game = () => {
  const { theme, mapping, setMapping, menu, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <div className='mx-auto w-full max-w-[465px] md:grid md:max-w-7xl md:grid-cols-[1fr_2fr_1fr] md:gap-4'>
      <div>
        <BossName></BossName>
        <div className=''>
          <ScoreDisplay></ScoreDisplay>
        </div>
      </div>
      <ChessBoard></ChessBoard>
      <div className='self-center'>
        <AccordionRetro className='md:p-4' title='Piece Values'>
          <PieceValues />
        </AccordionRetro>
        <ChessActionsDisplay></ChessActionsDisplay>
      </div>
    </div>
  );
};
