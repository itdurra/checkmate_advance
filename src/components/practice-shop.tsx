import React from 'react';
import { useState } from 'react';
import { DropdownMenuItem, DropdownMenuSeparator } from 'pixel-retroui';

import { NotEnoughMoneyPopup } from '@/components/popups/not-enough-money-popup';
import { ShopCard } from '@/components/shop-card';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import prices from '@/config/prices.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { abbreviateNumber } from '@/utils/abbreviate-number';
import { rarityOrder } from '@/utils/rarity-order';

import { NotEnoughRoomPopup } from './popups/not-enough-room-popup';
import { DropdownRetro } from './ui-retro/dropdown-retro';
import { ShopCardSide } from './shop-card-side';

export const PracticeShop: React.FC = () => {
  const removeCardFromShop = useScoreStore((state) => state.removeCardFromShop);
  const addCard = useScoreStore((state) => state.addCard);
  const money = useScoreStore((state) => state.money);
  const setMoney = useScoreStore((state) => state.setMoney);
  const shopCards = useScoreStore((state) => state.shopCards);
  const allCards = useScoreStore((state) => state.allCards);
  const refreshShop = useScoreStore((state) => state.refreshShop);
  const activeCards = useScoreStore((state) => state.activeCards);
  const setActiveCards = useScoreStore((state) => state.setActiveCards);
  const maxCards = useScoreStore((state) => state.maxCards);

  const [notEnoughMoneyPopup, setNotEnoughMoneyPopup] = useState(false);
  const [notEnoughRoomPopup, setNotEnoughRoomPopup] = useState(false);

  const { level, setIsShopOpen } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const price = prices.prices;
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const [hasUpgraded, setHasUpgraded] = useState(false);

  const removePieceFromShop = (id: string, price: number) => {
    if (activeCards.length >= maxCards) {
      setNotEnoughRoomPopup(true);
      return;
    }
    addCard(id);
  };

  const upgrade = (id: string, cost: number) => {
    const updatedCards = activeCards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          value: card.value + card.value,
          upgrade: card.upgrade + 1,
        };
      }
      //update stats
      return card;
    });
    setActiveCards(updatedCards);
  };

  const [usedCardIds, setUsedCardIds] = useState<string[]>([]);

  const availableCards = activeCards.filter(
    (card) => !usedCardIds.includes(card.id)
  );

  return (
    <>
      <CardRetroNoMotion className='h-[576px] w-auto justify-between overflow-y-scroll text-center'>
        <div className=''>
          <div className='hidden md:mb-2 md:block'>
            Select your upgrades: <strong>${abbreviateNumber(money)}</strong>
          </div>
          <div className='mx-auto grid grid-cols-3 items-center justify-center'>
            <DropdownRetro title='Upgrade' className='mx-auto'>
              {availableCards.length > 0 ? (
                <>
                  {availableCards.map((card, index) => (
                    <DropdownMenuItem key={`${card.id}-${index}`}>
                      <div
                        className='w-72'
                        onClick={() =>
                          upgrade(
                            card.id,
                            Math.floor(card.cost * Math.pow(2, card.upgrade))
                          )
                        }
                      >
                        {card.name} $
                        {abbreviateNumber(
                          Math.floor(card.cost * Math.pow(2, card.upgrade))
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Pick a card to upgrade</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    No Cards Available to Upgrade
                  </DropdownMenuItem>
                </>
              )}
            </DropdownRetro>
            <ButtonAltRetro onClick={() => setIsShopOpen(false)}>
              Continue...
            </ButtonAltRetro>
          </div>
        </div>
        {/* Browser version */}
        <div className='mx-auto mt-6 hidden w-[95%] grid-cols-3 place-items-center gap-4 text-center lg:grid'>
          {/* Render each shop card position explicitly - there was a duplicate id bug this fixed.*/}
          {allCards.map(
            (card, index) =>
              card && (
                <ShopCard
                  key={card.id || index} // Important: give each item a unique key!
                  card={card}
                  removePieceFromShop={removePieceFromShop}
                  setIsShopOpen={setIsShopOpen}
                />
              )
          )}
        </div>
        {/* Mobile version */}
        <div className='mx-auto mt-6 grid w-[95%] grid-cols-1 place-items-center text-center lg:hidden'>
          {/* Render each shop card position explicitly - there was a duplicate id bug this fixed. */}
          {allCards
            .sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity])
            .map(
              (card, index) =>
                card && (
                  <ShopCardSide
                    key={card.id || index} // Important: give each item a unique key!
                    card={card}
                    removePieceFromShop={removePieceFromShop}
                    setIsShopOpen={setIsShopOpen}
                  />
                )
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
