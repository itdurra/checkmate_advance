'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Chessboard } from 'react-chessboard';
import { Arrow, Square } from 'react-chessboard/dist/chessboard/types';

import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import * as ChessUtils from '@/utils/chess-utils';
import {
  getDirectionalInputs,
  getTargetColumn,
} from '@/utils/get-chess-emu-mapping';

import { uscf,uscf_board_theme } from './theme';

export const ChessBoard = () => {
  const {
    engine,
    theme,
    setLevel,
    game,
    setGamePosition,
    gamePosition,
    diverted,
    setDiverted,
    setMultiplier,
    multiplier,
    setEnemyMessage,
    setPlayerMessage,
    level,
  } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];
  const [counter, setCounter] = useState(0);
  const [multiplierBestMove, setMultiplierBestMove] = useState('');
  const [multiplierDecoyMove, setMultiplierDecoyMove] = useState('');
  const [customArrows, setCustomArrows] = useState<Arrow[]>([]);
  const [bestPlayerMove, setBestPlayerMove] = useState('');

  const [showAnswer, setShowAnswer] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [flipBorderAnswerColors, setFlipBorderAnswerColors] = useState(false);

  const [playerEngineActiveCounter, setPlayerEngineActiveCounter] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const startShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Stops after 0.5s
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Map Base64 data to custom pieces
  const customPieces = Object.fromEntries(
    Object.entries(uscf).map(([key, value]) => [
      key,
      ({ squareWidth }: { squareWidth: number }) => (
        <Image
          src={value[0]}
          width={squareWidth}
          height={squareWidth}
          alt={key}
        />
      ),
    ])
  );

  useEffect(() => {
    engine.enableLimitStrength(true);
    engine.setSkillLevel(boss.level);
    //game.reset();
    //setGamePosition(game.fen());
  }, [level]);

  useEffect(() => {
    if (gamePosition == game.fen()) {
      if (!game.isGameOver()) {
        if (engine.getDiverted()) {
          console.log('Diverted active and game not over');
          findBestMove();
          if (playerEngineActiveCounter < 1) {
            setPlayerEngineActiveCounter((prev) => prev + 1);
          } else {
            setPlayerEngineActiveCounter(0);
            engine.setDiverted(false);
            setDiverted(false);
          }
        }

        if (ChessUtils.isSpecialMoveTurn(game.moveNumber(), 5)) {
          findBestMove();
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setMultiplierBestMove('');
            setMultiplierDecoyMove('');
            setShowAnswer(false);
          }, 400);
        }
      }
    } else {
      setMultiplierBestMove('');
      setMultiplierDecoyMove('');
      setShowAnswer(false);
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null; // Reset the ref
      }
    };
  }, [gamePosition, diverted]);

  function handleMessage() {
    if (true) {
      // put if/else logic in here for moves and messages
      setPlayerMessage('You captured a knight for a 2x multiplier!');
    }
    //every fourth game move
    if (game.moveNumber() % 4 == 3) {
      setEnemyMessage(boss.taunts[counter]);
      setCounter((prev) => (prev + 1) % 3); //3 dialogue options
    }
  }

  function makeRandomMove() {
    const randomMove = ChessUtils.getRandomMove(game);
    if(randomMove){
      if(ChessUtils.makeMove(game, randomMove)){
        setGamePosition(game.fen());
      };
      return true;
    } else {
      return false;
    }
  }

  function findRandomMove() {
    const possibleMoves = game.moves();
    if (possibleMoves.length === 0) {
      return;
    } else {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      try {
        const move = game.move(possibleMoves[randomIndex]);
        if (move === null) {
          //console.error('Invalid move from Stockfish:', bestMove);
          return;
        }
        // Update the board position
        setGamePosition(game.fen());
      } catch (error) {
        //console.error('Illegal move from Stockfish:', error);
      }
    }
  }

  function findBestMove() {
    engine.evaluatePosition(game.fen(), boss.depth);
    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        try {
          // Parse the bestMove string (e.g., "e2e4" or "e7e8q")
          const from = bestMove.substring(0, 2);
          const to = bestMove.substring(2, 4);
          const promotion = bestMove.substring(4, 5); // Promotion piece (e.g., "q")
          // Make the move

          const piece = game.get(from as Square);
          //TODO: change this logic when implementing color switching
          if (piece && piece.color === 'w') {
            if(ChessUtils.isSpecialMoveTurn(game.moveNumber(), 5)){
              startShake(); //earthquake effect
              setMultiplierBestMove(bestMove);
              // Get a random move that is NOT equal to bestMove
              let decoyMove;
              const possibleMoves = game.moves({ verbose: true });
              do {
                const randomIndex = Math.floor(
                  Math.random() * possibleMoves.length
                );
                decoyMove = possibleMoves[randomIndex];
              } while (decoyMove.to === to && possibleMoves.length > 1);
              setMultiplierDecoyMove(decoyMove.lan);

              console.log(
                'white turn and multiplier squares set',
                multiplierBestMove,
                multiplierDecoyMove,
                bestMove,
                decoyMove
              );
            }

            if (engine.getDiverted()) {
              setBestPlayerMove(bestMove);

              const arrow = [
                [from as Square, to as Square, 'rgb(0, 128, 0)'],
              ] as Arrow[];
              setCustomArrows(arrow);
              console.log('white turn and best player move set');
            }
          } else {
            setCustomArrows([]);
            const move = game.move({
              from,
              to,
              promotion: promotion || undefined, // Only include promotion if it exists
            });
            if (move === null) {
              //console.error('Invalid move from Stockfish:', bestMove);
              return;
            }
            // Update the board position
            setGamePosition(game.fen());
          }
        } catch (error) {
          //console.error('Illegal move from Stockfish:', error);
        }
      }
    });
  }

  function setAttackedMessage() {
    setEnemyMessage(boss.attack);
  }

  function bossLogicCheck(turnNumber: number) {
    if (level === 1 || level === 2) {
      turnNumber % 6 < 3 ? setLevel(1) : setLevel(2);
    } else if (level === 3) {
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
    } else if (level === 4) {
      // consolelog(4)
    } else {
      console.log('else');
    }
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? 'q',
      });
      setGamePosition(game.fen());
      // If the move is invalid, return false
      if (move === null) {
        return false;
      }

      // exit if the game is over
      if (game.isGameOver()) return false;
      handleMessage();

      //handle multiplier/decoy logic
      //cases for mult turn: lands on multiplier square with right piece
      //lands on multiplier square with wrong piece
      // other square
      if (ChessUtils.isSpecialMoveTurn(game.moveNumber(), 5)) {
        if (targetSquare === multiplierBestMove.substring(2, 4)) {
          setFlipBorderAnswerColors(false);
          if (sourceSquare === multiplierBestMove.substring(0, 2)) {
            setMultiplier(multiplier + 1);
            console.log('updating multiplier');
          } else {
            //right square but with wrong piece
            setFlipBorderAnswerColors(true);
          }
        }
        setShowAnswer(true);
      } else {
        console.log(
          'multiplier false comparison',
          sourceSquare,
          targetSquare,
          multiplierBestMove.substring(0, 2),
          multiplierBestMove.substring(2, 4)
        );
      }

      //adds attack button logic
      bossLogicCheck(game.moveNumber());

      if (engine.getAttacked()) {
        setAttackedMessage();
        makeRandomMove();
        engine.setAttacked(false);
      } else {
        findBestMove();
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className={`${isShaking ? 'animate-short-earthquake' : ''}`}>
      <CardRetro className='text-center'>
        <Chessboard
          id='PlayVsStockfish'
          position={gamePosition}
          onPieceDrop={onDrop}
          boardOrientation='white'
          customArrows={customArrows}
          customSquareStyles={{
            [multiplierBestMove.substring(2, 4)]: {
              backgroundImage: "url('/img/multiplier1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: showAnswer
                ? flipBorderAnswerColors
                  ? '2px solid red'
                  : '2px solid green'
                : 'none',
              animation: showAnswer
                ? 'short-earthquake 0.3s ease-in-out'
                : 'none',
            },
            [multiplierDecoyMove.substring(2, 4)]: {
              backgroundImage: "url('/img/multiplier2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: showAnswer
                ? flipBorderAnswerColors
                  ? '2px solid green'
                  : '2px solid red'
                : 'none',
              animation: showAnswer
                ? 'retroFlash 0.5s steps(4, end) infinite, retroShake 0.2s infinite'
                : 'none',
            },
          }}
          //arePremovesAllowed={true}
          //boardOrientation={'white'} //need to dynamically update this to random
          //showPromotionDialog={true}
          //customArrowColor={'rgb(255,170,0)'} //dynamically update this based on theme
          //customBoardStyle={e.g. { borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'}.} //
          customDarkSquareStyle={{ backgroundColor: uscf_board_theme[0] }}
          //customDropSquareStyle	object: { boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)' }
          customLightSquareStyle={{ backgroundColor: uscf_board_theme[1] }}
          customPieces={customPieces}
          //customPremoveDarkSquareStyle	object: { backgroundColor: '#A42323' }
          //customPremoveLightSquareStyle	object: { backgroundColor: '#BD2828' }
          //customSquareStyles	object: {}
          //animationDuration={200}
          //onSquareClick={onSquareClick}
          //onSquareRightClick={onSquareClick}
          //onPromotionPieceSelect={onPromotionPieceSelect}
          //promotionToSquare={moveTo}
          //showPromotionDialog={showPromotionDialog}
        />
      </CardRetro>
    </div>
  );
};
