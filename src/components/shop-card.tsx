import React from 'react';
import { motion } from 'framer-motion';

import { shopPortrait } from '@/components/portraits';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { useGame } from '@/context/game-context';
import type { Card } from '@/types/card';
import { RarityClassMap } from '@/utils/rarity-class-map';

import { CardDescription } from './card-description';

type ShopCardProps = {
  card: Card;
  removePieceFromShop: (id: string, cost: number) => void;
  setIsShopOpen: (isOpen: boolean) => void;
};

export const ShopCard: React.FC<ShopCardProps> = ({
  card,
  removePieceFromShop,
  setIsShopOpen,
}) => {
  const { menu } = useGame();

  return (
    <motion.div
      className='h-full w-full'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className='h-full w-full'>
        <CardRetro className='flex h-72 w-full flex-col items-center justify-between text-center'>
          {/* Portrait */}
          <div className='flex flex-col items-center justify-center'>
            {shopPortrait(card.image)}
            <div
              className={`p-1 text-xs uppercase ${RarityClassMap[card.rarity]}`}
            >
              {card.rarity}
            </div>
          </div>

          {/* Name + Description */}
          <div className='mt-2'>
            <p className='font-minecraft-bold text-sm'>{card.name}</p>
            <p className='mx-auto max-w-[90%] font-minecraft text-xs leading-tight'>
              <CardDescription
                description={card.description}
                value={card.value}
              ></CardDescription>
            </p>
          </div>

          {/* Price Button */}
          <div className='mt-2'>
            <ButtonRetro
              onClick={() => removePieceFromShop(card.id, card.cost)}
            >
              {menu !== 'practice' ? `$${card.cost}` : 'Buy'}
            </ButtonRetro>
          </div>
        </CardRetro>
      </div>
    </motion.div>
  );
};
