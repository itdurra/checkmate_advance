import { useScoreStore } from '@/stores/useScoreStore';
import { Chess, Square, Move } from 'chess.js';

export function applyCardEffects() {
  const {
    game,
    turns,
    activeCards,
    consecutiveChecks,
    setPieceValue,
    setEnemyPieceValue,
    setBoardScore,
    getPieceValue,
  } = useScoreStore.getState();

  /** 🔢 Get total count of a specific piece type (e.g., 'p', 'n', 'b', 'r', 'q', 'k') */
  function getPieceCountByType(type: string, color?: string): number {
    return game
      .board()
      .flat()
      .filter(
        (square) =>
          square && square.type === type && (!color || square.color === color)
      ).length;
  }

  /** 🔍 Calculate the number of squares moved (for distance-based effects) */
  function calculateDistance(from: Square, to: Square): number {
    const fileDistance = Math.abs(from.charCodeAt(0) - to.charCodeAt(0));
    const rankDistance = Math.abs(parseInt(from[1]) - parseInt(to[1]));
    return fileDistance + rankDistance;
  }

  /** 🏰 Check if the move is retreating */
  function isRetreatingMove(from: Square, to: Square): boolean {
    return parseInt(to[1]) < parseInt(from[1]); // Retreating moves decrease rank
  }

  /** 🔢 Count how many pieces of a given type are on the board */
  function countPieces(type: string): number {
    return game
      .board()
      .flat()
      .filter((square) => square?.type === type).length;
  }

  /** 🏰 Check if a rook is on the same file as another */
  function isRookOnSameFile(to: Square): boolean {
    const file = to[0]; // Extract file (letter)
    const rooks = game
      .board()
      .flat()
      .filter(
        (square) => square && square.type === 'r' && square.square[0] === file
      );
    return rooks.length > 1;
  }

  /** 📏 Check if piece is on a special "X file" */
  function isFileX(to: Square): boolean {
    return to[0] === 'd'; // Example: Double points for pieces on file "d"
  }

  /** 📏 Check if piece is on a special "X rank" */
  function isRankX(to: Square): boolean {
    return to[1] === '4'; // Example: Double points for pieces on rank "4"
  }

  function isSquareOccupiedByWhite(square: Square): boolean {
    if (game.get(square) && game.get(square)?.color == 'w') {
      return true;
    }
    return false;
  }

  /** 🔢 Get total number of pieces on the board */
  function getPieceCount(): number {
    let count = 0;

    for (const row of game.board()) {
      for (const square of row) {
        if (square) count++; // If the square contains a piece, increment count
      }
    }

    return count;
  }

  /** 🏰 Apply "Rook’s Rampage" Effect: +1 Piece Value for each open file controlled */
  function rooksRampage(): void {
    const rooks = findPiece('r', 'w'); // Get all white rooks
    let openFiles = new Set<string>();

    for (const rook of rooks) {
      const file = rook[0]; // Extract file (column letter)
      if (isFileOpen(file)) {
        openFiles.add(file);
      }
    }

    // Increase the value of rooks by the number of open files they control
    setPieceValue('r', getPieceValue('r') + openFiles.size);
  }

  /** 🏹 Apply "Bishop’s Blessing" Effect: +1 Piece Value for each attacked piece */
  function bishopsBlessing(): void {
    const bishops = findPiece('b', 'w'); // Get all white bishops
    let attackCount = 0;

    for (const bishop of bishops) {
      const attackedSquares = getDiagonalAttacks(bishop);

      for (const square of attackedSquares) {
        const piece = game.get(square);
        if (piece && piece.color !== 'w') {
          // If it's an opponent's piece
          attackCount++;
        }
      }
    }

    // Increase the value of bishops based on the number of attacked pieces
    setPieceValue('b', getPieceValue('b') + attackCount);
  }

  /** 📐 Get all diagonally attacked squares from a bishop's position */
  function getDiagonalAttacks(position: Square): Square[] {
    const directions = [
      [-1, -1],
      [-1, 1], // Upper-left, Upper-right
      [1, -1],
      [1, 1], // Lower-left, Lower-right
    ];

    const attackedSquares: Square[] = [];

    for (const [fileOffset, rankOffset] of directions) {
      let file = position[0].charCodeAt(0);
      let rank = parseInt(position[1]);

      while (true) {
        file += fileOffset;
        rank += rankOffset;
        const newSquare = `${String.fromCharCode(file)}${rank}` as Square;

        if (!isValidSquare(newSquare)) break; // Stop if out of bounds

        attackedSquares.push(newSquare);

        if (game.get(newSquare)) break; // Stop if piece is blocking
      }
    }

    return attackedSquares;
  }

  /** 📏 Check if a file is open (no pawns) */
  function isFileOpen(file: string): boolean {
    for (let rank = 1; rank <= 8; rank++) {
      const square = `${file}${rank}` as Square;
      const piece = game.get(square);
      if (piece && piece.type === 'p') return false; // Pawn detected → File is NOT open
    }
    return true; // No pawns found → File is open
  }

  //TODO IMPLEMENT
  function pawnStorm(): void {}

  //TODO IMPLEMENT
  function knightsGambit(): void {}

  //there's no way this works :(
  function kingsShield(): void {
    const adjacentSquaresMap = getAdjacentSquares('k', 'w');
    const adjacentSquares = Array.from(adjacentSquaresMap.values()).flat();
    for (const square in adjacentSquares) {
      const piece = game.get(square as Square)?.type;
      if (piece != undefined) {
        setPieceValue(piece, 1);
      }
    }
  }

  function battleCry(): void {
    const adjacentSquaresMap = getAdjacentSquares('k', 'w');
    const adjacentSquares = Array.from(adjacentSquaresMap.values()).flat();
    setBoardScore(adjacentSquares, 1);
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

  function sacrificial(move: Move): void {
    if (move.isCapture()) { //ERROR seems to be undefined
      setBoardScore([move.to], 2);
    }
  }

  function forkedLightning(): void {
    const knightSquares = findPiece('n', 'w');
    let count = 0;
    for (const square of knightSquares) {
      for (const move of game.moves({ square: square, verbose: true })) {
        if (move.isCapture()) {
          count++;
        }
      }
      if (count >= 2) {
        setPieceValue('n', getPieceValue('n') + Math.round(count / 2));
      }
    }
  }

  /** 🔍 Identify pinned pieces and increase bishop value */
  function pinpointAccuracy(): void {
    const bishops = findPiece('b', 'w'); // Find all white bishops
    for (const bishop of bishops) {
      if (isPinning(bishop)) {
        setPieceValue('b', getPieceValue('b') + 2);
      }
    }
  }

  /** 🔍 Check if a given bishop is pinning an opponent’s piece */
  function isPinning(bishopSquare: Square): boolean {
    const board = game.board(); // Get the board representation
    const directions = [
      [-1, -1],
      [1, 1], // Diagonal ↘ ↖
      [-1, 1],
      [1, -1], // Diagonal ↗ ↙
    ];

    for (const [fileOffset, rankOffset] of directions) {
      let x = bishopSquare.charCodeAt(0);
      let y = parseInt(bishopSquare[1]);
      let encounteredEnemy = false;
      let pinnedPieceSquare: Square | null = null;

      while (true) {
        x += fileOffset;
        y += rankOffset;
        const square = `${String.fromCharCode(x)}${y}` as Square;

        if (!isValidSquare(square)) break; // Stop if out of bounds

        const piece = game.get(square);
        if (!piece) continue; // Skip empty squares

        if (piece.color === 'w') break; // Stop if another white piece blocks

        if (piece.color === 'b') {
          if (encounteredEnemy) break; // Already found one piece, so it's not a pin
          encounteredEnemy = true;
          pinnedPieceSquare = square;
          continue;
        }

        if (encounteredEnemy && piece.type === 'k') {
          // If an enemy king is aligned after an enemy piece, it's a pin
          return true;
        }
      }
    }
    return false;
  }

  /** 🔍 Identify skewered pieces and increase bishop value */
  function skewerStrike(): void {
    const bishops = findPiece('b', 'w'); // Find all white bishops
    for (const bishop of bishops) {
      if (isSkewering(bishop)) {
        setPieceValue('b', getPieceValue('b') + 2);
      }
    }
  }

  /** 🔍 Check if a given bishop is skewering an opponent’s pieces */
  function isSkewering(bishopSquare: Square): boolean {
    const board = game.board(); // Get the board representation
    const directions = [
      [-1, -1],
      [1, 1], // Diagonal ↘ ↖
      [-1, 1],
      [1, -1], // Diagonal ↗ ↙
    ];

    for (const [fileOffset, rankOffset] of directions) {
      let x = bishopSquare.charCodeAt(0);
      let y = parseInt(bishopSquare[1]);
      let firstPiece: Square | null = null;
      let secondPiece: Square | null = null;

      while (true) {
        x += fileOffset;
        y += rankOffset;
        const square = `${String.fromCharCode(x)}${y}` as Square;

        if (!isValidSquare(square)) break; // Stop if out of bounds

        const piece = game.get(square);
        if (!piece) continue; // Skip empty squares

        if (piece.color === 'w') break; // Stop if another white piece blocks

        if (piece.color === 'b') {
          if (!firstPiece) {
            firstPiece = square; // Store first opponent piece
            continue;
          } else {
            secondPiece = square; // Store second opponent piece
            break;
          }
        }
      }

      // If we found two opponent pieces in a line, it's a skewer
      if (firstPiece && secondPiece) {
        return true;
      }
    }
    return false;
  }

  function promotionPower(): void {
    const lastMove = game.history({ verbose: true }).slice(-1)[0];
    if (lastMove && lastMove.isPromotion()) {
      setPieceValue(lastMove.piece, getPieceValue(lastMove.piece) + 3);
    }
  }

  function checkmateThreat(): void {
    const lastMove = game.history({ verbose: true }).slice(-1)[0];
    if (game.isCheck()) {
      setPieceValue(lastMove.piece, getPieceValue(lastMove.piece) + 5);
    }
  }

  /** 🔄 Apply "Perpetual" Effect: +2 Square Value for consecutive checks */
  function perpetual(): void {
    const currentChecks = useScoreStore.getState().consecutiveChecks;
    if (game.inCheck()) {
      const newCount = currentChecks + 1;
      useScoreStore.setState({ consecutiveChecks: newCount });
      const bonus = 2 * consecutiveChecks; // +2 per consecutive check

      const lastMove = game.history({ verbose: true }).slice(-1)[0];
      setBoardScore([lastMove.to], 2);
    } else {
      useScoreStore.setState({ consecutiveChecks: 0 });
    }
  }

  /** Apply "Surge" Effect: +1 Square Value for checks */
  function surge(): void {
    if (game.inCheck()) {
      const lastMove = game.history({ verbose: true }).slice(-1)[0];
      setPieceValue(lastMove.piece, getPieceValue(lastMove.piece) + 1);
    }
  }

  /** Apply "Tempo Boost" Effect: +1 Square Value per square moved */
  function tempoBoost(): void {
    const lastMove = game.history({ verbose: true }).slice(-1)[0];
    const distance = calculateDistance(lastMove.from, lastMove.to);
    setBoardScore([lastMove.to], distance);
  }

  /**
   * sets piece and board values at beginning of each turn
   */
  for (const card of activeCards) {
    //if its beginning of game, calc only square vals
    if (turns === 10) {
      if (!(card.type === "Board")) continue;
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
        for (const move of game.moves({ piece: 'n', verbose: true })) {
          setBoardScore([move.to], 1);
        }
        break;

      case 'rook_squares':
        for (const move of game.moves({ piece: 'r', verbose: true })) {
          setBoardScore([move.to], 1);
        }
        break;

      case 'bishop_squares':
        for (const move of game.moves({ piece: 'b', verbose: true })) {
          setBoardScore([move.to], 1);
        }
        break;

      case 'queen_squares':
        for (const move of game.moves({ piece: 'q', verbose: true })) {
          setBoardScore([move.to], 1);
        }
        break;

      case 'knights_1':
        if(turns !== 1){
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

      case 'pawn_storm': //TODO IMPLEMENT
        pawnStorm(); //TODO IMPLEMENT
        break;
      case 'knights_gambit': //TODO IMPLEMENT
        knightsGambit();
        break;
      case 'bishops_blessing':
        bishopsBlessing();
        break;

      case 'rooks_rampage':
        rooksRampage();
        break;

      case 'queens_gambit':
        if (
          isSquareOccupiedByWhite('e4') ||
          isSquareOccupiedByWhite('d4') ||
          isSquareOccupiedByWhite('e5') ||
          isSquareOccupiedByWhite('d5')
        ) {
          setPieceValue('q', getPieceValue('q') + 3);
        }
        break;

      case 'kings_shield':
        kingsShield();
        break;

      case 'battle_cry':
        battleCry();
        break;

      case 'sacrificial':
        sacrificial(game.history({ verbose: true }).slice(-1)[0]);
        break;

      case 'forked_lightning':
        forkedLightning();
        break;

      case 'pinpoint_accuracy':
        pinpointAccuracy();
        break;

      case 'skewer_strike':
        skewerStrike();
        break;

      case 'promotion_power':
        promotionPower();
        break;

      case 'material_thief':
        setEnemyPieceValue('n', -1);
        setPieceValue('n', -1);
        break;

      case 'tempo_boost':
        tempoBoost();
        break;

      case 'checkmate_threat':
        checkmateThreat();
        break;

      case 'brilliant': //Need a postgame calc
        if (game.isCheckmate()) {
          useScoreStore.setState((state) => ({
            multiplier: state.multiplier + 1,
          }));
        }
        break;

      case 'perpetual':
        perpetual();
        break;

      case 'surge':
        surge();
        break;

      case 'square_overload': //too broken
        useScoreStore.setState((state) => ({
          squareScore: state.squareScore * getPieceCount(),
        }));
        break;

      case 'switch_material_advantage': //needs a flag to stop switching
        useScoreStore.setState((state) => ({
          materialMultiplier: (state.materialMultiplier * -1),
        }));
        break;

      case 'infinite_loop': //ecnourage turttling
        useScoreStore.setState((state) => ({
          multiplier: state.multiplier + getPieceCountByType('p', 'w'),
        }));
        break;

      case 'zero_sum': // timing is all wrong
        useScoreStore.setState((state) => ({
          squareScore: state.multiplier * 10,
          materialMultiplier: 0,
        }));

        break;

      case 'paradox_engine': //
        break;

      default:
        console.log(`No specific effect logic for ${card.effect}`);
    }
  }

  return(null);
};
