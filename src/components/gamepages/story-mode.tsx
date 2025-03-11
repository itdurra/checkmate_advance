import { useState } from 'react';

import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BossSelectBox } from '../boss-select-box';
import { roundedPortrait } from '../portraits';

export const StoryMode = () => {
  const { theme, setMenu, setLevel } = useGame();
  const [page, setPage] = useState(0); // Page 0 → first 4 bosses, Page 1 → next 4
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const bossGroups = [
    bosses.bosses.slice(0, 4).filter((boss) => boss.level !== 2),
  ];

  return (
    <div className='flex w-full flex-col items-center justify-center p-4'>
      <div className='grid w-full max-w-md grid-cols-2 gap-2 p-4'>
        {bossGroups[page].map((boss) => (
          <div key={boss.level} className='flex justify-center'>
            <CardRetro className='text-center'>
              {' '}
              {roundedPortrait(boss.image, setLevel, boss.level)}
            </CardRetro>
          </div>
        ))}
      </div>

      {/* Boss Select Box */}
      <div>
        <BossSelectBox />
      </div>
    </div>
  );
};
