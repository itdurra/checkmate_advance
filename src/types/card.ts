import { cardType } from "./cardType";
import { rarity } from "./rarity";
import { subtype } from "./subtype";

export type Card = {
  id: string;
  type: cardType;
  subtype: subtype;
  name: string;
  description: string;
  image: string;
  effect: string;
  rarity: rarity;
  cost: number;
  value: number;
  upgrade: number;
  active: Boolean;
};





