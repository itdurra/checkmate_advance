
/*!
 * Stockfish.js (http://github.com/nmrugg/stockfish.js)
 * License: GPL
 */

/*
 * Description of the universal chess interface (UCI)  https://gist.github.com/aliostad/f4470274f39d29b788c1b09519e67372/
 */

const stockfish = new Worker('/stockfish-nnue-16-single.js');

type EngineMessage = {
  /** stockfish engine message in UCI format*/
  uciMessage: string;
  /** found best move for current position in format `e2e4`*/
  bestMove?: string;
  /** found best move for opponent in format `e7e5` */
  ponder?: string;
  /**  material balance's difference in centipawns(IMPORTANT! stockfish gives the cp score in terms of whose turn it is)*/
  positionEvaluation?: string;
  /** count of moves until mate */
  possibleMate?: string;
  /** the best line found */
  pv?: string;
  /** number of halfmoves the engine looks ahead */
  depth?: number;
};

export default class Engine {
  stockfish: Worker;
  onMessage: (callback: (messageData: EngineMessage) => void) => void;
  isReady: boolean;
  currentSkillLevel: number;
  currentLimitStrength: boolean;
  currentElo: number;
  attacked: boolean;
  diverted: boolean;


  constructor() {
    this.stockfish = stockfish;
    this.isReady = false;
    this.onMessage = (callback) => {
      this.stockfish.addEventListener("message", (e) => {
        callback(this.transformSFMessageData(e));
      });
    };
    this.currentSkillLevel = 20; //stockfish default
    this.currentLimitStrength = false; //stockfish default
    this.currentElo = 2850; //stockfish default
    this.attacked = false; //flag for engine being attacked
    this.diverted = false; //engine arrow for player move


    this.init();
  }

  private transformSFMessageData(e: MessageEvent<any>) {
    const uciMessage = e?.data ?? e;

    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/score cp\s+(-?\d+)/)?.[1],
      possibleMate: uciMessage.match(/score mate\s+(-?\d+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1], 
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1]) ?? 0,
    };
  }

  init() {
    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === "readyok") {
        this.isReady = true;
      }
    });
  }

  onReady(callback: () => void) {
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === "readyok") {
        callback();
      }
    });
  }

  evaluatePosition(fen: string, depth: number) {
    if (depth > 24) depth = 24;

    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }

  stop() {
    this.stockfish.postMessage("stop"); // Run when searching takes too long time and stockfish will return you the bestmove of the deep it has reached
  }

  terminate() {
    this.isReady = false;
    this.stockfish.postMessage("quit"); // Run this before chessboard unmounting.
  }

  setAttacked(value: boolean) {
    this.attacked = value;
  }

  getAttacked() {
    return this.attacked;
  }

  setDiverted(value: boolean) {
    this.diverted = value;
  }

  getDiverted() {
    return this.diverted;
  }

  setSkillLevel(level: number) {
    if (level < 0 || level > 20) {
      throw new Error("Skill level must be between 0 and 20.");
    }
    this.stockfish.postMessage(`setoption name Skill Level value ${level}`);
    this.currentSkillLevel = level;
  };

  enableLimitStrength(enable: boolean) {
    this.stockfish.postMessage(`setoption name UCI_LimitStrength value ${enable}`);
    this.currentLimitStrength = enable;
  };

  setEloRating(elo: number) {
    if (elo < 1350 || elo > 2850) {
      throw new Error("Elo rating must be between 1350 and 2850.");
    }
    this.stockfish.postMessage(`setoption name UCI_Elo value ${elo}`);
    this.currentElo = elo;
  };

  getCurrentConfig() {
    return {
      skillLevel: this.currentSkillLevel,
      limitStrength: this.currentLimitStrength,
      elo: this.currentElo,
      attacked: this.attacked,
      diverted: this.diverted,
    };
  }
}