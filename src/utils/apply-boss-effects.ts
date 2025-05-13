import { useScoreStore } from '@/stores/useScoreStore';
import { subtype } from '@/types/subtype';

//loops through cards, disables cards that relate to boss effect piece
export function disablePieceCards(): void{
  const {
    activeCards,
    bossEffect,
  } = useScoreStore.getState();

  for (const card of activeCards) {
    if (card.subtype.includes(bossEffect)){
      card.active = false;
    }
  }

}

//loops through cards, enables all
export function enableAllCards(): void{
  const {
    activeCards,
  } = useScoreStore.getState();

  for (const card of activeCards) {
    card.active = true;
  }

}