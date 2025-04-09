import React from 'react';
import { motion } from 'framer-motion';

import { shopPortrait } from '@/components/portraits';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import type { Card } from '@/types/card';

type ShopCardProps = {
  card: Card;
  removePieceFromShop: (id: string, cost: number) => void;
  setIsShopOpen: (isOpen: boolean) => void;
};

export const ShopCard: React.FC<ShopCardProps> = ({
  card,
  removePieceFromShop,
  setIsShopOpen,
}) => (
  <motion.div
    className='h-full w-full'
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <div
      className='h-full w-full'
    >
      <CardRetro className='h-72 w-full flex flex-col items-center justify-between text-center'>
        {/* Portrait */}
        <div className='flex flex-col items-center justify-center'>
          {shopPortrait(card.image)}
          <p className='font-minecraft text-xs mt-1 uppercase'>{card.rarity}</p>
        </div>

        {/* Name + Description */}
        <div className='mt-2'>
          <p className='font-minecraft-bold text-sm'>{card.name}</p>
          <p className='text-xs font-minecraft leading-tight max-w-[90%] mx-auto'>
            {card.description}
          </p>
        </div>

        {/* Price Button */}
        <div className='mt-2'>
          <ButtonRetro onClick={() => removePieceFromShop(card.id, card.cost)}>
            ${card.cost}
          </ButtonRetro>
        </div>
      </CardRetro>
    </div>
  </motion.div>
);
