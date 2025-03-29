'use client';
import React, { useState } from 'react';
import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { GameStatsPopup } from '@/components/popups/game-stats-popup';

export const BossSelectBox = () => {
  const money = useScoreStore((state) => state.money);
  const resetRun = useScoreStore((state) => state.resetRun);
  const {
    theme,
    mapping,
    setMapping,
    menu,
    setMenu,
    level,
    bossProgression,
    setIsShopOpen,
    isShopOpen,
  } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameStatsPopup, setGameStatsPopup] = useState(false);

  return (
    <>
      <CardRetro className='items center mt-6 flex flex-col gap-2 p-2 text-center'>
        <div className='font-minecraft-bold text-lg'>Credits: {money}</div>
        <ButtonAltRetro onClick={() => setGameStatsPopup(true)}>
          Information
        </ButtonAltRetro>
        <ButtonRetro
          onClick={() => {
            resetRun();
            setIsShopOpen(false);
          }}
        >
          Restart Run
        </ButtonRetro>
        <ButtonRetro onClick={() => setMenu('main')}>Quit</ButtonRetro>
        {isShopOpen ? (
          <ButtonAltRetro onClick={() => setIsShopOpen(false)}>
            Level Select
          </ButtonAltRetro>
        ) : (
          <ButtonAltRetro onClick={() => setIsShopOpen(true)}>
            TESTING Shop
          </ButtonAltRetro>
        )}
      </CardRetro>
      <GameStatsPopup
        isOpen={gameStatsPopup}
        closeGameStatsPopup={() => setGameStatsPopup(false)}
      ></GameStatsPopup>
    </>
  );
};
