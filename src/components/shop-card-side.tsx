import React from 'react';
import { motion } from 'framer-motion';

import { shopPortrait } from '@/components/portraits';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import type { Card } from '@/types/card';
import { RarityClassMap } from '@/utils/rarity-class-map';

import { CardDescription } from './card-description';

type ShopCardSideProps = {
  card: Card;
  removePieceFromShop: (id: string, cost: number) => void;
  setIsShopOpen: (isOpen: boolean) => void;
};

export const ShopCardSide: React.FC<ShopCardSideProps> = ({
  card,
  removePieceFromShop,
}) => (
  <motion.div
    className='w-full'
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <div className=''>
      <CardRetro className='mb-6 h-42 flex flex-row items-stretch justify-between gap-2'>
        {/* Left Column: Image */}
        <div className='flex w-1/3 flex-col items-center justify-center'>
          {shopPortrait(card.image)}
          <div className={`p-1 text-xs uppercase ${RarityClassMap[card.rarity]}`}>{card.rarity}</div>
        </div>

        {/* Right Column: Text and Button */}
        <div className='flex w-2/3 flex-col justify-between'>
          <div>
            <p className='font-minecraft-bold text-sm'>{card.name}</p>
            <p className='mt-1 text-xs'>
              <CardDescription
                description={card.description}
                value={card.value}
              />
            </p>
          </div>

          {/* Price Button */}
          <div className='mt-2'>
            <ButtonRetro
              onClick={() => removePieceFromShop(card.id, card.cost)}
            >
              ${card.cost}
            </ButtonRetro>
          </div>
        </div>
      </CardRetro>
    </div>
  </motion.div>
);
