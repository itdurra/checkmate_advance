import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { StatsState } from '@/types/stats-store';

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      totalScore: 0,
      totalMoneyEarned: 0,
      totalMoneySpent: 0,
      highScore: 0,
      highestGameScore: 0,
      highestTurnScore: 0,
      bestTurnHand: [],
      bossFightSummaries: [],
      upgradePurchases: 0,
      highestUpgrade: null,
      cardUsageMap: {},

      addScore: (score) => set((state) => ({ totalScore: state.totalScore + score })),
      addMoney: (money) => set((state) => ({ totalMoneyEarned: state.totalMoneyEarned + money })),
      spendMoney: (amount) => set((state) => ({ totalMoneySpent: state.totalMoneySpent + amount })),

      trySetHighScore: (score) => {
        if (score > get().highScore) set({ highScore: score });
      },

      trySetHighestGameScore: (score) => {
        if (score > get().highestGameScore) set({ highestGameScore: score });
      },

      trySetHighestTurnScore: (score, hand) => {
        if (score > get().highestTurnScore) {
          set({ highestTurnScore: score, bestTurnHand: hand });
        }
      },

      incrementCardUsage: (cardId) => {
        set((state) => ({
          cardUsageMap: {
            ...state.cardUsageMap,
            [cardId]: (state.cardUsageMap[cardId] || 0) + 1,
          },
        }));
      },

      getMostUsedCards: (top = 5) => {
        const entries = Object.entries(get().cardUsageMap);
        return entries
          .sort((a, b) => b[1] - a[1])
          .slice(0, top)
          .map(([cardId, count]) => ({ cardId, count }));
      },

      addBossFightSummary: (summary) => {
        set((state) => ({
          bossFightSummaries: [...state.bossFightSummaries, summary],
        }));
      },

      incrementUpgradeCount: () => {
        set((state) => ({ upgradePurchases: state.upgradePurchases + 1 }));
      },

      trySetHighestUpgrade: (upgrade) => {
        const current = get().highestUpgrade;
        if (!current || upgrade.upgradeLevel > current.upgradeLevel) {
          set({ highestUpgrade: upgrade });
        }
      },

      resetUsage: () => set({ cardUsageMap: {} }),

      resetStats: () =>
        set({
          totalScore: 0,
          totalMoneyEarned: 0,
          totalMoneySpent: 0,
          highScore: 0,
          highestGameScore: 0,
          highestTurnScore: 0,
          bestTurnHand: [],
          bossFightSummaries: [],
          upgradePurchases: 0,
          highestUpgrade: null,
          cardUsageMap: {},
        }),
    }),
    {
      name: 'stats-storage',
    }
  )
);
