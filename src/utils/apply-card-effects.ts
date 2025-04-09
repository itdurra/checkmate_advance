import { Chess, PieceSymbol, Square } from 'chess.js';

import { useScoreStore } from '@/stores/useScoreStore';

export function applyCardEffects() {
  const {
    game,
    turns,
    activeCards,
    setPieceValue,
    setEnemyPieceValue,
    setBoardScore,
    getPieceValue,
    getEnemyPieceValue,
  } = useScoreStore.getState();

  function isSquareOccupiedByWhite(square: Square): boolean {
    if (game.get(square) && game.get(square)?.color == 'w') {
      return true;
    }
    return false;
  }

  function isPieceOnSquare(square: Square, piece: PieceSymbol): boolean {
    if (
      (game.get(square) && game.get(square)?.color === 'w',
      game.get(square)?.type === piece)
    ) {
      return true;
    }
    return false;
  }

  //finds adjacent pieces and buffs them
  function shield(piece: string, value: number): void {
    const adjacentSquaresMap = getAdjacentSquares(piece, 'w');
    const adjacentSquares = Array.from(adjacentSquaresMap.values()).flat();
    for (const square of adjacentSquares) {
      const piece = game.get(square as Square);
      if (piece != undefined && piece.color == 'w') {
        setPieceValue(piece.type, getPieceValue(piece.type) + value);
      }
    }
  }

  //increase all white pieces in a given array of squares
  function flank(squares: string[], value: number): void {
    for (const square of squares) {
      const piece = game.get(square as Square);
      if (piece != undefined && piece.color == 'w') {
        setPieceValue(piece.type, getPieceValue(piece.type) + value);
      }
    }
  }

  //finds adjacent enemy pieces and nerfs them
  function enemy(piece: string, value: number): void {
    const adjacentSquaresMap = getAdjacentSquares(piece, 'w');
    const adjacentSquares = Array.from(adjacentSquaresMap.values()).flat();
    for (const square of adjacentSquares) {
      const piece = game.get(square as Square);
      if (piece != undefined && piece.color == 'b') {
        setEnemyPieceValue(piece.type, getEnemyPieceValue(piece.type) - value);
      }
    }
  }

  /** 🔍 Find all squares where a specific piece type & color are located */
  function findPiece(piece: string, color: string): Square[] {
    const positions: Square[] = [];

    for (const row of game.board()) {
      for (const square of row) {
        if (square && square.type === piece && square.color === color) {
          positions.push(square.square as Square);
        }
      }
    }

    return positions;
  }

  /** 🔍 Find a piece and get all adjacent squares */
  function getAdjacentSquares(
    piece: string,
    color: string
  ): Map<Square, Square[]> {
    const positions = findPiece(piece, color); // Locate all pieces of this type
    const adjacentSquares = new Map<Square, Square[]>(); // Store piece position -> adjacent squares
    for (const position of positions) {
      adjacentSquares.set(position, getSurroundingSquares(position));
    }

    return adjacentSquares;
  }

  /** 🔄 Get all adjacent squares of a given square */
  function getSurroundingSquares(square: Square): Square[] {
    const file = square[0]; // 'a' to 'h'
    const rank = parseInt(square[1]); // 1 to 8
    const directions: number[][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1], // Lower left, Down, Lower right
    ];

    const adjacentSquares: Square[] = [];

    for (const [fileOffset, rankOffset] of directions) {
      const newFile = String.fromCharCode(file.charCodeAt(0) + fileOffset); // Move file
      const newRank = rank + rankOffset; // Move rank
      const newSquare = `${newFile}${newRank}` as Square;

      if (isValidSquare(newSquare)) {
        adjacentSquares.push(newSquare);
      }
    }

    return adjacentSquares;
  }

  /** ✅ Check if a square is within board bounds */
  function isValidSquare(square: Square): boolean {
    return /^[a-h][1-8]$/.test(square);
  }

  //helper function for foresight Squares
  function foresightSquare(piece: PieceSymbol, value: number): void {
    // If it's Black's turn, go back one move in the clone
    const gameClone = new Chess();
    gameClone.loadPgn(game.pgn());

    if (gameClone.turn() === 'b') {
      gameClone.undo();
    }
    // Get all possible moves for the specified piece type
    const moves = gameClone.moves({ piece: piece, verbose: true });
    for (const move of moves) {
      // Apply scoring logic to each target square
      setBoardScore([move.to], value);
    }
  }

  /**
   * sets piece and board values at beginning of each turn
   */
  for (const card of activeCards) {
    //if its beginning of game, calc only square vals
    if (turns === 10) {
      if (!(card.type === 'Board')) continue;
    }

    switch (card.effect) {
      case 'center_control':
        if (isSquareOccupiedByWhite('e4')) {
          setBoardScore(['e4'], 1);
        }
        if (isSquareOccupiedByWhite('e5')) {
          setBoardScore(['e5'], 1);
        }
        if (isSquareOccupiedByWhite('d4')) {
          setBoardScore(['d4'], 1);
        }
        if (isSquareOccupiedByWhite('d5')) {
          setBoardScore(['d5'], 1);
        }
        break;

      case 'visionary':
        setBoardScore(['e4'], game.attackers('e4', 'w').length);
        setBoardScore(['e5'], game.attackers('e5', 'w').length);
        setBoardScore(['d4'], game.attackers('d4', 'w').length);
        setBoardScore(['d5'], game.attackers('d5', 'w').length);
        break;

      case 'x_marks_the_spot_1':
        setBoardScore(['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], 1);
        break;

      case 'x_marks_the_spot_2':
        setBoardScore(['a8', 'b7', 'c6', 'd5', 'e4', 'f3', 'g2', 'h1'], 1);
        break;

      case 'enemy_lines':
        setBoardScore(['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'], 2);
        setBoardScore(['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'], 2);
        break;

      case 'railing_1':
        setBoardScore(['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'], 1);
        break;

      case 'railing_2':
        setBoardScore(['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'], 1);
        break;

      case 'ladders_1':
        setBoardScore(['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'], 1);
        break;

      case 'ladders_2':
        setBoardScore(['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'], 1);
        break;

      case 'knight_squares':
        foresightSquare('n' as PieceSymbol, 1);
        break;

      case 'rook_squares':
        foresightSquare('r' as PieceSymbol, 1);
        break;

      case 'bishop_squares':
        foresightSquare('b' as PieceSymbol, 1);
        break;

      case 'queen_squares':
        foresightSquare('q' as PieceSymbol, 1);
        break;

      case 'pawn_squares':
        foresightSquare('p' as PieceSymbol, 1);
        break;

      case 'knights_1':
        if (turns !== 1) {
          setPieceValue('n', getPieceValue('n') + 1);
          console.log(getPieceValue('n') + 1, 'piece value + 1');
          break;
        }

      case 'bishops_1':
        setPieceValue('b', getPieceValue('b') + 1);
        break;

      case 'rooks_1':
        setPieceValue('r', getPieceValue('r') + 1);
        break;

      case 'queens_1':
        setPieceValue('q', getPieceValue('q') + 1);
        break;

      case 'pawns_1':
        setPieceValue('p', getPieceValue('p') + 1);
        break;

      case 'queens_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'q')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'q')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'q')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'q'))
        ) {
          setPieceValue('q', getPieceValue('q') + 2);
        }
        break;

      case 'knights_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'n')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'n')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'n')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'n'))
        ) {
          setPieceValue('n', getPieceValue('n') + 2);
        }
        break;

      case 'bishops_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'b')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'b')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'b')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'b'))
        ) {
          setPieceValue('b', getPieceValue('b') + 2);
        }
        break;

      case 'rooks_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'r')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'r')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'r')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'r'))
        ) {
          setPieceValue('r', getPieceValue('r') + 2);
        }
        break;

      case 'kings_shield':
        shield('k', 1);
        break;

      case 'knights_shield':
        shield('n', 1);
        break;

      case 'bishops_shield':
        shield('b', 1);
        break;

      case 'rooks_shield':
        shield('r', 1);
        break;

      case 'queens_shield':
        shield('q', 1);
        break;

      case 'knights_enemy':
        enemy('n', 1);
        break;

      case 'bishops_enemy':
        enemy('b', 1);
        break;

      case 'rooks_enemy':
        enemy('r', 1);
        break;

      case 'queens_enemy':
        enemy('q', 1);
        break;

      case 'the_flank_1':
        flank(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'], 1);
        break;

      case 'the_flank_2':
        flank(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'], 1);
        break;

      default:
        console.log(`No specific effect logic for ${card.effect}`);
    }
  }

  return null;
}
