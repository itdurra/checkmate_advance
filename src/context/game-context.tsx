'use client';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Chess } from 'chess.js';

import Engine from '@/components/chessboard/stockfish';

// Define a type for campaign progress
interface BossProgress {
  win: number;
  loss: number;
  draw: number;
}

// Define the types for the context
interface GameContextType {
  enemyMessage: string;
  playerMessage: string;
  multiplier: number;
  level: number;
  mapping: string[];
  theme: number;
  gameAudio: number;
  sfxAudio: number;
  menu:
    | 'main'
    | 'settings'
    | 'volume'
    | 'controls'
    | 'storymode'
    | 'freeplay'
    | 'achievements'
    | 'cutscene'
    | 'character_unlock'
    | 'game';
  isFreePlay: boolean;
  bossProgression: BossProgress[];
  game: Chess;
  gamePosition: string;
  engine: Engine;
  diverted: boolean;
  setEnemyMessage: (message: string) => void;
  setPlayerMessage: (message: string) => void;
  setMultiplier: (multipler: number | ((prev: number) => number)) => void;
  setLevel: (multipler: number) => void;
  setMapping: (mapping: string[]) => void;
  setTheme: (theme: number) => void;
  setGameAudio: (gameAudio: number) => void;
  setSfxAudio: (sfxAudio: number) => void;
  setMenu: (
    menu:
      | 'main'
      | 'settings'
      | 'volume'
      | 'controls'
      | 'storymode'
      | 'freeplay'
      | 'achievements'
      | 'cutscene'
      | 'character_unlock'
      | 'game'
  ) => void;
  setIsFreePlay: (isFreePlay: boolean) => void;
  updateBossProgress: (
    bossIndex: number,
    result: 'win' | 'loss' | 'draw'
  ) => void;
  setGamePosition: (fen: string) => void;
  setDiverted: (diverted: boolean) => void;
}

// Create the context with a default value
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [enemyMessage, setEnemyMessage] = useState<string>('');
  const [playerMessage, setPlayerMessage] = useState<string>('');
  const [multiplier, setMultiplier] = useState<number>(1);
  const [level, setLevel] = useState<number>(1);
  const [mapping, setMapping] = useState<string[]>([
    'SELECT',
    'B',
    'START',
    'A',
    'A',
    'B',
    'START',
    'SELECT',
  ]);
  const [theme, setTheme] = useState<number>(0);
  const [gameAudio, setGameAudio] = useState<number>(50);
  const [sfxAudio, setSfxAudio] = useState<number>(50);
  const [menu, setMenu] = useState<
    | 'main'
    | 'settings'
    | 'volume'
    | 'controls'
    | 'storymode'
    | 'freeplay'
    | 'achievements'
    | 'cutscene'
    | 'character_unlock'
    | 'game'
  >('main');
  const [isFreePlay, setIsFreePlay] = useState<boolean>(true);
  // Initialize bossProgression with 8 bosses
  const [bossProgression, setBossProgression] = useState<BossProgress[]>(
    Array(9).fill({ win: 0, loss: 0, draw: 0 })
  );
  const game = useMemo(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(game.fen());

  // Initialize the engine
  const engine = useMemo(() => new Engine(), []);
  const [diverted, setDiverted] = useState(false);

  // Function to update boss progress
  const updateBossProgress = (
    bossIndex: number,
    result: 'win' | 'loss' | 'draw'
  ) => {
    setBossProgression((prevProgress) =>
      prevProgress.map((boss, index) =>
        index === bossIndex ? { ...boss, [result]: boss[result] + 1 } : boss
      )
    );
  };

  return (
    <GameContext.Provider
      value={{
        enemyMessage,
        playerMessage,
        multiplier,
        level,
        mapping,
        theme,
        gameAudio,
        sfxAudio,
        menu,
        isFreePlay,
        bossProgression,
        game,
        gamePosition,
        engine,
        diverted,
        setEnemyMessage,
        setPlayerMessage,
        setMultiplier,
        setLevel,
        setMapping,
        setTheme,
        setGameAudio,
        setSfxAudio,
        setMenu,
        setIsFreePlay,
        updateBossProgress,
        setGamePosition,
        setDiverted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using the context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
