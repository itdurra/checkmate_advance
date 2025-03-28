'use client';
import { useEffect, useState } from 'react';
import { Howl } from 'howler';

import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

export const BackgroundMusic = () => {
  const { menu, level, musicEnabled } = useGame();
  const [sound, setSound] = useState<Howl | null>(null);
  // Define the default song
  let song = '/music/OGG/4. Forward.ogg'; // Default music for most menus
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  if (
    menu === 'main' ||
    menu === 'settings' ||
    menu === 'volume' ||
    menu === 'controls' ||
    menu === 'achievements'
  ) {
    song = '/music/OGG/4. Forward.ogg';
  } else if (menu === 'storymode') {
    song = '/music/OGG/12. Fight or Flight.ogg';
  } else if (menu === 'freeplay') {
    song = '/music/OGG/2. Get Ready!.ogg';
  } else if (menu === 'cutscene') {
    song = '/music/OGG/2. Get Ready!.ogg';
  } else if (menu === 'character_unlock') {
    song = '/music/OGG/6. Flametongue.ogg';
  } else if (menu === 'game') {
    song = boss.song;
  }

  useEffect(() => {
    if (!musicEnabled) {
      // Stop previous music if it's playing
      if (sound) {
        sound.stop();
      }
      return;
    }

    // Stop previous music if it's playing
    if (sound) {
      sound.stop();
    }
    // Create a new Howl instance
    const newSound = new Howl({
      src: [song],
      volume: 0.5,
      loop: true,
      preload: true,
    });
    newSound.play(); // Play the new music
    setSound(newSound); // Update state
    return () => {
      newSound.stop(); // Stop playing when menu changes
    };
  }, [song, musicEnabled]); // Runs every time `menu` changes

  return null;
};
