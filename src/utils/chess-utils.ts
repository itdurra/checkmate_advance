import { Chess } from 'chess.js';

//returns a random move
//returns undefined if no move found or error
export function getRandomMove(game: Chess) {
  const possibleMoves = game.moves();
  if (possibleMoves.length === 0) {
    return;
  } else {
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    return possibleMoves[randomIndex];
  }
}

//makes a move in chess.js Chess.
//returns null if it doesn't work
export function makeMove(game: Chess, move: string) {
  try {
    return game.move(move) || null;
  } catch (error) {
    console.error('Illegal move', error);
    return null;
  }
}

//turning this into a util function as this is used multiple times
export function isSpecialMoveTurn(turnNumber: number, dividend: number) {
  return turnNumber % dividend === dividend - 1;
}

//gets a random piece on the board
//returns undefined if no pieces found
export function getRandomPiece() {
  const pieces = Array.from(
    document.querySelectorAll<HTMLElement>('[data-piece]')
  );
  if (pieces.length === 0) return;
  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  randomPiece.style.opacity = '0';
}

//set opacity to 0
export function hidePiece(piece: HTMLElement) {
  piece.style.opacity = '0';
}

//loops through pieces array sets opacity to 100
export function showAllPieces(pieces: HTMLElement[]) {
  pieces.forEach((piece) => (piece.style.opacity = '1'));
}
