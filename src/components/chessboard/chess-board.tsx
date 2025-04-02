'use client';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';

import { CustomPieceRenderer } from '@/components/chessboard/custom-piece-renderer';
import { GameOverPopup } from '@/components/popups/game-over-popup';
import { GameWinnerPopup } from '@/components/popups/game-winner-popup';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import positions from '@/config/filtered_positions.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { applyCardEffects } from '@/utils/apply-card-effects';
import { applyMoney } from '@/utils/apply-money';
import * as ChessUtils from '@/utils/chess-utils';

import CustomSquareRenderer from './custom-square-renderer';
import { custom_board_theme } from './theme';

export const ChessBoard = () => {
  const turns = useScoreStore((state) => state.turns);
  const board = useScoreStore((state) => state.board);
  const buffedPieces = useScoreStore((state) => state.buffedPieces);
  const setMaterialAdvantage = useScoreStore(
    (state) => state.setMaterialAdvantage
  );
  const updateScore = useScoreStore((state) => state.updateScore);
  const updatePieceScore = useScoreStore((state) => state.updatePieceScore);
  const updateSquareScore = useScoreStore((state) => state.updateSquareScore);
  const setBossResult = useScoreStore((state) => state.setBossResult);
  const score = useScoreStore((state) => state.score);
  const boardState: Record<string, number> = Object.fromEntries(board);
  const game = useScoreStore((state) => state.game);
  //const { engine } = useGame();
  const engine = useScoreStore((state) => state.engine);
  const gamePosition = useScoreStore((state) => state.gamePosition);
  const isPlayerTurn = useScoreStore((state) => state.isPlayerTurn);
  const isGameOver = useScoreStore((state) => state.isGameOver);
  const newGame = useScoreStore((state) => state.newGame);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const setGamePositionPGN = useScoreStore((state) => state.setGamePositionPGN);
  const [turnComplete, setTurnComplete] = useState(false);
  const { theme, setLevel, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [isShaking, setIsShaking] = useState(false);
  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);

  //check if game is won/lost
  useEffect(() => {
      if (score >= boss.score) {
        setGameWinnerPopup(true);
        setBossResult(level - 1, 2); // win
        useScoreStore.setState({ isGameOver: true });
      }
      if (turns === 0) {
        //less than score so game over
        if(score <= boss.score){
          setGameOverPopup(true);
          useScoreStore.setState({ isGameOver: true });
        }
      }
  }, [score, boss.score, turns]);

  //runs after each player move
  useEffect(() => {
    if (turnComplete) {
      applyCardEffects(); // apply all active card effects

      //set cumulative score
      const state = useScoreStore.getState();
      const newScore = state.score + state.getScore();
      useScoreStore.setState({ score: newScore });

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
    engine.enableLimitStrength(true);
    engine.setSkillLevel(boss.level);
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
  function applyForesight(targetSquare: string, sourceSquare: string, piece: string) {
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
      isWhite ? setGameWinnerPopup(true) : setGameOverPopup(true);
      //make board movable
      useScoreStore.setState((state) => ({
        isGameOver: true,
      }));
    }
  }

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

    //set cumulative score (not sure if working)
    const state = useScoreStore.getState();
    const newScore = state.score + state.getScore();
    useScoreStore.setState({ score: newScore });

    //apply the money formula
    applyMoney();

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
      scoreManagement(sourceSquare, targetSquare, piece);
      setGamePositionPGN(game.pgn());

      // check for checkmate
      checkGameEnd();

      //change turn
      setPlayerTurn(false);

      //boss 1 has 0 elo, so makes random moves
      if (boss.elo === 0) {
        setTimeout(() => {
          setPlayerTurn(true);
          makeRandomMove();
          checkGameEnd();
        }, boss.moveTime);
      } else {
        setTimeout(() => {
          engine.evaluatePosition(game.fen(), boss.depth);
        }, boss.moveTime);
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className={`${isShaking ? 'animate-short-earthquake' : ''}`}>
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
          position={gamePosition}
          arePiecesDraggable={!isGameOver}
          onPieceDrop={onDrop}
          boardOrientation='white'
          showBoardNotation={true}
          customDarkSquareStyle={{ backgroundColor: custom_board_theme[1] }}
          customLightSquareStyle={{ backgroundColor: custom_board_theme[0] }}
          customPieces={CustomPieceRenderer({ boardState })}
          customSquare={(props) => <CustomSquareRenderer {...props} />}
        />
      </CardRetroNoMotion>
    </div>
  );
};
