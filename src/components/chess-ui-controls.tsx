'use client';
import React, { useEffect,useRef, useState } from 'react';
import Image from 'next/image';
import { Chess } from 'chess.js';
import { Button,Popup } from 'pixel-retroui';
import { CiFlag1 } from "react-icons/ci";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { FlagPopup } from './flagPopup';

export const ChessUIControls = () => {
  const {
    engine,
    level,
    game,
    setGamePosition,
    setEnemyMessage,
    setPlayerMessage,
    updateBossProgress,
  } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const { theme, mapping, setMapping, menu, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const moveHistory = game.history({ verbose: true });
  const [isFlagPopupOpen, setIsFlagPopupOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const openFlagPopup = () => setIsFlagPopupOpen(true);
  const closeFlagPopup = () => setIsFlagPopupOpen(false);

  // Scroll to the current move whenever scrollIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      const moveElement = scrollRef.current.children[
        scrollIndex
      ] as HTMLElement;
      if (moveElement) {
        moveElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }

    handlePosition();
  }, [scrollIndex]);

  // Automatically scroll to the latest move when moveHistory changes

  useEffect(() => {
    if (moveHistory.length > 0) {
      setScrollIndex(moveHistory.length - 1);
    }
  }, [game.fen()]);

  const scrollMoves = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setScrollIndex((prev) => Math.max(0, prev - 1));
    } else {
      setScrollIndex((prev) => Math.min(moveHistory.length - 1, prev + 1));
    }
    handlePosition();
  };

  const handlePosition = () => {
    // Go to the current move's position on the board
    const move = moveHistory[scrollIndex];
    if (move) {
      // Create a new game instance and replay the moves up to the selected move
      const newGame = new Chess(); // Assuming you're using the `chess.js` library
      console.log(scrollIndex);
      console.log(move);
      console.log(moveHistory.length);
      for (let i = 0; i <= scrollIndex; i++) {
        newGame.move(moveHistory[i].san);
      }
      // Update the board position
      setGamePosition(newGame.fen());
    }
  };

  const handleMoveClick = (index: number) => {
    setScrollIndex(index);
  };

  return (
    <div className='flex w-full flex-row gap-1 text-xs'>
      <div
        ref={scrollRef}
        className='scrollbar-hidden w-2/3 flex-grow overflow-x-auto whitespace-nowrap bg-gray-400 text-right text-white'
      >
        {moveHistory.map((move, index) => (
          <span
            key={index}
            className={`cursor-pointer px-1 ${
              index === scrollIndex ? 'bg-blue-500' : ''
            }`}
            onClick={() => handleMoveClick(index)}
          >
            {index % 2 === 0 ? `${index / 2 + 1}.` : ''} {move.san}
          </span>
        ))}
      </div>
      <div className='flex w-1/3 flex-row justify-between'>
        <button onClick={() => scrollMoves('left')}><IoIosArrowDropleft size={15}/></button>
        <button onClick={openFlagPopup}><CiFlag1 size={20} /></button>
        <button onClick={() => scrollMoves('right')}><IoIosArrowDropright size={15}/></button>
      </div>
      {
        <FlagPopup
          isOpen={isFlagPopupOpen}
          closeFlagPopup={closeFlagPopup}
        ></FlagPopup>
      }
    </div>
  );
};
