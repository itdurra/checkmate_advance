'use client';
import { useEffect, useState } from 'react';
import { Howl } from 'howler';

import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';
import type { SongTitle } from '@/types/song-title';

export const BackgroundMusic = () => {
  const { menu, level, isShopOpen } = useGame();
  const boss = bosses.bosses.find(b => b.level === level) || bosses.bosses[0];
  const playBackground = useMusicStore((s) => s.playBackground);
  const musicEnabled = useMusicStore((s) => s.musicEnabled);

  const menuToSong: Record<string, SongTitle> = {
    main: 'Forward',
    cutscene: 'Get Ready!',
    storymode: 'Fight or Flight',
    game: 'Conviction',
    settings: 'Forward',
    practice: 'Epilogue'
  };

  useEffect(() => {
    if (!musicEnabled) return;

    let songTitle: SongTitle;

    if (menu === 'game') {
      songTitle = (boss.song as SongTitle) ?? 'Conviction'; // fallback to generic game song
    } else {
      songTitle = menuToSong[menu];
    }

    if (songTitle) {
      playBackground(songTitle);
    }
  }, [menu, musicEnabled]);

  return null;
};
