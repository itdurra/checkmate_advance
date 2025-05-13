'use client';
import { useEffect, useMemo, useState } from 'react';
import { Piece, PieceSymbol, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { PromotionPieceOption } from 'react-chessboard/dist/chessboard/types';

import { CustomPieceRenderer } from '@/components/chessboard/custom-piece-renderer';
import { GameOverPopup } from '@/components/popups/game-over-popup';
import { GameWinnerPopup } from '@/components/popups/game-winner-popup';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import positions from '@/config/filtered_positions.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useMusicStore } from '@/stores/useMusicStore';
import { useScoreStore } from '@/stores/useScoreStore';
import { useStatsStore } from '@/stores/useStatsStore';
import type { OptionSquareStyles } from '@/types/option-square-styles';
import type { SquareStyles } from '@/types/square-styles';
import { applyCardEffects } from '@/utils/apply-card-effects';
import { applyMoney } from '@/utils/apply-money';
import { calculateBossScore } from '@/utils/calculate-endless-boss-scores';
import * as ChessUtils from '@/utils/chess-utils';

import FormulaSequence from '../animation-display';
import { FormulaDisplay } from '../animations/formula-display';

import CustomSquareRenderer from './custom-square-renderer';
import { custom_board_theme } from './theme';

export const ChessBoard = () => {
  //music
  const playSFX = useMusicStore((state) => state.playSFX);
  //stats
  const addScore = useStatsStore((state) => state.addScore);
  const trySetHighestTurnScore = useStatsStore(
    (state) => state.trySetHighestTurnScore
  );
  const trySetHighestGameScore = useStatsStore(
    (state) => state.trySetHighestGameScore
  );
  //const bossFightSummaries = useStatsStore((state) => state.bossFightSummaries);
  const incrementCardUsage = useStatsStore((state) => state.incrementCardUsage);
  //scoring
  /*
  const pieceAnimations = useScoreStore((state) => state.pieceAnimations);
  const animatePiece = useScoreStore((state) => state.animatePiece);
  const resetPieceAnimation = useScoreStore(
    (state) => state.resetPieceAnimation
  );
  */
  const setAnimateFormula = useScoreStore((state) => state.setAnimateFormula);
  const setAnimatePiece = useScoreStore((state) => state.setAnimatePiece)
  const setAnimateSquare = useScoreStore((state) => state.setAnimateSquare);
  const historyPointer = useScoreStore((state) => state.historyPointer);
  const setHistoryPointer = useScoreStore((state) => state.setHistoryPointer);
  const difficulty = useScoreStore((state) => state.difficulty);
  const turns = useScoreStore((state) => state.turns);
  const board = useScoreStore((state) => state.board);
  const setMaterialAdvantage = useScoreStore(
    (state) => state.setMaterialAdvantage
  );
  const activeCards = useScoreStore((state) => state.activeCards);
  const updateScore = useScoreStore((state) => state.updateScore);
  const newGamePlus = useScoreStore((state) => state.newGamePlus);
  const setBossResult = useScoreStore((state) => state.setBossResult);
  const score = useScoreStore((state) => state.score);
  const boardState: Record<string, number> = Object.fromEntries(board);
  const game = useScoreStore((state) => state.game);
  //const { engine } = useGame();
  const engine = useScoreStore((state) => state.engine);
  const gamePosition = useScoreStore((state) => state.gamePosition);
  const isGameOver = useScoreStore((state) => state.isGameOver);
  const newGame = useScoreStore((state) => state.newGame);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const setGamePositionPGN = useScoreStore((state) => state.setGamePositionPGN);
  const [turnComplete, setTurnComplete] = useState(false);
  const { theme, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [isShaking, setIsShaking] = useState(false);
  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);
  //handle click to move
  const [moveFrom, setMoveFrom] = useState<Square>('' as Square);
  const [moveTo, setMoveTo] = useState<Square>('' as Square);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>(
    {}
  );
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  //check if game is won/lost
  useEffect(() => {
    const bossScore = calculateBossScore(boss.score, newGamePlus, level);
    if (Math.round(score) >= bossScore) {
      setGameWinnerPopup(true);
      setBossResult(level - 1, 2); // win
      //saveBossSummary('Win');
      useScoreStore.setState({ isGameOver: true });
    }
    if (turns === 0) {
      //less than score so game over
      if (score <= bossScore) {
        setGameOverPopup(true);
        useScoreStore.setState({ isGameOver: true });
        //saveBossSummary('Loss');
      }
    }
  }, [score, boss.score, turns]);

  //runs after each player move
  useEffect(() => {
    if (turnComplete) {
      applyCardEffects(); // apply all active card effects

      //set cumulative score
      const state = useScoreStore.getState();
      const scoreCalc = state.getScore();
      const newScore = state.score + scoreCalc;

      // update stats
      const bestTurnHand = activeCards.slice(0, 5).map((card) => ({
        id: card.id,
        name: card.name,
        upgradeLevel: card.upgrade,
      }));
      trySetHighestTurnScore(scoreCalc, bestTurnHand);
      trySetHighestGameScore(newScore);
      addScore(scoreCalc);

      //update scoring formula
      useScoreStore.setState({ score: newScore, bonus: 0, multiplier: 1 });
      //update

      //apply the money formula
      applyMoney();

      setTurnComplete(false); // reset the flag
    }
  }, [turnComplete]);

  //initial setup
  useEffect(() => {
    //make board movable
    useScoreStore.setState((state) => ({
      isGameOver: false,
    }));

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

    activeCards.forEach((card) => {
      incrementCardUsage(card.id);
    });
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
        checkGameEnd();
        applyForesight(from, to, promotion); //store state for card effect
        setGamePositionPGN(game.pgn());

        //update UI
        setPlayerTurn(true);

        //check game isn't over
        checkGameEnd();
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

  //check if game has ended via checkmate
  function checkGameEnd() {
    if (game.isCheckmate()) {
      const isWhite = game.turn() === 'b';
      if (game.turn() === 'b') {
        //saveBossSummary('Win');
        setGameWinnerPopup(true);
      } else {
        //saveBossSummary('Loss');
        setGameOverPopup(true);
      }

      //make board movable
      useScoreStore.setState((state) => ({
        isGameOver: true,
      }));
    }
  }

  //helper function for saving game history (includes cards)
  /*
  function saveBossSummary(result: string) {
    //prevent duplicate entries for same level
    const length = bossFightSummaries.length;
    if (length === 0 || bossFightSummaries[length - 1].level !== boss.level) {
      // Get active cards
      const cardsUsed = activeCards.map((card) => ({
        name: card.name,
        upgradeLevel: card.upgrade,
      }));

      // Add boss fight summary
      useStatsStore.getState().addBossFightSummary({
        level: boss.level,
        result: result,
        finalTurn: turns,
        cardsUsed: cardsUsed,
        pgn: game.pgn(),
      });
    }
  }*/

  //earthquake animation helper function
  const startShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Stops after 0.5s
  };

  //Decrement turn counter in zustand store
  function decrementTurns() {
    useScoreStore.setState((state) => ({
      turns: state.turns - 1,
    }));
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

    /*
    //set cumulative score (not sure if working)
    const state = useScoreStore.getState();
    const newScore = state.score + state.getScore();
    useScoreStore.setState({ score: newScore });
    */
    //runAnimationSequence(targetSquare, piece);
    setMaterialAdvantage();
    updateScore(targetSquare, piece);

    //decrement turns
    decrementTurns();
  }

  function callAnimations(piece: string) {
    setAnimatePiece(true);
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

      // check for checkmate
      checkGameEnd();

      //change turn
      setPlayerTurn(false);

      //animate piece and square -- removed this due to conflicts with react chessboard
      //callAnimations(piece);

      //boss 1 has 0 elo, so makes random moves
      //newgameplus always has a difficulty setting on level 1
      if (boss.elo === 0 && newGamePlus === 0) {
        setTimeout(() => {
          setPlayerTurn(true);
          makeRandomMove();
          checkGameEnd();
        }, boss.moveTime);
      } else {
        setTimeout(() => {
          engine.evaluatePosition(game.fen());
        }, boss.moveTime);
      }

      return true;
    } catch (error) {
      console.log('test error');
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

  return (
    <>
      <FormulaSequence></FormulaSequence>
      <GameOverPopup
        isOpen={gameOverPopup}
        closeGameOverPopup={() => setGameOverPopup(false)}
      />
      <GameWinnerPopup
        isOpen={gameWinnerPopup}
        closeGameWinnerPopup={() => setGameWinnerPopup(false)}
      />
      <CardRetroNoMotion className='p-1 text-center'>
        <Chessboard
          id='PlayVsStockfish'
          position={
            historyPointer !== null && historyPointer < game.history().length
              ? game.history({ verbose: true })[historyPointer].before
              : gamePosition
          }
          arePiecesDraggable={!isGameOver}
          onPieceDrop={onDrop}
          onPieceDragBegin={(piece, square) => {
            playSFX('click1');
          }}
          boardOrientation='white'
          showBoardNotation={true}
          customDarkSquareStyle={{ backgroundColor: custom_board_theme[1] }}
          customLightSquareStyle={{ backgroundColor: custom_board_theme[0] }}
          customPieces={CustomPieceRenderer({ boardState })}
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
        />
      </CardRetroNoMotion>
    </>
  );
};
