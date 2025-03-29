'use client';
import Image from 'next/image';
import { useScoreStore } from '@/stores/useScoreStore';
import { custom } from '@/components/chessboard/theme';
import { ToggleDisplay } from './toggle-display';

const PIECE_LABELS: Record<string, string> = {
  p: 'P',
  n: 'N',
  b: 'B',
  r: 'R',
  q: 'Q',
};

const BASE_VALUES: Record<string, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
};

const formatModifier = (current: number, base: number) => {
  const diff = current - base;
  if (diff === 0) return null;
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff}`;
};

function getPieceImage(
  theme: typeof custom,
  color: 'w' | 'b',
  piece: string
): string {
  const upperPiece = piece.toUpperCase(); // Convert to 'P', 'N', etc.
  const key = `${color}${upperPiece}` as keyof typeof theme;
  return theme[key]?.[0] ?? ''; // Fallback to empty string if not found
}

export const PieceValues = () => {
  const pieces = useScoreStore((state) => state.pieces);
  const playerPieceCounts = useScoreStore((state) => state.playerPieceCounts);
  const enemyPieceCounts = useScoreStore((state) => state.enemyPieceCounts);

  const playerMaterialTotal = Object.keys(PIECE_LABELS).reduce((sum, key) => {
    const count = playerPieceCounts[key] || 0;
    const value = pieces[key] || 0;
    return sum + count * value;
  }, 0);
  const enemyMaterialTotal = Object.keys(PIECE_LABELS).reduce((sum, key) => {
    const count = enemyPieceCounts[key] || 0;
    const value = pieces[`enemy${key}`] || 0;
    return sum + count * value;
  }, 0);

  const renderTable = (side: 'player' | 'enemy') => {
    const color = side === 'player' ? 'w' : 'b';
    const title = side === 'player' ? 'Player' : 'Enemy';
    const pieceCounts =
      side === 'player' ? playerPieceCounts : enemyPieceCounts;
    const total = side === 'player' ? playerMaterialTotal : enemyMaterialTotal;

    return (
      <div className='text-xs'>
        <table className='w-full table-fixed'>
          <thead>
            <tr className='text-gray-400'>
              <th className='w-1/4 text-left'>Val</th>
              <th className='w-1/4 text-left'>±</th>
              <th className='w-2/4 text-left'>Piece</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(PIECE_LABELS).map(([key, label]) => {
              const pieceKey = side === 'player' ? key : `enemy${key}`;
              const value = pieces[pieceKey] || 0;
              const base = BASE_VALUES[key];
              const mod = formatModifier(value, base);
              const count = pieceCounts[key] || 0;

              return (
                <tr key={pieceKey} className='h-6'>
                  <td>{value}</td>
                  <td className='text-gray-500'>{mod ?? '-'}</td>
                  <td>
                    <div className='flex'>
                      {Array.from({ length: count }).map((_, i) => (
                        <Image
                          key={i}
                          src={getPieceImage(custom, color, key)}
                          alt={label}
                          width={16}
                          height={16}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <ToggleDisplay></ToggleDisplay>
      <div className='grid grid-cols-2 gap-4'>
        {renderTable('player')}
        {renderTable('enemy')}
      </div>
    </>
  );
};
