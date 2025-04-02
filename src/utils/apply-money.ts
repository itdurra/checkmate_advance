import { useScoreStore } from '@/stores/useScoreStore';

export function applyMoney() {
  const state = useScoreStore.getState();

  const piece = state.piece;
  const value = state.getPieceValue(piece[1].toLowerCase());
  const updatedMoney = state.money + value * state.moneyMultiplier * 10;
  console.log(state.money, value, state.moneyMultiplier, 'apply money');

  useScoreStore.setState({ money: updatedMoney });

  return null;
}
