import { useState } from 'react';

import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { BossLevelSelect } from '../boss-level-select';
import { BossName } from '../boss-name';
import { BossSelectBox } from '../boss-select-box';
import { ChessActionsDisplay } from '../chess-actions-display';
import { Shop } from '../shop';

export const StoryMode = () => {
  const { theme, setMenu, setLevel, isShopOpen } = useGame();
  const [page, setPage] = useState(0); // Page 0 → first 4 bosses, Page 1 → next 4
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const bossGroups = [
    bosses.bosses.slice(0, 7).filter((boss) => boss.level !== 4),
  ];

  return (
    <div className='mx-auto flex h-full w-full max-w-[465px] flex-col gap-1 md:grid md:max-w-7xl md:gap-4 md:grid-cols-[1fr_2fr_1fr]'>
      <div>
        <BossName></BossName>
        <BossSelectBox />
      </div>
      {isShopOpen ? (
        <div className='h-[567px]'>
          <Shop></Shop>
        </div>
      ) : (
        <div className='h-[567px]'>
          <BossLevelSelect></BossLevelSelect>
        </div>
      )}
      <div className='self-center'>
        <ChessActionsDisplay></ChessActionsDisplay>
      </div>
    </div>
  );
};
