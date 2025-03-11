import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BossDisplay } from '../boss-display';
import { ChessActionsDisplay } from '../chess-actions-display';
import { ChessBoard } from '../chessboard/chess-board';


export const Game = () => {
  const { theme, mapping, setMapping, menu, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <div className='mx-auto flex h-auto w-full max-w-[465px] flex-col gap-1 md:grid md:max-w-7xl md:grid-cols-[1fr_2fr_1fr]'>
      <div>
        <BossDisplay></BossDisplay>
      </div>
      <ChessBoard></ChessBoard>
      <div className='self-center'>
        <ChessActionsDisplay></ChessActionsDisplay>
      </div>
    </div>
  );
};
