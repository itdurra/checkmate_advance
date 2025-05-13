// stores/useMusicStore.ts
import { Howl, Howler } from 'howler';
import { create } from 'zustand';

import { MusicStore } from '@/types/music-store';
import { songMap } from '@/utils/song-map';

export const useMusicStore = create<MusicStore>((set, get) => ({
  background: null,
  currentSongUrl: null,
  musicEnabled: false,
  sfxEnabled: true,

  setMusicEnabled: (enabled) => {
    const { background } = get();
    background?.volume(enabled ? 0.3 : 0);
    set({ musicEnabled: enabled });
  },

  setSFXEnabled: (enabled) => {
    set({ sfxEnabled: enabled });
  },

  playBackground: (title) => {
    const { background, musicEnabled } = get();

    if (!musicEnabled) return;

    if (background) {
      background.stop();
    }

    const bg = new Howl({
      src: [songMap[title]],
      loop: true,
      volume: 0.3,
      preload: true,
    });

    bg.play();
    set({ background: bg, currentSongUrl: title });
  },

  stopBackground: () => {
    const { background } = get();
    background?.stop();
    set({ background: null, currentSongUrl: null });
  },

  playSting: (title) => {
    const { background, musicEnabled, currentSongUrl, playBackground } = get();

    if (!musicEnabled) return;

    // Fade out or pause background
    background?.pause();

    let volume = 0.3;
    if (title === 'Fail Stinger 1') {
      volume = 0.2;
    }

    const sting = new Howl({
      src: [songMap[title]],
      volume: volume,
      onend: () => {
        if (currentSongUrl) {
          playBackground(currentSongUrl);
        }
        //victory stinger 1 is used for game win, stinger 2 not used yet
        if (title === 'Victory Stinger 1' || title === 'Victory Stinger 2') {
          playBackground('Amusement');
        }
        //game over for a game. Fail stinger 1 is used for not enough popups
        if (title === 'Fail Stinger 2') {
          playBackground('Game Over');
        }
      },
    });

    sting.play();
  },

  playSFX: (title) => {
    const { sfxEnabled } = get();

    if (!sfxEnabled) return;

    //mix up clicking sounds to avoid fatigue
    let titleConditional = title;
    if (titleConditional === 'click5') {
      const randomChoice = Math.floor(Math.random() * 2) + 1; // 1, 2
      if (randomChoice === 1) {
        titleConditional = 'click4';
      } else {
        titleConditional = 'click5';
      }
    }

    const sfx = new Howl({
      src: [songMap[titleConditional]],
      volume: 1.0,
    });

    sfx.play();
  },
}));
