'use client';
import { Button, Card } from 'pixel-retroui';

import { ButtonAltRetro } from '@/components/ui-retro/button-alt-retro';
import { ButtonRetro } from '@/components/ui-retro/button-retro';
import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const BossSelectBox = () => {
  const { theme, mapping, setMapping, menu, setMenu, level, bossProgression } =
    useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <>
      <CardRetro
        className="text-center"
      >
        <p className="font-minecraft-bold text-lg">{boss.name}</p>
        <p className="text-sm mx-4">
          win: {bossProgression[level]['win']} draw: {bossProgression[level]['draw']} loss: {bossProgression[level]['loss']}
        </p>
        <ButtonRetro
          onClick={() => setMenu('main')}
        >
          Back
        </ButtonRetro>
        <ButtonAltRetro
          onClick={() => setMenu('character_unlock')}
        >
          Start
        </ButtonAltRetro>
      </CardRetro>
    </>
  );
};
