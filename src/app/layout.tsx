import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GameProvider } from '@/context/game-context';

import { Navigation } from './navigation';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkmate Advance',
  description: 'Roguelike deckbuilding meets modern chess',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <GameProvider>
          <div className='relative flex min-h-screen flex-col font-minecraft'>
            <AppBar />
            <main className='flex flex-1 flex-col justify-center gap-5 p-4'>
              {children}
            </main>
            <Footer />
          </div>
        </GameProvider>
      </body>
    </html>
  );
}

function AppBar() {
  return (
    <Navigation></Navigation>
  );
}

function Footer() {
  return (
    <footer className='mt-auto px-4 pt-6 text-sm text-gray-400 md:flex md:flex-col items-center space-y-2'>
      {/* Link Row */}
      <div className='flex flex-row justify-center space-x-6'>
        <a
          href='https://ko-fi.com/iandurra'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-blue-300 transition'
        >
          Ko-fi
        </a>
        <a
          href='https://github.com/itdurra/checkmate_advance'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-blue-300 transition'
        >
          Github
        </a>
                <a
          href='/privacy'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-blue-300 transition'
        >
          Privacy Policy
        </a>
      </div>

      {/* Developer Credit */}
      <div className='text-center font-minecraft'>
        Ian Durra Games LLC
      </div>
    </footer>
  );
}

