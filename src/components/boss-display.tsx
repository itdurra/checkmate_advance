'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { EnemyText } from '@/components/enemy-text';
import { gamePortrait } from '@/components/portraits';
import { GameOverPopup } from '@/components/game-over-popup';
import { BarRetro } from '@/components/ui-retro/bar-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { ButtonRetro } from './ui-retro/button-retro';
import { ChessUIControls } from './chess-ui-controls';
import { ControlMappingMenu } from './control-mapping-menu';

export const BossDisplay = () => {
  const { level, theme, menu } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const openInfoPopup = () => setIsInfoPopupOpen(true);
  const closeInfoPopup = () => setIsInfoPopupOpen(false);
  const [gameOverPopup, setGameOverPopup] = useState(false);

  return (
    <div className='flex flex-row gap-1 md:flex-col'>
      <CardRetro className='w-1/3 p-1 text-center md:w-auto md:p-3'>
        <div className='flex flex-col items-center md:flex-row md:gap-3'>
          <div onClick={openInfoPopup}>{gamePortrait(boss.image)}</div>
          <div className='w-full'>
            <p className='text-center text-sm'>
              Score {boss.score} points to win
            </p>
            {menu === 'game' && (
              <>
                <ButtonRetro
                  className='text-sm'
                  onClick={() => setGameOverPopup(true)}
                >
                  Resign{' '}
                </ButtonRetro>
              </>
            )}{' '}
          </div>
        </div>
      </CardRetro>
      <PopupRetro isOpen={isInfoPopupOpen} onClose={closeInfoPopup}>
        <Image
          src={boss.image}
          width={300}
          height={300}
          priority
          quality={100}
          alt='Enemy Profile Picture'
        />
        <div className='text-center'>
          <h2 className='font-minecraft'>
            Level {boss.level}: {boss.name}
          </h2>
        </div>
      </PopupRetro>
      <GameOverPopup
        isOpen={gameOverPopup}
        closeGameOverPopup={() => setGameOverPopup(false)}
      ></GameOverPopup>
    </div>
  );
};
