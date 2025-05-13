import { Howl } from 'howler';

import type { SongTitle } from './song-title';

export type MusicStore = {
  background: Howl | null;
  currentSongUrl: SongTitle | null;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  setSFXEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  playBackground: (title: SongTitle) => void;
  stopBackground: () => void;
  playSting: (title: SongTitle) => void;
  playSFX: (title: SongTitle) => void;
};