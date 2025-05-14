'use client';

import { CardRetro } from '@/components/ui-retro/card-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { ButtonRetro } from '../ui-retro/button-retro';

export const Licensing = () => {
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
        <CardRetro className='p-4'>
          <h1 className='font-minecraft-bold mb-4 text-center text-2xl'>
            🎓 Licensing & Acknowledgements
          </h1>
          <p>
            <strong>Checkmate Advance</strong> is a non-commercial indie game
            experiment made by a solo-developer. Huge thanks to the artists,
            musicians, and play-testers whose work helped bring it to life. A
            special thanks to indie gems{' '}
            <a
              href='https://store.steampowered.com/app/2379780/Balatro/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 underline hover:text-blue-300'
            >
              <em>Balatro</em>
            </a>{' '}
            and{' '}
            <a
              href='https://store.steampowered.com/app/1404850/Luck_be_a_Landlord/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 underline hover:text-blue-300'
            >
              <em>Luck be a Landlord</em>
            </a>{' '}
            whose underlying mechanics inspired the creation of this game. You
            can view the source code on{' '}
            <a
              href='https://github.com/itdurra/checkmate_advance'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 underline hover:text-blue-300'
            >
              Github
            </a>
            .
          </p>
        </CardRetro>

        <CardRetro className='p-4'>
          <h2 className='font-minecraft-bold mb-2 text-xl'>
            🧠 Code Libraries
          </h2>
          <ul className='list-disc space-y-1 pl-5'>
            <li>
              <strong>chess.js</strong> – chess logic engine
            </li>
            <li>
              <strong>react-chessboard</strong> – chessboard renderer
            </li>
            <li>
              <strong>stockfish.js</strong> – WebAssembly chess engine
            </li>
            <li>
              <strong>Howler.js</strong> – audio playback
            </li>
            <li>
              <strong>Zustand</strong>, <strong>Framer Motion</strong>,{' '}
              <strong>TailwindCSS</strong>, and others
            </li>
          </ul>
        </CardRetro>

        <CardRetro className='p-4'>
          <h2 className='font-minecraft-bold mb-2 text-xl'>🎵 Music</h2>
          <ul className='mt-2 list-disc space-y-1 pl-5'>
            <li>
              Songs composed by{' '}
              <a
                href='https://www.youtube.com/watch?v=BUa7BKMf378&ab_channel=MatthewIvic'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-300'
              >
                Matthew A. Ivic
              </a>{' '}
            </li>
            <li>
              Sound Effects by{' '}
              <a
                href='https://opengameart.org/content/51-ui-sound-effects-buttons-switches-and-clicks'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-300'
              >
                Kenney.nl
              </a>{' '}
            </li>
          </ul>
        </CardRetro>

        <CardRetro className='p-4'>
          <h2 className='font-minecraft-bold mb-2 text-xl'>🎨 Art Assets</h2>
          <ul className='mt-2 list-disc space-y-1 pl-5'>
            <li>
              Pixel Neon piece set by{' '}
              <a
                href='https://sharechess.github.io'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-300'
              >
                therealqtpi & caderek (sharechess.github.io)
              </a>
            </li>
            <li>
              Card Art by{' '}
              <a
                href='https://opengameart.org/content/496-pixel-art-icons-for-medievalfantasy-rpg'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-300'
              >
                Henrique Lazarini
              </a>
            </li>
            <li>
              UI elements from{' '}
              <a
                href='https://www.retroui.io/'
                className='text-blue-400 underline hover:text-blue-300'
                target='_blank'
                rel='noopener noreferrer'
              >
                Dskie09&apos;s RetroUI
              </a>{' '}
            </li>
            <li>
              Additional textures by{' '}
              <a
                href='https://opengameart.org/content/shiny-window-pane'
                className='text-blue-400 underline hover:text-blue-300'
                target='_blank'
                rel='noopener noreferrer'
              >
                Fupi
              </a>{' '}
            </li>
          </ul>
        </CardRetro>

        <CardRetro className='p-4'>
          <h2 className='font-minecraft-bold mb-2 text-xl'>
            📝 Full License Texts
          </h2>
          <a
            href='/attribution.txt'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-sm text-blue-400 underline hover:text-blue-300'
          >
            View attribution.txt
          </a>
          <p className='py-2 text-xs text-gray-600'>
            All trademarks and copyrights belong to their respective owners.
            This project is not affiliated with any official chess federation or
            commercial game entity.
          </p>
        </CardRetro>
        <ButtonRetro className='mr-auto w-48' onClick={() => setMenu('main')}>
          Main Menu
        </ButtonRetro>
      </div>
    </>
  );
};
