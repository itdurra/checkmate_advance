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
  const { theme, mapping, setMapping, menu, setMenu } = useGame();
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
            <ButtonRetro
              onClick={() => setMenu('cutscene')}
              className='my-4 w-64 py-1 text-lg'
            >
              Play Demo
            </ButtonRetro>
          </div>
          <div>
            <ButtonAltRetro
              onClick={() => setMenu('settings')}
              className='my-4 w-64 py-1 text-lg'
            >
              Settings
            </ButtonAltRetro>
          </div>
        </div>
      </div>
    );
  }

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
      <BackgroundMusic></BackgroundMusic>
    </div>
  );
};
