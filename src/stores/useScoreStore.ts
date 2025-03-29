import { create } from 'zustand';
import { Chess, PieceSymbol, Square } from 'chess.js';
import Engine from '@/components/chessboard/stockfish';
import pieces from '@/config/pieces.json';
import type { Card } from '@/types/card';
import type { ScoreStore } from '@/types/score-store';

//helper to create an empty board
function createEmptyBoard(): Map<string, number> {
  return new Map<string, number>(
    Array.from({ length: 8 }, (_, fileIdx) =>
      Array.from({ length: 8 }, (_, rankIdx) => {
        const square = `${'abcdefgh'[fileIdx]}${rankIdx + 1}`;
        return [square, 0] as [string, number];
      })
    ).flat()
  );
}

// Initialize allCards from the pieces JSON
const allCards: Card[] = pieces.pieces.map((piece) => ({
  id: piece.id,
  image: piece.image,
  effect: piece.effect,
  name: piece.name,
  description: piece.description,
  type: piece.type,
  rarity: piece.rarity,
  cost: piece.cost,
}));

export const useScoreStore = create<ScoreStore>((set, get) => ({
  game: new Chess(),
  engine: new Engine(),
  to: '',
  from: '',
  piece: '',
  gamePosition: new Chess().fen(),
  setGamePosition: (fen) => {
    get().game.load(fen);
    set({ gamePosition: fen });
  },
  resetGame: () => {
    const game = new Chess();
    set({ game, gamePosition: game.fen() });
  },
  pieces: {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0,
    enemyp: 1,
    enemyn: 3,
    enemyb: 3,
    enemyr: 5,
    enemyq: 9,
    enemyk: 0,
  },

  //animationTriggers
  animatePieceTrigger: false,
  animateSquareTrigger: false,
  animateMaterialTrigger: false,
  isPlayerTurn: true,

  bossProgress: Array(9).fill(0), // all bosses locked by default
  buffedPieces: [] as string[],
  setBuffedPieces: (squares: string[]) => set({ buffedPieces: squares }),
  showBuffs: false,
  playerPieceCounts: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
  enemyPieceCounts: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
  board: createEmptyBoard(),
  resetBoard: () => set(() => ({ board: createEmptyBoard() })),
  turns: 10,
  money: 0,
  setMoney: (amount: number) => set({ money: amount }),
  score: 0,
  pieceScore: 0,
  squareScore: 0,
  playerMaterial: 0,
  enemyMaterial: 0,
  multiplier: 1,
  materialMultiplier: 1,
  negativeMultiplier: 1,
  consecutiveChecks: 0,

  //cards
  activeCards: [],
  shopCards: [],
  setShopCards: (cards: Card[]) => set({ shopCards: cards }),
  seenShopCards: new Set(),
  allCards,
  maxCards: 3,
  maxShopCards: 3,

  resetRun: () => {
    set(() => {
      return {
        // Boss progression reset
        bossProgress: Array(9).fill(0),
  
        // Gameplay counters
        turns: 10,
        money: 0,
        score: 0,
        pieceScore: 0,
        squareScore: 0,
        playerMaterial: 0,
        enemyMaterial: 0,
        multiplier: 1,
        materialMultiplier: 1,
        negativeMultiplier: 1,
        consecutiveChecks: 0,
  
        // Board and pieces
        board: createEmptyBoard(),
        buffedPieces: [],
        playerPieceCounts: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
        enemyPieceCounts: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
  
        // Cards
        activeCards: [],
        shopCards: [],
        seenShopCards: new Set(),
  
        // Limits
        maxCards: 3,
        maxShopCards: 3,
      } as Partial<ScoreStore>;
    });
  },
  

  gameOver: () => {
    //update boss state here?
    get().refreshShop(); //refresh the shop with latest unlock data

    set((state) => {
      const turns = 10;
      const score = 0;
      const pieceScore = 0;
      const squareScore = 0;
      const playerMaterial = 0;
      const enemyMaterial = 0;
      const multiplier = 1;
      const materialMultiplier = 1;
      const negativeMultiplier = 1;
      const consecutiveChecks = 0;

      return {
        turns: turns,
        score: score,
        pieceScore: pieceScore,
        squareScore: squareScore,
        playerMaterial: playerMaterial,
        enemyMaterial: enemyMaterial,
        multiplier: multiplier,
        materialMultiplier: materialMultiplier,
        negativeMultiplier: negativeMultiplier,
        consecutiveChecks: consecutiveChecks,
      };
    });
  },

  newGame: () => {
    set((state) => {
      const turns = 10;
      const score = 0;
      const pieceScore = 0;
      const squareScore = 0;
      const playerMaterial = 0;
      const enemyMaterial = 0;
      const multiplier = 1;
      const materialMultiplier = 1;
      const negativeMultiplier = 1;
      const consecutiveChecks = 0;

      return {
        turns: turns,
        score: score,
        pieceScore: pieceScore,
        squareScore: squareScore,
        playerMaterial: playerMaterial,
        enemyMaterial: enemyMaterial,
        multiplier: multiplier,
        materialMultiplier: materialMultiplier,
        negativeMultiplier: negativeMultiplier,
        consecutiveChecks: consecutiveChecks,
      };
    });
  },

  updateScore: (targetSquare: string, piece: string) => {
    set((state) => {
      // Retrieve the score for the given square from the board Map (default to 0)
      const squareValue = state.board.get(targetSquare) ?? -1;
      // Retrieve the score for the given piece (ensure case-insensitive lookup)
      const pieceValue = state.pieces[piece[1].toLowerCase()] ?? -1;
      // Update the squareScore and pieceScore by adding the retrieved values
      return {
        squareScore: squareValue,
        pieceScore: pieceValue,
      };
    });
  },

  updateSquareScore: (targetSquare: string) => {
    set((state) => {
      // Retrieve the score for the given square from the board Map (default to 0)
      const squareValue = state.board.get(targetSquare) ?? -1;
      // Update the squareScore and pieceScore by adding the retrieved values
      return {
        squareScore: squareValue,
      };
    });
  },

  updatePieceScore: (piece: string) => {
    set((state) => {
      // Retrieve the score for the given piece (ensure case-insensitive lookup)
      const pieceValue = state.pieces[piece[1].toLowerCase()] ?? -1;
      // Update the squareScore and pieceScore by adding the retrieved values
      return {
        pieceScore: pieceValue,
      };
    });
  },

  getPieceValue: (piece) => {
    const pieces = get().pieces;
    return pieces[piece.toLowerCase()] ?? -1;
  },

  getEnemyPieceValue: (piece) => {
    const pieces = get().pieces;
    return pieces[`enemy${piece.toLowerCase()}`] ?? -1;
  },

  getSquareScore: (square) => {
    return get().board.get(square) ?? 0;
  },

  setPieceValue: (piece, value) => {
    const key = piece.toLowerCase();
    if (!['p', 'n', 'b', 'r', 'q', 'k'].includes(key)) return false;
    set((state) => ({
      pieces: { ...state.pieces, [key]: value },
    }));
    return true;
  },

  setEnemyPieceValue: (piece, value) => {
    const key = piece.toLowerCase();
    if (!['p', 'n', 'b', 'r', 'q', 'k'].includes(key)) return false;
    set((state) => ({
      pieces: { ...state.pieces, [`enemy${key}`]: value },
    }));
    return true;
  },

  setBoardScore: (squares, score) =>
    set((state) => {
      const newBoard = new Map(state.board);
      squares.forEach((square) => {
        const currentScore = newBoard.get(square) || 0;
        newBoard.set(square, currentScore + score);
      });
      return { board: newBoard };
    }),

  resetPieces: () =>
    set(() => ({
      pieces: {
        p: 1,
        n: 3,
        b: 3,
        r: 5,
        q: 9,
        k: 0,
        enemyp: 1,
        enemyn: 3,
        enemyb: 3,
        enemyr: 5,
        enemyq: 9,
        enemyk: 0,
      },
    })),

  getScore: () => {
    const {
      pieceScore,
      squareScore,
      playerMaterial,
      enemyMaterial,
      multiplier,
      negativeMultiplier,
      materialMultiplier,
      getMaterialAdvantage,
    } = get();

    return (
      multiplier *
      (negativeMultiplier * (pieceScore + squareScore) * getMaterialAdvantage())
    );
  },

  setMaterialAdvantage: () => {
    const { game, pieces } = get();
    if (!game) return;

    let score = 0;
    let oppScore = 0;
    const board = game.board();
    const playerColor = 'w';

    const playerCounts: Record<string, number> = {
      p: 0,
      n: 0,
      b: 0,
      r: 0,
      q: 0,
      k: 0,
    };
    const enemyCounts: Record<string, number> = {
      p: 0,
      n: 0,
      b: 0,
      r: 0,
      q: 0,
      k: 0,
    };

    const buffedSquares: string[] = [];

    const defaultValues: Record<string, number> = {
      p: 1,
      n: 3,
      b: 3,
      r: 5,
      q: 9,
      k: 0,
    };

    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const square = `${files[f]}${ranks[r]}`;
        const piece = board[r][f];
        if (!piece) continue;

        const { color, type } = piece;
        const key = color === playerColor ? type : `enemy${type}`;
        const val = pieces[key] ?? 0;
        const base = defaultValues[type];

        if (color === playerColor) {
          score += val;
          playerCounts[type] += 1;
          if (val > base) buffedSquares.push(square);
        } else {
          oppScore += val;
          enemyCounts[type] += 1;
          // Optional: track enemy buffs too
          // if (val > base) buffedSquares.push(square);
        }
      }
    }

    set(() => ({
      playerMaterial: score,
      enemyMaterial: oppScore,
      playerPieceCounts: playerCounts,
      enemyPieceCounts: enemyCounts,
      buffedPieces: buffedSquares,
    }));
  },

  getMaterialAdvantage: () => {
    const { enemyMaterial, playerMaterial, materialMultiplier } = get();
    const materialAdvantage = materialMultiplier * (playerMaterial - enemyMaterial);
    if(materialAdvantage <= 0) {
      return .5;
    } else {
      return materialAdvantage;
    }
  },

  /** 🔹 Initialize the store with cards */
  initializeCards: (allCards, initialActiveCards = [], initialShopCards = []) =>
    set(() => ({
      allCards,
      activeCards: initialActiveCards.slice(0, 9),
      shopCards: initialShopCards.slice(0, 4),
      seenShopCards: new Set(initialShopCards.map((card) => card.id)),
    })),

  /** 🔹 Add a card to the player’s hand */
  addCard: (cardId) => {
    const { activeCards, allCards, maxCards } = get();
    if (activeCards.length >= maxCards) {
      console.warn('Max active cards reached!');
      return false;
    }

    const card = allCards.find((c) => c.id === cardId);
    if (!card) {
      console.warn('Card not found in allCards!');
      return false;
    }

    set((state) => ({ activeCards: [...state.activeCards, card] }));
    return true;
  },

  /** 🔹 Remove a card from player’s hand */
  removeCard: (cardId) => {
    const { activeCards } = get();
    if (!activeCards.some((card) => card.id === cardId)) {
      console.warn('Card not found!');
      return false;
    }

    set((state) => ({
      activeCards: state.activeCards.filter((card) => card.id !== cardId),
    }));
    return true;
  },

  /** 🔹 Clear all active cards */
  clearActiveCards: () => set(() => ({ activeCards: [] })),

  /** 🔹 Add a new card to the shop (without duplicates) */
  addCardToShop: () => {
    const { shopCards, activeCards, seenShopCards, allCards, maxShopCards } =
      get();
    if (shopCards.length >= maxShopCards) {
      console.warn('Shop is full!');
      return false;
    }

    const availableCards = allCards.filter(
      (card) =>
        !activeCards.some((c) => c.id === card.id) &&
        !shopCards.some((c) => c.id === card.id) &&
        !seenShopCards.has(card.id)
    );

    if (availableCards.length === 0) {
      console.warn('No more unique cards available for the shop.');
      return false;
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    set((state) => ({
      shopCards: [...state.shopCards, selectedCard],
      seenShopCards: new Set([...state.seenShopCards, selectedCard.id]),
    }));

    return true;
  },

  /** 🔹 Remove a card from the shop */
  removeCardFromShop: (cardId) => {
    const { shopCards } = get();
    if (!shopCards.some((card) => card.id === cardId)) {
      console.warn('Card not found in shop!');
      return false;
    }

    set((state) => ({
      shopCards: state.shopCards.filter((card) => card.id !== cardId),
    }));

    return true;
  },

  refreshShop: () => {
    const {
      allCards,
      activeCards,
      seenShopCards,
      bossProgress,
    } = get();
  
    const usedIds = new Set([...activeCards.map((c) => c.id)]);
  
    // Helper to filter by rarity
    const availableCardsByRarity = (rarity: string) =>
      allCards.filter(
        (card) =>
          card.rarity === rarity &&
          !usedIds.has(card.id)
      );
  
    // Determine unlocks
    const hasUncommon = bossProgress[1] === 2; // level 2 completed
    const hasRare = bossProgress[5] === 2;     // level 6 completed
    const hasLegendary = bossProgress[7] === 2; // level 8 completed
  
    // Get pools per rarity
    const commonPool = availableCardsByRarity('Common');
    const uncommonPool = hasUncommon ? availableCardsByRarity('Uncommon') : [];
    const rarePool = hasRare ? availableCardsByRarity('Rare') : [];
    const legendaryPool = hasLegendary ? availableCardsByRarity('Legendary') : [];
  
    // Shuffle helpers
    const getRandomCard = (pool: Card[]) =>
      pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
  
    // Select one card per rarity
    const selectedCards: Card[] = [];
  
    const common = getRandomCard(commonPool);
    if (common) selectedCards.push(common);
  
    const uncommon = getRandomCard(uncommonPool);
    if (uncommon) selectedCards.push(uncommon);
  
    const rare = getRandomCard(rarePool);
    if (rare) selectedCards.push(rare);
  
    const legendary = getRandomCard(legendaryPool);
    if (legendary) selectedCards.push(legendary);
  
    // Trim to 3 max if somehow over (e.g. common + rare + legendary but no uncommon)
    const finalShop = selectedCards.slice(0, 3);
  
    set((state) => ({
      shopCards: finalShop,
      seenShopCards: new Set([
        ...state.seenShopCards,
        ...finalShop.map((c) => c.id),
      ]),
    }));
  },
  

  /** 🔹 Clear the shop */
  clearShop: () => set(() => ({ shopCards: [] })),


  //boss progression methods

  setBossResult: (index, result) =>
    set((state) => {
      const newProgress = [...state.bossProgress];
      newProgress[index] = result;
      return { bossProgress: newProgress };
    }),
  
  resetBossProgress: () => set({ bossProgress: Array(9).fill(0) }),
  
  getNextThreeBosses: () => {
    const validBossLevels = [1, 2, 3, 5, 6, 7, 8, 9, 10]; // length = 9
    const progress = get().bossProgress;

    for (let phase = 0; phase < 3; phase++) {
      const group = progress.slice(phase * 3, phase * 3 + 3);
      if (group.includes(0)) {
        // Return the LEVELS, not the indexes!
        return [validBossLevels[phase * 3], validBossLevels[phase * 3 + 1], validBossLevels[phase * 3 + 2]];
      }
    }
  
    // Fallback: final group
    return [8, 9, 10];
  },
  
  isRunComplete: () => {
    const progress = get().bossProgress;
  
    // Must beat 3rd boss in each group (index 2, 5, 8)
    const mustBeat = [2, 5, 8];
    return mustBeat.every((i) => progress[i] === 2);
  },
  
}));
