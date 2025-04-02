'use client';

import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BackgroundMusic } from '../background-music';

import { CutScene } from './cutscene';
import { Game } from './game';
import { Licensing } from './licensing';
import { StoryMode } from './story-mode';

export const MainMenu = () => {
  const {
    theme,
    mapping,
    setMapping,
    menu,
    setMenu,
    musicEnabled,
    setMusicEnabled,
  } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  function MainMenuScreen() {
    return (
      <div className='justify-center text-center'>
        <div className='py-8'>
          <p className='font-minecraft-bold mt-8 mb-3 text-3xl md:text-4xl'>
            CheckMate Advance
          </p>
          <p className='font-minecraft text-gray-400'>
            Developer: <span className='text-black'>Queen De La Meme</span>
          </p>
          <p className='font-minecraft text-gray-400'>
            Music: <span className='text-black'>Matthew A. Ivic</span>
          </p>
          <p className='font-minecraft text-gray-400'>
            Art: <span className='text-black'>Wild Life</span>
          </p>
          <div className='mt-6 mt-auto text-center'>
          <button
            onClick={() => setMenu('settings')}
            className='text-sm text-gray-600 underline transition-all hover:text-blue-300'
          >
            View full licenses and credits →
          </button>
        </div>
        </div>
        <div>
          <div>
            <ButtonAltRetro
              onClick={() => setMenu('cutscene')}
              className='my-4 w-64 py-1 text-lg'
            >
              Play Demo
            </ButtonAltRetro>
          </div>
          <div>
            <ButtonRetro
              onClick={handleToggleMusic}
              className='my-4 w-64 py-1 text-lg'
            >
              Music [{musicEnabled ? 'On' : 'Off'}]
            </ButtonRetro>
          </div>
          <div>
            <ButtonRetro
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSd2UyVk5W1cDmfaQTHdwdePJNI62BaiTVbQ67Se_ZZjY6GYLw/viewform?usp=sharing',
                  '_blank'
                )
              }
              className='my-4 w-64 py-1 text-lg'
            >
              Give Feedback
            </ButtonRetro>
          </div>
        </div>
      </div>
    );
  }

  const handleToggleMusic = () => {
    if (musicEnabled) {
      setMusicEnabled(false); // turn off
    } else {
      setMusicEnabled(true); // turn on
    }
  };

  return (
    <div>
      {menu === 'main' && <MainMenuScreen />}
      {menu === 'storymode' && <StoryMode />}
      {menu === 'cutscene' && <CutScene />}
      {menu === 'game' && <Game />}
      {menu === 'settings' && <Licensing />}
      <BackgroundMusic></BackgroundMusic>
    </div>
  );
};
