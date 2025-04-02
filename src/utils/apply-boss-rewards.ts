import { useScoreStore } from '@/stores/useScoreStore';

export function applyBossRewards(level: number) {
  switch (level) {
    case 1:
      useScoreStore.setState((state) => ({
        moneyMultiplier: state.moneyMultiplier + 1,
      }));
      break;
    case 2: // applied implicitly to shop unlocks
      break;
    case 3: //
      useScoreStore.setState((state) => ({
        maxCards: state.maxCards + 1,
      }));
      break;
    case 4: //
      useScoreStore.setState((state) => ({
        moneyMultiplier: state.moneyMultiplier + 1,
      }));
      break;
    case 5: // applied implicitly to shop unlocks
      break;
    case 6: //
      break;
    case 7: //
      useScoreStore.setState((state) => ({
        moneyMultiplier: state.moneyMultiplier + 1,
      }));
      break;
    case 8: // applied implicitly to shop unlocks
      break;
    case 9: // end of game

      break;

    default:
      console.log(`No specific reward logic for Boss #${level}`);
  }

  return null;
}
