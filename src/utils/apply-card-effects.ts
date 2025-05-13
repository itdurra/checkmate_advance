import { Chess, PieceSymbol, Square } from 'chess.js';

import { useScoreStore } from '@/stores/useScoreStore';
import { BASE_VALUES } from '@/utils/base-values';

export function applyCardEffects() {
  const {
    game,
    turns,
    activeCards,
    score,
    playerPieceCounts,
    bonus,
    money,
    multiplier,
    enemyMaterial,
    pieces,
    setPieceValue,
    setEnemyPieceValue,
    setBoardScore,
    getPieceValue,
    getEnemyPieceValue,
    setActiveCards,
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

  function pair(sourcePiece: string, targetPiece: string, value: number): void {
    const adjacentSquaresMap = getAdjacentSquares(sourcePiece, 'w');
    const adjacentSquares = Array.from(adjacentSquaresMap.values()).flat();
    for (const square of adjacentSquares) {
      const piece = game.get(square as Square);
      if (
        piece != undefined &&
        piece.color == 'w' &&
        piece.type == targetPiece
      ) {
        setPieceValue(sourcePiece, getPieceValue(sourcePiece) + value);
        setPieceValue(targetPiece, getPieceValue(targetPiece) + value);
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

  function shadow(piece: PieceSymbol, value: number) {
    if (isPieceOnOpponentHalf(piece, 'w')) {
      setPieceValue(piece, getPieceValue(piece) + value);
    }
  }

  //takes a piece and color (w/b). Returns true if the piece is on opponents half
  function isPieceOnOpponentHalf(piece: PieceSymbol, color: string): boolean {
    const board = game.board();

    const rankRange = color === 'w' ? [0, 1, 2, 3] : [4, 5, 6, 7]; // Ranks 8–5 for white, 4–1 for black

    for (const rank of rankRange) {
      for (let file = 0; file < 8; file++) {
        const square = board[rank][file];
        if (square && square.type == piece && square.color == color) {
          return true;
        }
      }
    }

    return false;
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
  /*
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
  */

  /** Get all surrounding squares of a given square, expandable by distance */
  function getSurroundingSquares(square: Square, distance = 1): Square[] {
    //check for parry card, which expands shield range
    for (const card of activeCards) {
      if (card.effect === 'parry') {
        distance = distance + card.value;
      }
    }
    const file = square[0]; // 'a' to 'h'
    const rank = parseInt(square[1]); // 1 to 8
    const adjacentSquares: Square[] = [];

    for (let fileOffset = -distance; fileOffset <= distance; fileOffset++) {
      for (let rankOffset = -distance; rankOffset <= distance; rankOffset++) {
        if (fileOffset === 0 && rankOffset === 0) continue; // Skip the center square (itself)
        const newFile = String.fromCharCode(file.charCodeAt(0) + fileOffset);
        const newRank = rank + rankOffset;
        const newSquare = `${newFile}${newRank}` as Square;
        if (isValidSquare(newSquare)) {
          adjacentSquares.push(newSquare);
        }
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
   * Calculates bonus score for number of white pieces on a specific file.
   *
   * @param file - the file letter ('a' through 'h')
   * @param valuePerPiece - the bonus value per piece on that file
   * @returns total bonus score
   */
  function getBonusFromFile(file: string, valuePerPiece: number): number {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const fileIndex = files.indexOf(file.toLowerCase());
    if (fileIndex === -1) return 0;

    const board = game.board();
    let count = 0;

    for (let rank = 0; rank < 8; rank++) {
      const square = board[rank][fileIndex];
      if (square && isSquareOccupiedByWhite(square.square as Square)) count++;
    }

    return count * valuePerPiece;
  }

  /**
   * Calculates bonus score for number of pieces on a specific rank.
   *
   * @param rankNumber - the rank number (1 through 8)
   * @param valuePerPiece - the bonus value per piece on that rank
   * @returns total bonus score
   */
  function getBonusFromRank(rankNumber: number, valuePerPiece: number): number {
    if (rankNumber < 1 || rankNumber > 8) return 0;

    const board = game.board();
    const rankIndex = 8 - rankNumber;
    let count = 0;

    for (let file = 0; file < 8; file++) {
      const square = board[rankIndex][file];
      if (square && isSquareOccupiedByWhite(square.square as Square)) count++;
    }

    return count * valuePerPiece;
  }

  /** triggers on first turn and buffs matching cards
   *
   * @param type: - value from card.type (Nerf, Buff, Board, Card etc.)
   * @param value: - number to buff cards by
   */
  function buff(type: string, value: number) {
    if (turns === 10) {
      for (const target_card of activeCards) {
        if (target_card.type === type) {
          target_card.value = target_card.value + value;
          target_card.upgrade = target_card.upgrade + 1;
        }
      }
    }
  }

/**
 * Checks if first and second edition of cards are present and enhances them
 *
 * @param value - Number to buff matching card effects by
 */
function enhance(value: number) {
  console.log(value, turns);
  if (turns !== 10) return;

  const effects = activeCards.map((card) => card.effect);

  // Define the card pairs to check
  const cardPairs = [
    { first: 'x_marks_the_spot_1', second: 'x_marks_the_spot_2' },
    { first: 'railing_1', second: 'railing_2' },
    { first: 'ladders_1', second: 'ladders_2' },
    { first: 'bonus_ladder_1', second: 'bonus_ladder_2' },
    { first: 'bonus_railing_1', second: 'bonus_railing_2' },
  ];

  let didEnhance = false;

  const updatedCards = activeCards.map((card) => {
    for (const pair of cardPairs) {
      if (
        effects.includes(pair.first) &&
        effects.includes(pair.second) &&
        (card.effect === pair.first || card.effect === pair.second)
      ) {
        didEnhance = true;
        return {
          ...card,
          value: (card.value ?? 0) + value,
          upgrade: (card.upgrade ?? 0) + 1,
        };
      }
    }
    return card;
  });

  if (didEnhance) {
    setActiveCards(updatedCards); // replace with your actual state update function
    console.log('engabce');
  }
}



  /**
   * Applies the Vampire effect.
   * For every enemy piece nerfed below its base value,
   * increase the player's corresponding piece value by `amount`.
   *
   * @param amount - How much to buff player piece per enemy nerf
   */
  function vampire(value: number) {
    for (const key of Object.keys(BASE_VALUES)) {
      const enemyKey = `enemy${key}`;
      const enemyPieceValue = pieces[enemyKey] ?? BASE_VALUES[key];
      const baseValue = BASE_VALUES[key];

      // If the enemy piece is nerfed below its base value
      if (enemyPieceValue < baseValue) {
        const diff = baseValue - enemyPieceValue;
        setPieceValue(key, getPieceValue(key) + value * diff);
      }
    }
  }

  /**
   * Applies the Intimidation effect.
   * For every player piece buffed above its base value,
   * decrease the player's corresponding piece value by `amount`.
   *
   * @param amount - How much to nerf enemy piece per player buff
   */
  function intimidation(value: number) {
    for (const key of Object.keys(BASE_VALUES)) {
      const enemyKey = `enemy${key}`;
      const playerPieceValue = pieces[key];
      const baseValue = BASE_VALUES[key];

      // If the enemy piece is nerfed below its base value
      if (playerPieceValue > baseValue) {
        const diff = playerPieceValue - baseValue;
        setEnemyPieceValue(key, getEnemyPieceValue(key) - value * diff);
      }
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

    //if card is disabled skip it;
    if (!card.active){
      continue;
    }

    switch (card.effect) {
      case 'center_control':
        if (isSquareOccupiedByWhite('e4')) {
          setBoardScore(['e4'], card.value);
        }
        if (isSquareOccupiedByWhite('e5')) {
          setBoardScore(['e5'], card.value);
        }
        if (isSquareOccupiedByWhite('d4')) {
          setBoardScore(['d4'], card.value);
        }
        if (isSquareOccupiedByWhite('d5')) {
          setBoardScore(['d5'], card.value);
        }
        break;

      case 'visionary':
        setBoardScore(['e4'], game.attackers('e4', 'w').length * card.value);
        setBoardScore(['e5'], game.attackers('e5', 'w').length * card.value);
        setBoardScore(['d4'], game.attackers('d4', 'w').length * card.value);
        setBoardScore(['d5'], game.attackers('d5', 'w').length * card.value);
        break;

      case 'x_marks_the_spot_1':
        setBoardScore(
          ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
          card.value
        );
        break;

      case 'x_marks_the_spot_2':
        setBoardScore(
          ['a8', 'b7', 'c6', 'd5', 'e4', 'f3', 'g2', 'h1'],
          card.value
        );
        break;

      case 'enemy_lines':
        setBoardScore(
          ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
          card.value
        );
        setBoardScore(
          ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
          card.value
        );
        break;

      case 'railing_1':
        setBoardScore(
          ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
          card.value
        );
        break;

      case 'railing_2':
        setBoardScore(
          ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
          card.value
        );
        break;

      case 'ladders_1':
        setBoardScore(
          ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
          card.value
        );
        break;

      case 'ladders_2':
        setBoardScore(
          ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
          card.value
        );
        break;

      case 'knight_squares':
        foresightSquare('n' as PieceSymbol, card.value);
        break;

      case 'rook_squares':
        foresightSquare('r' as PieceSymbol, card.value);
        break;

      case 'bishop_squares':
        foresightSquare('b' as PieceSymbol, card.value);
        break;

      case 'queen_squares':
        foresightSquare('q' as PieceSymbol, card.value);
        break;

      case 'pawn_squares':
        foresightSquare('p' as PieceSymbol, card.value);
        break;

      case 'knights_minus_1':
        setEnemyPieceValue('n', getEnemyPieceValue('n') - card.value);
        break;

      case 'bishops_minus_1':
        setEnemyPieceValue('b', getEnemyPieceValue('b') - card.value);
        break;

      case 'rooks_minus_1':
        setEnemyPieceValue('r', getEnemyPieceValue('r') - card.value);
        break;

      case 'queens_minus_1':
        setEnemyPieceValue('q', getEnemyPieceValue('q') - card.value);
        break;

      case 'pawns_minus_1':
        setEnemyPieceValue('p', getEnemyPieceValue('p') - card.value);
        break;

      case 'knights_1':
        setPieceValue('n', getPieceValue('n') + card.value);
        break;

      case 'bishops_1':
        setPieceValue('b', getPieceValue('b') + card.value);
        break;

      case 'rooks_1':
        setPieceValue('r', getPieceValue('r') + card.value);
        break;

      case 'queens_1':
        setPieceValue('q', getPieceValue('q') + card.value);
        break;

      case 'pawns_1':
        setPieceValue('p', getPieceValue('p') + card.value);
        break;

      case 'queens_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'q')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'q')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'q')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'q'))
        ) {
          setPieceValue('q', getPieceValue('q') + card.value);
        }
        break;

      case 'knights_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'n')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'n')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'n')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'n'))
        ) {
          setPieceValue('n', getPieceValue('n') + card.value);
        }
        break;

      case 'bishops_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'b')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'b')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'b')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'b'))
        ) {
          setPieceValue('b', getPieceValue('b') + card.value);
        }
        break;

      case 'rooks_gambit':
        if (
          (isSquareOccupiedByWhite('e4') && isPieceOnSquare('e4', 'r')) ||
          (isSquareOccupiedByWhite('d4') && isPieceOnSquare('d4', 'r')) ||
          (isSquareOccupiedByWhite('e5') && isPieceOnSquare('e5', 'r')) ||
          (isSquareOccupiedByWhite('d5') && isPieceOnSquare('d5', 'r'))
        ) {
          setPieceValue('r', getPieceValue('r') + card.value);
        }
        break;

      case 'kings_shield':
        shield('k', card.value);
        break;

      case 'knights_shield':
        shield('n', card.value);
        break;

      case 'bishops_shield':
        shield('b', card.value);
        break;

      case 'rooks_shield':
        shield('r', card.value);
        break;

      case 'queens_shield':
        shield('q', card.value);
        break;

      case 'knights_enemy':
        enemy('n', card.value);
        break;

      case 'bishops_enemy':
        enemy('b', card.value);
        break;

      case 'rooks_enemy':
        enemy('r', card.value);
        break;

      case 'queens_enemy':
        enemy('q', card.value);
        break;

      case 'the_flank_1':
        flank(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'], card.value);
        break;

      case 'the_flank_2':
        flank(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'], card.value);
        break;

      case 'square_buff':
        buff('Board', card.value);
        break;

      case 'piece_buff':
        buff('Buff', card.value);
        break;

      case 'attack_buff':
        buff('Nerf', card.value);
        break;

      case 'knight_hand':
        setPieceValue(
          'n',
          getPieceValue('n') + activeCards.length * card.value
        );
        break;

      case 'bishop_hand':
        setPieceValue(
          'b',
          getPieceValue('b') + activeCards.length * card.value
        );
        break;

      case 'rook_hand':
        setPieceValue(
          'r',
          getPieceValue('r') + activeCards.length * card.value
        );
        break;

      case 'queen_hand':
        setPieceValue(
          'q',
          getPieceValue('q') + activeCards.length * card.value
        );
        break;

      case 'pawn_hand':
        setPieceValue(
          'p',
          getPieceValue('p') + activeCards.length * card.value
        );
        break;

      case 'minimist':
        if (activeCards.length <= 2) {
          setPieceValue('n', card.value);
          setPieceValue('b', card.value);
          setPieceValue('r', card.value);
          setPieceValue('q', card.value);
          setPieceValue('p', card.value);
        }
        break;

      case 'final_gambit':
        if (turns === 1) {
          setPieceValue('n', getPieceValue('n') * 2);
          setPieceValue('b', getPieceValue('b') * 2);
          setPieceValue('r', getPieceValue('r') * 2);
          setPieceValue('q', getPieceValue('q') * 2);
          setPieceValue('p', getPieceValue('p') * 2);
        }
        break;

      case 'knights_score':
        if (score < 1000) {
          setEnemyPieceValue('n', getEnemyPieceValue('n') - card.value);
        }
        break;

      case 'bishops_score':
        if (score < 1000) {
          setEnemyPieceValue('b', getEnemyPieceValue('b') - card.value);
        }
        break;

      case 'rooks_score':
        if (score < 1000) {
          setEnemyPieceValue('r', getEnemyPieceValue('r') - card.value);
        }
        break;

      case 'queens_score':
        if (score < 1000) {
          setEnemyPieceValue('q', getEnemyPieceValue('q') - card.value);
        }
        break;

      case 'pawns_score':
        if (score < 1000) {
          setEnemyPieceValue('p', getEnemyPieceValue('p') - card.value);
        }
        break;

      case 'the_double':
        useScoreStore.setState({
          multiplier: multiplier + 1,
        });
        break;

      case 'high_score':
        if (score >= 20000) {
          setEnemyPieceValue('n', getEnemyPieceValue('n') - card.value);
          setEnemyPieceValue('b', getEnemyPieceValue('b') - card.value);
          setEnemyPieceValue('r', getEnemyPieceValue('r') - card.value);
          setEnemyPieceValue('q', getEnemyPieceValue('q') - card.value);
          setEnemyPieceValue('p', getEnemyPieceValue('p') - card.value);
        }
        break;

      case 'to_the_bank':
        useScoreStore.setState({
          bonus: bonus + money,
        });
        break;

      case 'kq_pair':
        pair('n', 'q', card.value);
        break;

      case 'kr_pair':
        pair('n', 'r', card.value);
        break;

      case 'bn_pair':
        pair('b', 'n', card.value);
        break;

      case 'bq_pair':
        pair('b', 'q', card.value);
        break;

      case 'rq_pair':
        pair('r', 'q', card.value);
        break;

      case 'knight_shadow':
        shadow('n', card.value);
        break;

      case 'bishop_shadow':
        shadow('b', card.value);
        break;

      case 'knight_survival':
        if (playerPieceCounts['n'] >= 2) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;

      case 'bishop_survival':
        if (playerPieceCounts['b'] >= 2) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;

      case 'rook_survival':
        if (playerPieceCounts['r'] >= 2) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;

      case 'bonus_ladder_1':
        useScoreStore.setState({
          bonus: bonus + getBonusFromFile('d', card.value),
        });
        break;

      case 'bonus_ladder_2':
        useScoreStore.setState({
          bonus: bonus + getBonusFromFile('e', card.value),
        });
        break;

      case 'bonus_railing_1':
        useScoreStore.setState({
          bonus: bonus + getBonusFromRank(4, card.value),
        });
        break;

      case 'bonus_railing_2':
        useScoreStore.setState({
          bonus: bonus + getBonusFromRank(5, card.value),
        });
        break;

      case 'opening_flow':
        if (turns > 5) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;

      case 'slow_burn':
        if (turns <= 6) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;

      case 'ultimate':
        if (turns <= 6) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;
      case 'vampire':
        vampire(card.value);
        break;
      case 'intimidation':
        intimidation(card.value);
        break;
      case 'survival':
        if (
          playerPieceCounts['r'] >= 2 &&
          playerPieceCounts['b'] >= 2 &&
          playerPieceCounts['n'] >= 2 &&
          playerPieceCounts['q'] >= 1
        ) {
          useScoreStore.setState({
            bonus: bonus + card.value,
          });
        }
        break;
      case 'bull_market':
        useScoreStore.setState({
          money: money + card.value,
        });
        break;
      case 'parry':
        //implicitly checked in the sheild function
        break;
      case 'pairs':
        enhance(card.value);
        break;
      case 'explosive':
        setBoardScore(['c4'], enemyMaterial * card.value);
        break;

      default:
    }
  }

  return null;
}
