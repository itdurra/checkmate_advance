import { BossName } from '@/components//boss-name';
import { BossUI } from '@/components//boss-ui';
import { ChessActionsDisplay } from '@/components//chess-actions-display';
import { PieceValues } from '@/components/piece-values';
import { ScoreDisplay } from '@/components/score-display';
import { AccordionRetro } from '@/components/ui-retro/accordion-retro';
import themes from '@/config/themes.json';
import tooltips from '@/config/tooltips.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { PracticeChessBoard } from '../chessboard/practice-chess-board';
import { NewGameOverlay } from '../popups/new-game-overlay';
import { PracticeShop } from '../practice-shop';
import { TooltipRetro } from '../ui-retro/tooltip-retro';

export const Practice = () => {
  const { theme, isShopOpen } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const animateNewGame = useScoreStore((state) => state.animateNewGame);

  return (
    <>
    <NewGameOverlay show={animateNewGame} text='Practice' />
    <div className='mx-auto w-full max-w-[465px] md:grid md:max-w-7xl md:grid-cols-[1fr_2fr_1fr] md:gap-4'>
      <div>
        <div className=''>
          <BossName></BossName>
          <div className='mt-6 hidden md:visible md:block'>
            <BossUI></BossUI>
          </div>
        </div>
        <div className='tutorial-score tutorial-turns tutorial-piece'>
          <ScoreDisplay></ScoreDisplay>
        </div>
      </div>
      {isShopOpen ? (
        <div className=''>
          <PracticeShop></PracticeShop>
        </div>
      ) : (
        <div className='tutorial-chessboard pt-2 md:pt-0'>
          <PracticeChessBoard></PracticeChessBoard>
        </div>
      )}
      <div className='self-center'>
        <TooltipRetro text={tooltips.pieceValues}>
          <AccordionRetro
            className='tutorial-piece-values px-2 pt-3 md:pt-0'
            title='Piece Values'
          >
            <PieceValues />
          </AccordionRetro>
        </TooltipRetro>
        <TooltipRetro text={tooltips.cardQueue}>
          <ChessActionsDisplay></ChessActionsDisplay>
        </TooltipRetro>
      </div>
    </div>
    </>
  );
};
