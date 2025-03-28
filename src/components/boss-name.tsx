import React, { useState } from 'react';

import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import Image from 'next/image';
import { gamePortrait } from '@/components/portraits';
import { ButtonRetro } from './ui-retro/button-retro';
import { GameOverPopup } from '@/components/game-over-popup';

export const BossName = () => {
  const { theme, isShopOpen, menu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const [gameOverPopup, setGameOverPopup] = useState(false);

  // Determine what to display based on the current menu state
  let title = '';
  switch (menu) {
    case 'storymode':
      if (isShopOpen) {
        title = 'Shop';
      } else {
        title = 'Level Select';
      }
      break;
    case 'game':
      title = boss.name;
      break;
    default:
      title = 'Menu';
  }

  return (
    <>
      <div>
        <CardRetro className='flex items-center gap-4 md:p-3'>
          {/* Center: Title */}
          <div className='font-minecraft-bold flex-grow text-center text-3xl'>
            {title}
          </div>
        </CardRetro>
      </div>
    </>
  );
};
