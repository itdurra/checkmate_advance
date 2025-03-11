import { useState } from 'react';

import { ButtonRetro } from '@/components/ui-retro/button-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const Achievements = () => {
  const { theme, mapping, setMapping, menu, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <>
      <div className='title'>
        <h1>CHESS AI</h1> <h1>BOSS SELECT</h1>
      </div>
      <div className='title'></div>
      <div>
        <h2>Volume Settings</h2>
        <ButtonRetro onClick={() => setMenu('main')}>Back</ButtonRetro>
      </div>
    </>
  );
};
