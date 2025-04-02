import { Chess } from 'chess.js';

import Engine from '@/components/chessboard/stockfish';
import type { BossState } from '@/types/boss-state';
import type { Card } from '@/types/card';

export type ScoreStore = {
    game: Chess;
    to: string;
    from: string;
    piece: string;
    gamePosition: string;
    engine: Engine;
    setGamePosition: (fen: string) => void;
    setGamePositionPGN: (fen: string) => void;
    resetGame: () => void;
    pieces: Record<string, number>;
    buffedPieces: string[];
    board: Map<string, number>;
    turns: number;
    money: number;
    moneyMultiplier: number;
    setMoney: (amount: number) => void;
    score: number;
    pieceScore: number;
    squareScore: number;
    playerMaterial: number;
    enemyMaterial: number;
    playerPieceCounts: Record<string, number>;
    enemyPieceCounts: Record<string, number>;
    multiplier: number;
    materialMultiplier: number;
    negativeMultiplier: number;
  
    showBuffs: boolean;
  
    consecutiveChecks: number;
  
    activeCards: Card[]; // Player’s active hand
    shopCards: Card[]; // Cards currently in the shop
    setShopCards: (cards: Card[]) => void;
    seenShopCards: Set<string>; // Track seen shop cards
    allCards: Card[]; // Full card pool
    maxCards: number;
    maxShopCards: number;
  
    //animation:
    animatePieceTrigger: boolean,
    animateSquareTrigger: boolean,
    animateMaterialTrigger: boolean,
    isPlayerTurn: boolean,
    isGameOver: boolean,
  
    //boss progression
    bossProgress: BossState[]; // length 9
    setBossResult: (index: number, result: BossState) => void;
    resetBossProgress: () => void;
    getNextThreeBosses: () => number[]; // indexes to display
  
  
    //initialize: (game: Chess) => void;
    getScore: () => number;
    //getPlayerMaterial: () => number;
    //getEnemyMaterial: () => number;
    getMaterialAdvantage: () => number;
    setMaterialAdvantage: () => void;
  
    setPieceValue: (piece: string, value: number) => void;
    setEnemyPieceValue: (piece: string, value: number) => void;
  
    getPieceValue: (piece: string) => number;
    getEnemyPieceValue: (piece: string) => number;
    getSquareScore: (square: string) => number;
    updateScore: (destinationSquare: string, piece: string) => void;
    updateSquareScore: (destinationSquare: string) => void;
    updatePieceScore: (piece: string) => void;
    setBoardScore: (squares: string[], score: number) => void;
    resetBoard: () => void;
    resetPieces: () => void;
  
    newGame: () => void;
    gameOver: () => void;
    resetRun: () => void;
  
    // Actions
    initializeCards: (
      allCards: Card[],
      initialActiveCards?: Card[],
      initialShopCards?: Card[]
    ) => void;
    addCard: (cardId: string) => boolean;
    removeCard: (cardId: string) => boolean;
    clearActiveCards: () => void;
    addCardToShop: () => boolean;
    removeCardFromShop: (cardId: string) => boolean;
    clearShop: () => void;
    refreshShop: () => void;
  };