import React from 'react';
import { motion } from 'framer-motion';

import { shopPortrait } from '@/components/portraits';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';

// Types
type Card = {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: string;
};

type ShopCardProps = {
  card: Card;
  removePieceFromShop: (id: string, rarity: string) => void;
  setIsShopOpen: (isOpen: boolean) => void;
  displayText: (rarity: string) => string;
};

export const ShopCard: React.FC<ShopCardProps> = ({
  card,
  removePieceFromShop,
  setIsShopOpen,
  displayText,
}) => (
  <motion.div
    className='h-full w-full'
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <div
      onClick={() => removePieceFromShop(card.id, card.rarity)}
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
          <ButtonRetro onClick={() => setIsShopOpen(true)}>
            {displayText(card.rarity)}
          </ButtonRetro>
        </div>
      </CardRetro>
    </div>
  </motion.div>
);
