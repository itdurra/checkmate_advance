import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';

export function applyMoney() {
  const state = useScoreStore.getState();

  const piece = state.piece;
  const value = state.getPieceValue(piece[1].toLowerCase());
  const newMoney = value * state.moneyMultiplier * 10 + 4;
  const updatedMoney = state.money + newMoney;

  //update stats
  updateStats(newMoney);

  useScoreStore.setState({ money: updatedMoney });

  return null;
}

//helper to update money
function updateStats(money: number){
  const state = useStatsStore.getState();
  state.addMoney(money)
}

//same function just doesn't update Statsstore
//this is needed to calculate money in practice mode,
//w/o it counting towards players lifetime statsstore
export function applyPracticeMoney() {
    const state = useScoreStore.getState();
  
    const piece = state.piece;
    const value = state.getPieceValue(piece[1].toLowerCase());
    const newMoney = value * state.moneyMultiplier * 10;
    const updatedMoney = state.money + newMoney;
  
    useScoreStore.setState({ money: updatedMoney });
  
    return null;
  }
