'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { EnemyText } from '@/components/enemy-text';
import { gamePortrait } from '@/components/portraits';
import { BarRetro } from '@/components/ui-retro/bar-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { PopupRetro } from '@/components/ui-retro/popup-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { ChessUIControls } from './chess-ui-controls';
import { ControlMappingMenu } from './control-mapping-menu';

export const BossDisplay = () => {
  const { level, game, setGamePosition } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const { theme, mapping, setMapping, menu, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const openInfoPopup = () => setIsInfoPopupOpen(true);
  const closeInfoPopup = () => setIsInfoPopupOpen(false);

  return (
    <div className='flex flex-row gap-1 md:flex-col'>
      <CardRetro
        className='w-1/3 p-1 text-center md:w-auto md:p-3'
      >
        <div className='hidden md:flex'>
          <EnemyText></EnemyText>
        </div>
        <div className='flex flex-col items-center md:flex-row md:gap-3'>
          <div onClick={openInfoPopup}>{gamePortrait(boss.image)}</div>
          <div className="w-full">
            <p className='text-sm text-center'>{boss.name}</p>
            <div className='flex flex-row'>
              <p className='text-xs'>ATK</p>
              <BarRetro
                size='sm'
                color='red'
                progress={75}
                className='w-full'
              />
            </div>
            <div className='flex flex-row'>
              <p className='text-xs'>DEF</p>
              <BarRetro
                size='sm'
                color='blue'
                progress={25}
                className='w-full'
              />
            </div>
          </div>
        </div>
      </CardRetro>
      <CardRetro
        className='w-2/3 p-1 text-center md:w-auto md:p-3'
      >
        <div className='flex h-full flex-col justify-between'>
          <div className='h-full) md:hidden'>
            <EnemyText />
          </div>
          <div className='w-full'>
            <ChessUIControls />
          </div>
        </div>

        <PopupRetro
          isOpen={isInfoPopupOpen}
          onClose={closeInfoPopup}
        >
          <Image
            src={boss.image}
            width={300}
            height={300}
            priority
            quality={100}
            alt='Enemy Profile Picture'
          />
          <h2 className='font-minecraft'>
            Level {boss.level}: {boss.name}
          </h2>
          <p>{boss.description}</p>
          <p>{boss.weakness}</p>
        </PopupRetro>
      </CardRetro>
    </div>
  );
};
