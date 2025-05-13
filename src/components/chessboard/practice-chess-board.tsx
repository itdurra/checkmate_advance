'use client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { PieceSymbol, Square } from 'chess.js';
import {
  Chessboard,
  ChessboardDnDProvider,
  SparePiece,
} from 'react-chessboard';
import { PromotionPieceOption } from 'react-chessboard/dist/chessboard/types';

import { CustomPieceRenderer } from '@/components/chessboard/custom-piece-renderer';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import positions from '@/config/filtered_positions.json';
import bosses from '@/config/practice-bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';
import { useScoreStore } from '@/stores/useScoreStore';
import type { OptionSquareStyles } from '@/types/option-square-styles';
import { Piece } from '@/types/piece';
import type { SquareStyles } from '@/types/square-styles';
import { applyCardEffects } from '@/utils/apply-card-effects';
import { applyPracticeMoney } from '@/utils/apply-money';
import * as ChessUtils from '@/utils/chess-utils';
import { pieces } from '@/utils/pieces';

import CustomSquareRenderer from './custom-square-renderer';
import { custom, custom_board_theme } from './theme';

export const PracticeChessBoard = () => {
  //music
  const playSFX = useMusicStore((state) => state.playSFX);
  //scoring
  const animatePiece = useScoreStore((state) => state.animatePiece);
  const setAnimatePiece = useScoreStore((state) => state.setAnimatePiece);
  const setAnimatePieceMap = useScoreStore((state) => state.setAnimatePieceMap);
  const animatePieceMap = useScoreStore((state)=> state.animatePieceMap);
  const turns = useScoreStore((state) => state.turns);
  const board = useScoreStore((state) => state.board);
  const setMaterialAdvantage = useScoreStore(
    (state) => state.setMaterialAdvantage
  );
  const activeCards = useScoreStore((state) => state.activeCards);
  const difficulty = useScoreStore((state) => state.difficulty);
  const updateScore = useScoreStore((state) => state.updateScore);
  const newGamePlus = useScoreStore((state) => state.newGamePlus);
  const setBossResult = useScoreStore((state) => state.setBossResult);
  const score = useScoreStore((state) => state.score);
  const boardState: Record<string, number> = Object.fromEntries(board);
  const game = useScoreStore((state) => state.game);
  //const { engine } = useGame();
  const engine = useScoreStore((state) => state.engine);
  const gamePosition = useScoreStore((state) => state.gamePosition);
  const newGame = useScoreStore((state) => state.newGame);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const setGamePositionPGN = useScoreStore((state) => state.setGamePositionPGN);
  const [turnComplete, setTurnComplete] = useState(false);
  const { theme, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses[0];
  const [isShaking, setIsShaking] = useState(false);
  //handle click to move
  const [moveFrom, setMoveFrom] = useState<Square>('' as Square);
  const [moveTo, setMoveTo] = useState<Square>('' as Square);

  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>(
    {}
  );
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [boardWidth, setBoardWidth] = useState(360);

  //runs after each player move
  useEffect(() => {
    if (turnComplete) {
      applyCardEffects(); // apply all active card effects

      //set cumulative score
      const state = useScoreStore.getState();
      const scoreCalc = state.getScore();
      const newScore = scoreCalc;

      //update scoring formula
      useScoreStore.setState({ score: newScore, bonus: 0, multiplier: 1 });
      //update

      //apply the money formula
      applyPracticeMoney();

      setTurnComplete(false); // reset the flag
    }
  }, [turnComplete]);

  //initial setup
  useEffect(() => {
    //reset scoring values
    newGame();

    //update boss and game position
    engine.setBossLevel(boss.level, newGamePlus, difficulty);
    game.reset();
    const randomGame =
      positions.positions[
        Math.floor(Math.random() * positions.positions.length)
      ].fen;
    game.load(randomGame);
    setGamePosition(randomGame);

    // apply board square effects turn 1
    applyCardEffects();

    //update material advantage score
    setMaterialAdvantage();
  }, []);

  //on message event handler used by Stockfish
  engine.onMessage(({ bestMove }) => {
    if (bestMove) {
      try {
        // Parse the bestMove string (e.g., "e2e4" or "e7e8q")
        const from = bestMove.substring(0, 2);
        const to = bestMove.substring(2, 4);
        const promotion = bestMove.substring(4, 5); // Promotion piece (e.g., "q")

        //make move and update FEN
        const move = game.move({
          from,
          to,
          promotion: promotion || undefined, // Only include promotion if it exists
        });
        if (move === null) {
          return;
        }
        useMusicStore.getState().playSFX('click3'); //needed to play sound in message handler
        applyForesight(from, to, promotion); //store state for card effect
        setGamePositionPGN(game.pgn());

        //update UI
        setPlayerTurn(true);

        setMaterialAdvantage();
      } catch (error) {
        //console.error('Illegal move from Stockfish:', error);
      }
    }
  });

  //store move in state to power foresight cards
  function applyForesight(
    targetSquare: string,
    sourceSquare: string,
    piece: string
  ) {
    //used for foresight squares apply card effects
    useScoreStore.setState((state) => ({
      to: targetSquare,
      from: sourceSquare,
      piece: piece,
    }));
  }

  //Decrement turn counter in zustand store
  function decrementTurns() {
    if (turns === 1) {
      useScoreStore.setState((state) => ({
        turns: 10,
      }));
    } else {
      useScoreStore.setState((state) => ({
        turns: state.turns - 1,
      }));
    }
  }

  //UI Element
  function setPlayerTurn(value: boolean) {
    useScoreStore.setState((state) => ({
      isPlayerTurn: value,
    }));
  }

  //gets a random move and updates FEN
  function makeRandomMove() {
    const randomMove = ChessUtils.getRandomMove(game);
    if (randomMove) {
      if (ChessUtils.makeMove(game, randomMove)) {
        setGamePositionPGN(game.pgn());
      }
      return true;
    } else {
      return false;
    }
  }

  function callAnimations(piece: string) {
    //setAnimatePiece(true);
    setAnimatePieceMap(piece, true);
    console.log('call ani');
  }

  //handles updating score
  function scoreManagement(
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) {
    //store state for card effect
    applyForesight(sourceSquare, targetSquare, piece);
    //triggers card effect hook
    setTurnComplete(true);
    //applyCardEffects(); //apply effects at end of turn

    //runAnimationSequence(targetSquare, piece);
    setMaterialAdvantage();
    updateScore(targetSquare, piece);

    //decrement turns
    decrementTurns();
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? 'q',
      });
      // If the move is invalid, return false
      if (move === null) {
        return false;
      }
      playSFX('click2');
      scoreManagement(sourceSquare, targetSquare, piece);
      setGamePositionPGN(game.pgn());

      //change turn
      setPlayerTurn(false);

      //call animations - removed this due to conflicts with react chessboard
      //callAnimations(piece);

      //boss 1 has 0 elo, so makes random moves
      if (boss.elo === 0) {
        setTimeout(() => {
          setPlayerTurn(true);
          makeRandomMove();
        }, boss.moveTime);
      } else {
        setTimeout(() => {
          engine.evaluatePosition(game.fen());
        }, boss.moveTime);
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  //updates board color for click to move options
  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares: OptionSquareStyles = {};
    const sourcePiece = game.get(square);
    moves.forEach((move) => {
      const targetPiece = game.get(move.to);
      newSquares[move.to] = {
        background:
          targetPiece && sourcePiece && targetPiece.color !== sourcePiece.color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });

    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
    return true;
  }

  //handle click to move
  function onSquareClick(square: Square) {
    setRightClickedSquares({});

    // from square
    if (!moveFrom) {
      playSFX('click1'); //sound effect
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    //if click the same square again (clear it)
    if (moveFrom === square) {
      setMoveFrom('' as Square);
      setOptionSquares({});
      return;
    }

    // to square
    if (!moveTo) {
      // check if valid move before showing dialog
      const moves = game.moves({
        square: moveFrom,
        verbose: true,
      });
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );
      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square);
        // if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : ('' as Square));
        return;
      }

      // valid move
      setMoveTo(square);

      // if promotion move
      if (
        (foundMove.color === 'w' &&
          foundMove.piece === 'p' &&
          square[1] === '8') ||
        (foundMove.color === 'b' &&
          foundMove.piece === 'p' &&
          square[1] === '1')
      ) {
        setShowPromotionDialog(true);
        return;
      }
      //combine values to get wP wN etc.. instead of just 'p' or 'n'
      const piece = `${game.get(moveFrom)?.color}${game.get(moveFrom)?.type}`;
      const move = onDrop(moveFrom, square, piece ? piece : 'wQ');
      // if invalid, setMoveFrom and getMoveOptions
      if (move === null || !move) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }
      //setGame(gameCopy);
      //setTimeout(makeRandomMove, 300);
      setMoveFrom('' as Square);
      setMoveTo('' as Square);
      setOptionSquares({});
      return;
    }
  }

  //handle click to move promotion moves
  function onPromotionPieceSelect(
    piece?: PromotionPieceOption,
    promoteFromSquare?: Square,
    promoteToSquare?: Square
  ): boolean {
    // if no piece selected (user canceled)
    if (!piece || !promoteFromSquare || !promoteToSquare) {
      setMoveFrom('' as Square);
      setMoveTo('' as Square);
      setShowPromotionDialog(false);
      setOptionSquares({});
      return false;
    }
    onDrop(promoteFromSquare, promoteToSquare, piece ?? 'wQ');

    setMoveFrom('' as Square);
    setMoveTo('' as Square);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  //right click on board square
  function onSquareRightClick(square: Square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : {
              backgroundColor: colour,
            },
    });
  }

  //handle piece being dropped off a board (remove it)
  const handlePieceDropOffBoard = (sourceSquare: Square, piece: Piece) => {
    //clear move queue
    setMoveFrom('' as Square);
    setOptionSquares({});
    if (piece === 'bK' || piece === 'wK') {
      //game.remove(sourceSquare);
      //setGamePositionPGN(game.pgn());
      return;
    } else {
      game.remove(sourceSquare);
      setGamePositionPGN(game.pgn());
      //handle king notification
    }

  };
  

  //gets piece wP wN etc.. and targetSquare, and puts piece on board or rejects
  const handleSparePieceDrop = (piece: string, targetSquare: Square) => {
    const rank = parseInt(targetSquare[1], 10);
    const isPawn = piece[1] === 'P' || piece[1] === 'p';
    if(isPawn && (rank === 1 || rank === 8)){
      return false;
    }

    const color = piece[0] === 'w' ? 'w' : 'b'; // First character
    const type = piece[1].toLowerCase() as PieceSymbol; // lowercase (chess.js wants 'p', 'n', etc.)
    const success = game.put(
      {
        type,
        color,
      },
      targetSquare
    );
    if (success) {
      setGamePosition(game.fen());
    } 
    return success;
  };

  const customPieceFunctions = CustomPieceRenderer({ boardState });

  return (
    <>
      <CardRetroNoMotion className='flex max-h-[620px] flex-col p-1 text-center'>
        <ChessboardDnDProvider>
          <div className='flex flex-row justify-center gap-1'>
            {pieces.slice(6, 11).map((piece) => (
              <SparePiece
                key={piece}
                piece={piece as Piece}
                width={boardWidth / 8}
                dndId='ManualBoardEditor'
                customPieceJSX={customPieceFunctions[piece]}
              />
            ))}
          </div>
          <div className='relative mx-auto w-full max-w-[470px]'>
            <Chessboard
              id='PlayVsStockfish'
              position={gamePosition}
              onPieceDragBegin={(piece, square) => {
                playSFX('click1');
              }}
              onPieceDrop={onDrop}
              boardOrientation='white'
              showBoardNotation={true}
              customDarkSquareStyle={{ backgroundColor: custom_board_theme[1] }}
              customLightSquareStyle={{
                backgroundColor: custom_board_theme[0],
              }}
              customPieces={customPieceFunctions}
              customSquare={(props) => <CustomSquareRenderer {...props} />}
              //handle click to move
              animationDuration={200}
              onSquareClick={onSquareClick}
              onSquareRightClick={onSquareRightClick}
              onPromotionPieceSelect={onPromotionPieceSelect}
              customSquareStyles={{
                ...moveSquares,
                ...optionSquares,
                ...rightClickedSquares,
              }}
              promotionToSquare={moveTo}
              showPromotionDialog={showPromotionDialog}
              //handle board editor
              onSparePieceDrop={handleSparePieceDrop}
              onPieceDropOffBoard={handlePieceDropOffBoard}
              dropOffBoardAction='trash'
              onBoardWidthChange={setBoardWidth}
            />
          </div>
          <div className='flex flex-row justify-center gap-1'>
            {pieces.slice(0, 5).map((piece) => (
              <SparePiece
                key={piece}
                piece={piece as Piece}
                width={boardWidth / 8}
                dndId='ManualBoardEditor'
                customPieceJSX={customPieceFunctions[piece]}
              />
            ))}
          </div>
        </ChessboardDnDProvider>
      </CardRetroNoMotion>
    </>
  );
};
