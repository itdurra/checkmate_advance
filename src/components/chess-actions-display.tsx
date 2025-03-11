'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Popup, ProgressBar } from 'pixel-retroui';
import { Card } from 'pixel-retroui';

import { BarRetro } from '@/components/ui-retro/bar-retro';
import { ButtonPriRetro } from '@/components/ui-retro/button-pri-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { ControlMappingMenu } from './control-mapping-menu';
import { EnemyText } from './enemy-text';

export const ChessActionsDisplay = () => {
  const {
    setMultiplier,
    setDiverted,
    engine,
    game,
    setGamePosition,
    theme,
    mapping,
    setMapping,
    menu,
    setMenu,
    multiplier,
  } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const atkCost = 4;
  const engCost = 3;
  const undCost = 2;


  return (
    <CardRetro
      className='text-center md:p-3'
    >
      <div className='flex flex-row items-center justify-center'>
        <div>
          <div className='flex flex-row items-center justify-center p-2'>
            <p>{multiplier}x</p>
            <BarRetro
              size='md'
              color='pink'
              progress={multiplier * 20}
            />
          </div>
          <ButtonPriRetro
            onClick={() => {
              game.undo();
              game.undo();
              setGamePosition(game.fen());
              setMultiplier((prev) => prev - undCost);
            }}
            disabled={multiplier < undCost}
            className={`${
              multiplier < undCost
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-opacity-80'
            }`}
          >
            Undo
          </ButtonPriRetro>
          <ButtonPriRetro
            onClick={() => {
              engine.setDiverted(true);
              setDiverted(true);
              console.log(engine.getCurrentConfig());
              setMultiplier((prev) => prev - engCost);
            }}
            disabled={multiplier < engCost}
            className={`${
              multiplier < engCost
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-opacity-80'
            }`}
          >
            Engine
          </ButtonPriRetro>
          <ButtonPriRetro
            onClick={() => {
              engine.setAttacked(true);
              console.log(engine.getCurrentConfig());
              setMultiplier((prev) => prev - atkCost);
            }}
            disabled={multiplier < atkCost}
            className={`${
              multiplier < atkCost
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-opacity-80'
            }`}
          >
            Attack
          </ButtonPriRetro>
        </div>
      </div>
    </CardRetro>
  );
};
