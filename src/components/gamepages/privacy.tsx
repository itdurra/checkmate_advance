'use client';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { PrivacyPolicy } from '../privacy-policy';
import { ButtonRetro } from '../ui-retro/button-retro';

export const Privacy = () => {
  const { theme, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <>
      <div className='mx-auto max-w-5xl space-y-6 px-4 text-left text-sm text-white'>
        <div className='w-full'></div>
        <ButtonRetro
          className='mr-auto hidden w-48 md:block'
          onClick={() => setMenu('main')}
        >
          Main Menu
        </ButtonRetro>
        <PrivacyPolicy></PrivacyPolicy>

        <ButtonRetro className='mr-auto w-48' onClick={() => setMenu('main')}>
          Main Menu
        </ButtonRetro>
      </div>
    </>
  );
};
