import React, { forwardRef } from 'react';
import { useScoreStore } from '@/stores/useScoreStore';
import { custom_board_theme } from '@/components/chessboard/theme';

interface CustomSquareProps {
  children: React.ReactNode;
  square: string;
  squareColor: 'white' | 'black';
  style: React.CSSProperties;
}

const CustomSquareRenderer = forwardRef<HTMLDivElement, CustomSquareProps>(
  (props, ref) => {
    const { children, square, squareColor, style } = props;
    const board = useScoreStore((state) => state.board);
    const boardState: Record<string, number> = Object.fromEntries(board);
    const animatePieceTrigger = useScoreStore(
      (state) => state.animatePieceTrigger
    );
    const animateSquareTrigger = useScoreStore(
      (state) => state.animateSquareTrigger
    );
    const { showBuffs } = useScoreStore();
    const squareValue = boardState[square] || 0;
    const to = useScoreStore((state) => state.to);

    // Choose contrasting text color for the buff number
    const buffTextColor =
      squareColor === 'white'
        ? custom_board_theme[1] // dark square color
        : custom_board_theme[0]; // light square color

    const showSquareAnim = animateSquareTrigger && square === to;
    const showPieceAnim = animatePieceTrigger && square === to;

    return (
      <div
        ref={ref}
        style={{
          ...style,
          position: 'relative',
        }}
      >
        {children}

        {squareValue > 0 && showBuffs && (
          <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-sm'>
            <span
              className='rounded bg-black/70 px-1 py-[1px] text-sm font-bold backdrop-blur-sm'
              style={{ color: buffTextColor }}
            >
              +{squareValue}
            </span>
          </div>
        )}
      </div>
    );
  }
);

export default CustomSquareRenderer;
