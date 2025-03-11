'use client';
import { useState } from 'react';
import { Button, Card } from 'pixel-retroui';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import achievementsCalculator from '@treasure-chess/chess-achievements';


export const GameAchievements = () => {
  const { game, theme, mapping, setMapping, menu, setMenu } = useGame();
  const color = themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  
  const pgn = game.pgn();
  if (!pgn || pgn.trim() === "") {
    return <p>Waiting for moves...</p>; // Handle empty PGN safely
  }

  const {
    opening,
    score,
    achievements,
    allAchievements
  } = achievementsCalculator(game.pgn(), 'w');


  return (
    <>
      <div className='title'>
        <h1>CHESS AI</h1> <h1>BOSS SELECT</h1>
        <p>{opening}</p>
        <p>{score}</p>
        <p>{achievements}</p>
        <p>{allAchievements}</p>
      </div>
      <div className='title'></div>
      <div>
        <h2>Volume Settings</h2>
        <Button
          bg={color.bg}
          textColor={color.textColor}
          borderColor={color.borderColor}
          shadow={color.shadowColor}
          onClick={() => setMenu('main')}
        >
          Back
        </Button>
      </div>
    </>
  );
};
