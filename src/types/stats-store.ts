import { BestTurnCard } from "./best-turn-card";
import { BossFightSummary } from "./boss-fight-summary";
import { HighestUpgrade } from "./highest-upgrade";

export type StatsState = {
    totalScore: number;
    totalMoneyEarned: number;
    totalMoneySpent: number;
    highScore: number;
    highestGameScore: number;
    highestTurnScore: number;
    bestTurnHand: BestTurnCard[];
    bossFightSummaries: BossFightSummary[];
    upgradePurchases: number;
    highestUpgrade: HighestUpgrade | null;
    cardUsageMap: Record<string, number>;
  
    addScore: (score: number) => void;
    addMoney: (money: number) => void;
    spendMoney: (amount: number) => void;
  
    trySetHighScore: (score: number) => void;
    trySetHighestGameScore: (score: number) => void;
    trySetHighestTurnScore: (score: number, hand: BestTurnCard[]) => void;
  
    incrementCardUsage: (cardId: string) => void;
    getMostUsedCards: (top?: number) => { cardId: string; count: number }[];
  
    addBossFightSummary: (summary: BossFightSummary) => void;
    incrementUpgradeCount: () => void;
    trySetHighestUpgrade: (upgrade: HighestUpgrade) => void;
  
    resetUsage: () => void;
    resetStats: () => void;
  };