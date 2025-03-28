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

    const squareClass =
      squareColor === 'white'
        ? 'bg-[#fefcd0] text-black'
        : 'bg-[#c381b5] text-white';

    // Choose contrasting text color for the buff number
    const buffTextColor =
      squareColor === 'white'
        ? custom_board_theme[1] // dark square color
        : custom_board_theme[0]; // light square color

    const showSquareAnim = animateSquareTrigger && square === to;
    const showPieceAnim = animatePieceTrigger && square === to;

    const show = false;

    return (
      <div
        ref={ref}
        style={{
          ...style,
          position: 'relative',
        }}
      >
        {children}

        {/* 🌀 Floating animation: Square value */}
        {showSquareAnim && show && (
          <div className='pointer-events-none absolute inset-0 z-20 flex items-center justify-center'>
            <span className='animate-float-up font-minecraft-bold select-none text-sm text-blue-300'>
              +{squareValue}
            </span>
          </div>
        )}

        {/* 🌀 Floating animation: Piece value (we'll default to +1 for now) */}
        {showPieceAnim && show && (
          <div className='pointer-events-none absolute inset-0 z-20 flex items-center justify-center'>
            <span className='animate-float-up font-minecraft-bold select-none text-sm text-green-300'>
              +1
            </span>
          </div>
        )}

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
