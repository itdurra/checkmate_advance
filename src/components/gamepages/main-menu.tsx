'use client';

import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BackgroundMusic } from '../background-music';
import { BioCard } from '../bio-card';
import { EmailSignupForm } from '../email-signup-form';
import { CardRetroAltNoMotion } from '../ui-retro/card-retro-alt-no-motion';
import { CardRetroNoMotion } from '../ui-retro/card-retro-no-motion';

import { CutScene } from './cutscene';
import { Game } from './game';
import { Licensing } from './licensing';
import { Practice } from './practice';
import { PracticeCutScene } from './practice-cutscene';
import { Privacy } from './privacy';
import { StoryMode } from './story-mode';

export const MainMenu = () => {
  const { theme, menu, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  function MainMenuScreen() {
    return (
      <div className='justify-center text-center'>
        <CardRetroNoMotion className='mx-auto max-w-lg'>
          <div className='py-8'>
            <p className='font-minecraft-bold text-3xl md:text-4xl'>
              Checkmate Advance
            </p>
            <p className='font-minecraft-bold mb-3 text-2xl italic text-[#c381b5] md:text-3xl'>
              by Ian Durra
            </p>
            <p className='font-minecraft text-gray-400'>
              Music: <span className='text-[#c381b5]'>Matthew A. Ivic</span>
            </p>
            <div className='mt-2 mt-auto text-center'>
              <button
                onClick={() => setMenu('settings')}
                className='text-sm text-gray-400 underline transition-all hover:text-blue-300'
              >
                View full licenses and credits →
              </button>
            </div>
          </div>
          <div className='mx-auto mb-2 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-2'>
            <ButtonAltRetro
              onClick={() => setMenu('cutscene')}
              className='w-48 py-2 text-lg tracking-wide'
            >
              Play Game
            </ButtonAltRetro>

            <ButtonRetro
              onClick={() => setMenu('practice_cutscene')}
              className='w-48 py-2 text-lg tracking-wide'
            >
              Practice
            </ButtonRetro>
          </div>
        </CardRetroNoMotion>
        <div className='mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center md:grid md:grid-cols-2 md:gap-4'>
          <CardRetroAltNoMotion className='mt-8 max-w-md p-4'>
            <EmailSignupForm />
          </CardRetroAltNoMotion>
          <CardRetroAltNoMotion className='mt-8 max-h-60 w-full max-w-md overflow-y-auto p-4 text-sm'>
            <h2 className='mb-2 text-lg font-bold text-[#c381b5]'>
              Release Log
            </h2>
            <ul className='list-disc space-y-4 pl-5 text-sm leading-relaxed'>
              <li className='list-none'>
                <span className='text-[#c381b5]'>v1.0: Full Release</span>
                <ul className='list-disc md:pl-5'>
                  <li>80 unique upgradeable cards</li>
                  <li>9 story levels, endless mode, practice mode</li>
                  <li>Adjustable difficulty, statistics tracking</li>
                  <li>Sound effects, animations & mobile support</li>
                </ul>
              </li>
              <li className='list-none'>
                <div className='text-[#c381b5]'>v0.5.0: Public Beta</div>
                <ul className='list-disc md:pl-5'>
                  <li>Core chess/deckbuilding gameplay</li>
                  <li>34 cards and 9 levels</li>
                  <li>Retro UI and background music</li>
                  <li>Unresolved bugs and missing features</li>
                </ul>
              </li>
            </ul>
          </CardRetroAltNoMotion>
        </div>
        <div>
          <CardRetroAltNoMotion className='max-w-md mx-auto mt-6'>
            {' '}
            <BioCard />
          </CardRetroAltNoMotion>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      {menu === 'main' && <MainMenuScreen />}
      {menu === 'storymode' && <StoryMode />}
      {menu === 'cutscene' && <CutScene />}
      {menu === 'game' && <Game />}
      {menu === 'settings' && <Licensing />}
      {menu === 'practice' && <Practice />}
      {menu === 'practice_cutscene' && <PracticeCutScene />}
      {menu === 'privacy' && <Privacy />}
      <BackgroundMusic></BackgroundMusic>
    </div>
  );
};
