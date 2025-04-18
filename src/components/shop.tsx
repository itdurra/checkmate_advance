import React from 'react';
import { useState } from 'react';

import { NotEnoughMoneyPopup } from '@/components/popups/not-enough-money-popup';
import { ShopCard } from '@/components/shop-card';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

import { NotEnoughRoomPopup } from './popups/not-enough-room-popup';

export const Shop: React.FC = () => {
  // Zustand store with TypeScript types
  const removeCardFromShop = useScoreStore((state) => state.removeCardFromShop);
  const addCard = useScoreStore((state) => state.addCard);
  const money = useScoreStore((state) => state.money);
  const setMoney = useScoreStore((state) => state.setMoney);
  const shopCards = useScoreStore((state) => state.shopCards);
  const refreshShop = useScoreStore((state) => state.refreshShop);
  const activeCards = useScoreStore((state) => state.activeCards);
  const maxCards = useScoreStore((state) => state.maxCards);

  const [notEnoughMoneyPopup, setNotEnoughMoneyPopup] = useState(false);
  const [notEnoughRoomPopup, setNotEnoughRoomPopup] = useState(false);

  const { level, setIsShopOpen } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const removePieceFromShop = (id: string, price: number) => {
    if (money < price) {
      setNotEnoughMoneyPopup(true);
      return;
    }
    if (activeCards.length >= maxCards) {
      setNotEnoughRoomPopup(true);
      return;
    }

    setMoney(money - price);

    removeCardFromShop(id);
    addCard(id);
  };

  const reroll = () => {
    if (money < 100) {
      setNotEnoughMoneyPopup(true);
      return;
    }
    setMoney(money - 100);
    refreshShop();
    setHasRefreshed(true);
  };

  return (
    <>
      <CardRetroNoMotion className='h-[576px] w-auto text-center'>
        <div>Select your upgrades</div>
        <div>
          {!hasRefreshed && (
            <ButtonRetro onClick={reroll} className='mt-4 w-72'>
              Refresh Store $100
            </ButtonRetro>
          )}
          <ButtonAltRetro onClick={() => setIsShopOpen(false)}>
            Continue...
          </ButtonAltRetro>
        </div>

        <div className='mx-auto grid h-48 w-[95%] grid-cols-3 place-items-center gap-4 p-3 text-center'>
          {/* Render each shop card position explicitly */}
          {shopCards[0] && (
            <ShopCard
              card={shopCards[0]}
              removePieceFromShop={removePieceFromShop}
              setIsShopOpen={setIsShopOpen}
            />
          )}

          {shopCards[1] && (
            <ShopCard
              card={shopCards[1]}
              removePieceFromShop={removePieceFromShop}
              setIsShopOpen={setIsShopOpen}
            />
          )}

          {shopCards[2] && (
            <ShopCard
              card={shopCards[2]}
              removePieceFromShop={removePieceFromShop}
              setIsShopOpen={setIsShopOpen}
            />
          )}
        </div>
      </CardRetroNoMotion>
      <NotEnoughMoneyPopup
        isOpen={notEnoughMoneyPopup}
        closeNotEnoughMoneyPopup={() => setNotEnoughMoneyPopup(false)}
      />
      <NotEnoughRoomPopup
        isOpen={notEnoughRoomPopup}
        closeNotEnoughRoomPopup={() => setNotEnoughRoomPopup(false)}
      />
    </>
  );
};
