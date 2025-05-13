import { Square } from 'chess.js';
 
 export type OptionSquareStyles = {
    [key in Square]?: React.CSSProperties;
  };