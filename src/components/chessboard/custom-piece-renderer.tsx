'use client';

import Image from 'next/image';
import { custom } from './theme';
import { useScoreStore } from '@/stores/useScoreStore';

type CustomPieceRendererProps = {
  boardState: Record<string, number>;
};

export const CustomPieceRenderer = ({
  boardState,
}: CustomPieceRendererProps) => {

  const pieces = useScoreStore((state) => state.pieces);

  return Object.fromEntries(
    Object.entries(custom).map(([pieceKey, imageArr]) => [
      pieceKey,
      function RenderPiece({
        squareWidth,
        square,
      }: {
        squareWidth: number;
        square: string;
      }) {
        const isWhite = pieceKey.startsWith('w');
        const baseValue = pieces[pieceKey[1].toLowerCase()] ?? 1;

        const floatText = `${isWhite ? '+' : '-'}${baseValue}`;
        const floatColor = isWhite ? 'float-score-green' : 'float-score-red';

        const show = false;

        return (
          <div
            className='relative'
            style={{ width: squareWidth, height: squareWidth }}
          >
            <Image
              src={imageArr[0]}
              width={squareWidth}
              height={squareWidth}
              alt={pieceKey}
              draggable={false}
            />
          </div>
        );
      },
    ])
  );
};
