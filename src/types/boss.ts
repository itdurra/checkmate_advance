import type { SongTitle } from './song-title';

export type Boss = {
  level: number;
  name: string;
  image: string;
  bg: string;
  baseBg: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  description: string;
  weakness: string;
  depth: number;
  elo: number;
  moveTime: number;
  score: number;
  song: SongTitle;
};
