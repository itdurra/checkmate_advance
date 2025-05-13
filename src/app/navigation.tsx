'use client';

import { useState } from 'react';

import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';

export function Navigation() {
  const { setMenu } = useGame();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className='h-8 w-full bg-[#ddceb4] px-4 backdrop-blur-md'>
      <div className='relative mx-auto flex w-full max-w-[465px] items-center justify-between px-4 md:max-w-7xl'>
        <Logo
          onClick={() => {
            setMenu('main');
            setMobileOpen(false);
          }}
        />

        {/* Desktop nav */}
        <div className='hidden md:flex'>
          <NavLinks />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className='text-xl font-bold md:hidden'
        >
          ☰
        </button>

        {/* Mobile dropdown nav */}
        {mobileOpen && (
          <div className='absolute left-0 right-0 top-8 z-50 flex flex-col gap-2 border-t border-black bg-[#ddceb4] px-4 py-2 md:hidden'>
            <NavLinks onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <h1
      onClick={onClick}
      className='font-minecraft-bold cursor-pointer text-xl tracking-widest transition hover:text-blue-800 md:text-2xl'
    >
      Checkmate Advance
    </h1>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const { setMenu } = useGame();
  const musicEnabled = useMusicStore((state) => state.musicEnabled);
  const sfxEnabled = useMusicStore((state) => state.sfxEnabled);
  const setMusicEnabled = useMusicStore((state) => state.setMusicEnabled);
  const setSFXEnabled = useMusicStore((state) => state.setSFXEnabled);

  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3'>
      <button
        onClick={() => {
          setMusicEnabled(!musicEnabled);
          onClick?.();
        }}
        className='transition-all hover:text-blue-800'
      >
        Music [{musicEnabled ? 'On' : 'Off'}]
      </button>
      <button
        onClick={() => {
          setSFXEnabled(!sfxEnabled);
          onClick?.();
        }}
        className='transition-all hover:text-blue-800'
      >
        Sound [{sfxEnabled ? 'On' : 'Off'}]
      </button>

      <button
        onClick={() => {
          window.open(
            'https://docs.google.com/forms/d/e/1FAIpQLSd2UyVk5W1cDmfaQTHdwdePJNI62BaiTVbQ67Se_ZZjY6GYLw/viewform?usp=sharing',
            '_blank'
          );
          onClick?.();
        }}
        className='transition-all hover:text-blue-800'
      >
        Feedback🖤
      </button>
    </div>
  );
}
