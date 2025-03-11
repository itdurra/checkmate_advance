import { useState } from 'react';
import Image from 'next/image';
import { Button, Card } from 'pixel-retroui';

import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { BossSelectBox } from '../boss-select-box';
import { EnemyPicture } from '../enemypicture';
import { bigPortrait, smallPortrait } from '../portraits';

export const FreePlay = () => {
  const { theme, mapping, setMapping, menu, setMenu, setLevel, level } =
    useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  return (
    <>
      <div>
        <h1>CHESS AI</h1> <h1>BOSS SELECT</h1>
      </div>
      <div className='grid grid-cols-3'>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          {bigPortrait('/gameboyhappy.png')}
          <p>Player 1</p>
        </Card>
        <BossSelectBox></BossSelectBox>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          {bigPortrait(boss.image)}
          <p>{boss.name}</p>
        </Card>
      </div>
      <div className='grid grid-cols-4'>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(1)}>
            {smallPortrait(
              bosses.bosses[0].image,
              setLevel,
              bosses.bosses[0].level
            )}
            {bosses.bosses[0].name}
          </div>
        </Card>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(2)}>
            {smallPortrait(
              bosses.bosses[1].image,
              setLevel,
              bosses.bosses[1].level
            )}
            {bosses.bosses[1].name}
          </div>
        </Card>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(3)}>
            {smallPortrait(
              bosses.bosses[2].image,
              setLevel,
              bosses.bosses[2].level
            )}
            {bosses.bosses[2].name}
          </div>
        </Card>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(4)}>
            {smallPortrait(
              bosses.bosses[3].image,
              setLevel,
              bosses.bosses[3].level
            )}
            {bosses.bosses[3].name}
          </div>
        </Card>
      </div>
      <div className='grid grid-cols-4'>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(5)}>
            {smallPortrait(
              bosses.bosses[4].image,
              setLevel,
              bosses.bosses[4].level
            )}
            {bosses.bosses[4].name}
          </div>
        </Card>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(6)}>
            {smallPortrait(
              bosses.bosses[5].image,
              setLevel,
              bosses.bosses[5].level
            )}
            {bosses.bosses[5].name}
          </div>
        </Card>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(7)}>
            {smallPortrait(
              bosses.bosses[6].image,
              setLevel,
              bosses.bosses[6].level
            )}
            {bosses.bosses[6].name}
          </div>
        </Card>
        <Card
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadowColor={color.shadowColor}
        >
          <div onClick={() => setLevel(8)}>
            {smallPortrait(
              bosses.bosses[7].image,
              setLevel,
              bosses.bosses[7].level
            )}
            {bosses.bosses[7].name}
          </div>
        </Card>
      </div>
    </>
  );
};
