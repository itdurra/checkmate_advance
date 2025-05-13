'use client';

import Image from 'next/image';

import { useScoreStore } from '@/stores/useScoreStore';
import { ALL_BASE_VALUES } from '@/utils/base-values';

import { PieceFloatNumber } from '../animations/piece-float-number';

import { custom } from './theme';

type CustomPieceRendererProps = {
  boardState: Record<string, number>;
};

export const CustomPieceRenderer = ({
  boardState,
}: CustomPieceRendererProps) => {
  const getPieceValue = useScoreStore((state) => state.getPieceValue);
  const getEnemyPieceValue = useScoreStore((state) => state.getEnemyPieceValue);
  const animatePiece = useScoreStore((state) => state.animatePiece);
  const setAnimatePiece = useScoreStore((state) => state.setAnimatePiece);
  const setAnimatePieceMap = useScoreStore((state) => state.setAnimatePieceMap);
  const animatePieceMap = useScoreStore((state) => state.animatePieceMap);


  return Object.fromEntries(
    Object.entries(custom).map(([pieceKey, imageArr]) => [
      pieceKey,
      function RenderPiece({
        squareWidth,
        square,
      }: {
        squareWidth: number;
        square?: string;
      }) {
        //identify piece value delta
        const isWhite = pieceKey.startsWith('w');
        const pK = pieceKey[1].toLowerCase();
        const baseValue = ALL_BASE_VALUES[pK];
        let totalValue = 1;
        if (isWhite) {
          totalValue = getPieceValue(pK);
        } else {
          totalValue = getEnemyPieceValue(pK);
        }
        const delta = totalValue - baseValue;

        //set color for buffed and nerfed pieces.
        let color;
        let show = false;

        if (delta > 0) {
          color = '#ffd700'; // gold
          show = true;
        }

        if (delta < 0) {
          color = 'red';
          show = true;
        }

        const shouldAnimate = animatePieceMap[pieceKey] ?? false;

        return (
          <>
            <div
              className='relative'
              style={{
                width: squareWidth,
                height: squareWidth,
                filter: `drop-shadow(0 0 1px ${color}) drop-shadow(0 0 2px ${color}) drop-shadow(0 0 3px ${color})`,
                //
                transformStyle: 'preserve-3d',
              }}
            >
              <Image
                src={imageArr[0]}
                width={squareWidth}
                height={squareWidth}
                alt={pieceKey}
                draggable={false}
                priority
              />
            </div>

            {/* Float number effect -- disabled due to animation conflicts
            <div className='pointer-events-none absolute inset-0 z-20'>
              {show && (
                <PieceFloatNumber
                  show={shouldAnimate}
                  value={delta}
                  key={`${pieceKey}-${delta}`} // More unique key
                  onComplete={() => setAnimatePieceMap(pieceKey, false)}
                />
              )}
            </div>
            */}
          </>
        );
      },
    ])
  );
};
