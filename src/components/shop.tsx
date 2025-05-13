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
import { useStatsStore } from '@/stores/useStatsStore';
import { abbreviateNumber } from '@/utils/abbreviate-number';

import { NotEnoughRoomPopup } from './popups/not-enough-room-popup';
import { DropdownAltRetro } from './ui-retro/dropdown-alt-retro';
import { DropdownRetro } from './ui-retro/dropdown-retro';
import { ShopCardSide } from './shop-card-side';

export const Shop: React.FC = () => {
  const removeCardFromShop = useScoreStore((state) => state.removeCardFromShop);
  const addCard = useScoreStore((state) => state.addCard);
  const money = useScoreStore((state) => state.money);
  const setMoney = useScoreStore((state) => state.setMoney);
  const shopCards = useScoreStore((state) => state.shopCards);
  const refreshShop = useScoreStore((state) => state.refreshShop);
  const activeCards = useScoreStore((state) => state.activeCards);
  const setActiveCards = useScoreStore((state) => state.setActiveCards);
  const maxCards = useScoreStore((state) => state.maxCards);
  //update stats
  const incrementUpgradeCount = useStatsStore(
    (state) => state.incrementUpgradeCount
  );
  const trySetHighestUpgrade = useStatsStore(
    (state) => state.trySetHighestUpgrade
  );
  const spendMoney = useStatsStore((state) => state.spendMoney);

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
    if (money < price.refresh) {
      setNotEnoughMoneyPopup(true);
      return;
    }
    setMoney(money - price.refresh);
    refreshShop();
    setHasRefreshed(true);
  };

  const upgrade = (id: string, cost: number) => {
    if (money < cost) {
      setNotEnoughMoneyPopup(true);
      return;
    }
    const updatedCards = activeCards.map((card) => {
      if (card.id === id) {
        //update stats
        incrementUpgradeCount();
        trySetHighestUpgrade({
          cardName: card.name,
          upgradeLevel: card.upgrade + 1,
        });
        spendMoney(money);
        return {
          ...card,
          value: card.value + card.value,
          upgrade: card.upgrade + 1,
        };
      }
      //update stats
      return card;
    });
    setMoney(money - cost);

    setActiveCards(updatedCards);
    setHasUpgraded(true);
    setUsedCardIds((prev) => [...prev, id]);
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
            {availableCards.length > 0 ? (
              <DropdownAltRetro title='Upgrade' className='mx-auto'>
                {availableCards.map((card) => (
                  <DropdownMenuItem key={card.id}>
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
                      {Math.floor(card.cost * Math.pow(2, card.upgrade))}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>Pick a card to upgrade</DropdownMenuItem>
              </DropdownAltRetro>
            ) : (
              <DropdownRetro title='Upgrade' className='mx-auto'>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  No Cards Available to Upgrade
                </DropdownMenuItem>
              </DropdownRetro>
            )}
            {!hasRefreshed && (
              <ButtonRetro onClick={reroll} className=''>
                Refresh ${price.refresh}
              </ButtonRetro>
            )}
            <ButtonAltRetro onClick={() => setIsShopOpen(false)}>
              Continue...
            </ButtonAltRetro>
          </div>
        </div>
        {/* Browser version */}
        <div className='mx-auto mt-6 hidden w-[95%] grid-cols-3 place-items-center gap-4 text-center lg:grid'>
          {/* Render each shop card position explicitly - there was a duplicate id bug this fixed.*/}
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
        {/* Mobile version */}
        <div className='mx-auto mt-6 grid w-[95%] grid-cols-1 place-items-center text-center lg:hidden'>
          {/* Render each shop card position explicitly - there was a duplicate id bug this fixed. */}
          {shopCards[0] && (
            <ShopCardSide
              card={shopCards[0]}
              removePieceFromShop={removePieceFromShop}
              setIsShopOpen={setIsShopOpen}
            />
          )}

          {shopCards[1] && (
            <ShopCardSide
              card={shopCards[1]}
              removePieceFromShop={removePieceFromShop}
              setIsShopOpen={setIsShopOpen}
            />
          )}

          {shopCards[2] && (
            <ShopCardSide
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
