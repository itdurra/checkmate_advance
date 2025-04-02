'use client';

import { CardRetro } from '@/components/ui-retro/card-retro';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const Licensing = () => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <div className='mx-auto mt-10 max-w-5xl space-y-6 px-4 text-left text-sm text-white'>
      <CardRetro className='p-4'>
        <h1 className='font-minecraft-bold text-2xl text-center mb-4'>
          🎓 Licensing & Acknowledgements
        </h1>
        <p>
          <strong>Checkmate Advance</strong> is a non-commercial indie game
          experiment made for fun and personal learning. Huge thanks to the
          developers, artists, and musicians whose work helped bring it to life.
        </p>
      </CardRetro>

      <CardRetro className='p-4'>
        <h2 className='font-minecraft-bold text-xl mb-2'>🧠 Code Libraries</h2>
        <ul className='list-disc space-y-1 pl-5'>
          <li>
            <strong>chess.js</strong> – chess logic engine (
            <a
              href='https://github.com/jhlywa/chess.js'
              className='text-blue-400 underline hover:text-blue-300'
              target='_blank'
              rel='noopener noreferrer'
            >
              MIT License
            </a>
            )
          </li>
          <li>
            <strong>react-chessboard</strong> – chessboard renderer (
            <a
              href='https://github.com/Clariity/react-chessboard'
              className='text-blue-400 underline hover:text-blue-300'
              target='_blank'
              rel='noopener noreferrer'
            >
              MIT License
            </a>
            )
          </li>
          <li>
            <strong>stockfish.js</strong> – WebAssembly chess engine (
            <a
              href='https://github.com/official-stockfish/Stockfish'
              className='text-blue-400 underline hover:text-blue-300'
              target='_blank'
              rel='noopener noreferrer'
            >
              GPL License
            </a>
            )
          </li>
          <li>
            <strong>Howler.js</strong> – audio playback (
            <a
              href='https://github.com/goldfire/howler.js'
              className='text-blue-400 underline hover:text-blue-300'
              target='_blank'
              rel='noopener noreferrer'
            >
              MIT License
            </a>
            )
          </li>
          <li>
            <strong>Zustand</strong>, <strong>Framer Motion</strong>,{' '}
            <strong>TailwindCSS</strong>, and others – MIT
          </li>
        </ul>
      </CardRetro>

      <CardRetro className='p-4'>
        <h2 className='font-minecraft-bold text-xl mb-2'>🎵 Music</h2>
        <p>
          Songs composed by{' '}
          <a
            href='https://www.youtube.com/watch?v=BUa7BKMf378&ab_channel=MatthewIvic'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 underline hover:text-blue-300'
          >
            Matthew A. Ivic
          </a>{' '}
        </p>
      </CardRetro>

      <CardRetro className='p-4'>
        <h2 className='font-minecraft-bold text-xl mb-2'>🎨 Art Assets</h2>
        <ul className='list-disc pl-5 mt-2 space-y-1'>
          <li>
            Chess pieces by{' '}
            <a
              href='https://wildlifestudios.itch.io/chess-set-pixel-art'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 underline hover:text-blue-300'
            >
              Wild Life
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
        </ul>
      </CardRetro>

      <CardRetro className='p-4'>
        <h2 className='font-minecraft-bold text-xl mb-2'>
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
          All trademarks and copyrights belong to their respective owners. This
          project is not affiliated with any official chess federation or
          commercial game entity.
        </p>
      </CardRetro>
    </div>
  );
};
