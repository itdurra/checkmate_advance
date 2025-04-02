import { BossName } from '@/components//boss-name';
import { ChessActionsDisplay } from '@/components//chess-actions-display';
import { ChessBoard } from '@/components//chessboard/chess-board';
import { PieceValues } from '@/components/piece-values';
import { ScoreDisplay } from '@/components/score-display';
import { AccordionRetro } from '@/components/ui-retro/accordion-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const Game = () => {
  const { theme } = useGame();
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
        <AccordionRetro className='w-full ml-2' title='Piece Values'>
          <PieceValues />
        </AccordionRetro>
        <ChessActionsDisplay></ChessActionsDisplay>
      </div>
    </div>
  );
};
