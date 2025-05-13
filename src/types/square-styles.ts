import type { Square } from 'chess.js';

export type SquareStyles = {
  [square in Square]?: {
    backgroundColor: string;
  };
};
