'use client';
import { Button } from 'pixel-retroui';

import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BackgroundMusic } from '../background-music';
import { ControlMappingMenu } from '../control-mapping-menu';

import { Achievements } from './achievements';
import { CharacterUnlock } from './character-unlock';
import { CutScene } from './cutscene';
import { FreePlay } from './freeplay';
import { Game } from './game';
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

  function Volume() {
    return (
      <div>
        <h2>Volume Settings</h2>
        <ButtonRetro onClick={() => setMenu('settings')}>Back</ButtonRetro>
      </div>
    );
  }

  function Controls() {
    return (
      <div>
        <ControlMappingMenu />
        <ButtonRetro onClick={() => setMenu('settings')}>Back</ButtonRetro>
      </div>
    );
  }

  function Settings() {
    return (
      <div>
        <div className='w-full'>
          <ButtonRetro onClick={() => setMenu('controls')}>
            Controls
          </ButtonRetro>
        </div>
        <div className='w-full'>
          <ButtonRetro onClick={() => setMenu('volume')}>Audio</ButtonRetro>
        </div>
        <div className='w-full'>
          <ButtonRetro onClick={() => setMenu('main')}>Back</ButtonRetro>
        </div>
      </div>
    );
  }

  function MainMenuScreen() {
    return (
      <div className='justify-center text-center'>
        <div className='py-8'>
          <p className='font-minecraft-bold mt-8 text-3xl md:text-4xl'>
            CheckMate Advance
          </p>
          <p className='font-minecraft'>A Motherboy Production</p>
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
    );
  }

  function FeedbackForm() {
    return (
      <div className='flex items-center justify-center p-4'>
        <iframe
          src='https://docs.google.com/forms/d/e/1FAIpQLSd2UyVk5W1cDmfaQTHdwdePJNI62BaiTVbQ67Se_ZZjY6GYLw/viewform?embedded=true'
          width='640'
          height='883'
        >
          Loading…
        </iframe>
        <div className='mt-4 w-full text-center'>
          <ButtonRetro onClick={() => setMenu('main')}>Back</ButtonRetro>
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
      {menu === 'settings' && <Settings />}
      {menu === 'controls' && <Controls />}
      {menu === 'volume' && <Volume />}
      {menu === 'storymode' && <StoryMode />}
      {menu === 'freeplay' && <FreePlay />}
      {menu === 'achievements' && <Achievements />}
      {menu === 'cutscene' && <CutScene />}
      {menu === 'character_unlock' && <CharacterUnlock />}
      {menu === 'game' && <Game />}
      {menu === 'feedback' && <FeedbackForm />}
      <BackgroundMusic></BackgroundMusic>
    </div>
  );
};
