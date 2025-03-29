'use client';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import CustomSquareRenderer from './custom-square-renderer';
import { applyCardEffects } from '@/utils/apply-card-effects';
import { CardRetroNoMotion } from '@/components/ui-retro/card-retro-no-motion';
import bosses from '@/config/bosses.json';
import positions from '@/config/filtered_positions.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import * as ChessUtils from '@/utils/chess-utils';
import { CustomPieceRenderer } from '@/components/chessboard/custom-piece-renderer';
import { custom_board_theme } from './theme';
import { useScoreStore } from '@/stores/useScoreStore';
import { GameOverPopup } from '@/components/popups/game-over-popup';
import { GameWinnerPopup } from '@/components/popups/game-winner-popup';

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
  const boardState: Record<string, number> = Object.fromEntries(board);
  const game = useScoreStore((state) => state.game);
  const engine = useScoreStore((state) => state.engine);
  const gamePosition = useScoreStore((state) => state.gamePosition);
  const isPlayerTurn = useScoreStore((state) => state.isPlayerTurn);
  const setGamePosition = useScoreStore((state) => state.setGamePosition);
  const [turnComplete, setTurnComplete] = useState(false);
  const { theme, setLevel, level } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [isShaking, setIsShaking] = useState(false);
  const [gameOverPopup, setGameOverPopup] = useState(false);
  const [gameWinnerPopup, setGameWinnerPopup] = useState(false);

  engine.onMessage(({ bestMove }) => {
    if (bestMove) {
      try {
        // Parse the bestMove string (e.g., "e2e4" or "e7e8q")
        const from = bestMove.substring(0, 2);
        const to = bestMove.substring(2, 4);
        const promotion = bestMove.substring(4, 5); // Promotion piece (e.g., "q")

        const move = game.move({
          from,
          to,
          promotion: promotion || undefined, // Only include promotion if it exists
        });
        if (move === null) {
          //console.error('Invalid move from Stockfish:', bestMove);
          return;
        }

        setGamePosition(game.fen());
        //change turn
        setPlayerTurn(true);

        // Update the board position
        checkGameEnd();
        setMaterialAdvantage();
      } catch (error) {
        //console.error('Illegal move from Stockfish:', error);
      }
    }
  });

  function checkGameEnd() {
    if (game.isCheckmate()) {
      const isWhite = game.turn() === 'b';
      isWhite ? setGameWinnerPopup(true) : setGameOverPopup(true);
    }
  }

  const startShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Stops after 0.5s
  };

  useEffect(() => {
    if (turnComplete) {
      applyCardEffects(); //apply effects at end of turn

      //set cumulative score (not sure if working)
      const state = useScoreStore.getState();
      const newScore = state.score + state.getScore();
      useScoreStore.setState({ score: newScore });
      console.log('scoring effect', newScore, state.score, state.getScore());

      //set money
      const money = state.money;
      state.setMoney(money + 20);

      setTurnComplete(false); // reset the flag
    }
  }, [turnComplete]);

  useEffect(() => {
    //sets FEN to position from games.json
    if (turns === 10) {
      engine.enableLimitStrength(true);
      engine.setSkillLevel(boss.level);
      game.reset();
      const randomGame =
        positions.positions[
          Math.floor(Math.random() * positions.positions.length)
        ].fen;
      game.load(randomGame);
      setGamePosition(randomGame);
      applyCardEffects(); // apply board square effects turn 1
      setMaterialAdvantage();
    } else {
      engine.enableLimitStrength(true);
      engine.setSkillLevel(boss.level);
    }
  }, [level]);

  function makeRandomMove() {
    const randomMove = ChessUtils.getRandomMove(game);
    if (randomMove) {
      if (ChessUtils.makeMove(game, randomMove)) {
        setGamePosition(game.fen());
      }
      return true;
    } else {
      return false;
    }
  }

  function bossLogicCheck(turnNumber: number) {
    if (level == 3) {
      if (turns === 8 || turns === 3) {
        setLevel(4);
      }
    } else if (level === 4) {
      if (turns === 6 || turns === 1) {
        setLevel(3);
      }
    } else if (level === 7) {
      const pieces = Array.from(
        document.querySelectorAll<HTMLElement>('[data-piece]')
      );
      if (pieces.length === 0) return;
      if (turnNumber % 3 === 0) {
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        randomPiece.style.opacity = '0';
      } else {
        pieces.forEach((piece) => (piece.style.opacity = '1'));
      }
    } else {
      console.log('else');
    }
  }

  function scoreManagement(
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) {
    //needed for render animations
    useScoreStore.setState((state) => ({
      to: targetSquare,
      from: sourceSquare,
      piece: piece,
    }));
    //triggers card effect hook
    setTurnComplete(true);

    //runAnimationSequence(targetSquare, piece);
    setMaterialAdvantage();
    updateScore(targetSquare, piece);

    //decrement turns
    decrementTurns();
  }

  function decrementTurns() {
    useScoreStore.setState((state) => ({
      turns: state.turns - 1,
    }));
  }

  function setPlayerTurn(value: boolean) {
    useScoreStore.setState((state) => ({
      isPlayerTurn: value,
    }));
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
      setGamePosition(game.fen());

      scoreManagement(sourceSquare, targetSquare, piece);

      //animation triggers
      //runAnimationSequence();

      // check for checkmate
      checkGameEnd();

      //adds attack button logic
      bossLogicCheck(game.moveNumber());

      //change turn
      setPlayerTurn(false);

      if (boss.elo === 0) {
        setTimeout(() => {
          setPlayerTurn(true);
          makeRandomMove();
          checkGameEnd();
        }, 1000);
      } else {
        engine.evaluatePosition(game.fen(), boss.depth);
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
