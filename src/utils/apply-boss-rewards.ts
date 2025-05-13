import { useScoreStore } from '@/stores/useScoreStore';
import type { subtype } from '@/types/subtype';

export function applyBossRewards(level: number) {
  switch (level) {
    case 1: // unlocks shop no reward

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
      useScoreStore.setState((state) => ({
        maxCards: state.maxCards + 1,
      }));
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

  }

  return null;
}

function bossEffects(){
  //pawn cards are disabled
  //knight cards are disabled
  //bishops cards are disabled
  //rook cards are disabled
  //queens are disabled
}



function bossRewards(random: number) {
  //add a card to queue
  //add money multiplier
  //add flat money 10,000 * money multiplier
  //spawn a higher card than is available




  switch (random) {
    case 1: 
    
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
      useScoreStore.setState((state) => ({
        maxCards: state.maxCards + 1,
      }));
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

  }

  return null;
}