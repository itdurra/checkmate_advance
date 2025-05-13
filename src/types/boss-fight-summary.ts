export type BossFightSummary = {
  level: number;
  result: string;
  finalTurn: number;
  cardsUsed: {
    name: string;
    upgradeLevel: number;
  }[];
  pgn: string;
};
