/*!
 * Stockfish.js (http://github.com/nmrugg/stockfish.js)
 * License: GPL
 */

import { Difficulty } from "@/types/difficulty";

type EngineMessage = {
  uciMessage: string;
  bestMove?: string;
  ponder?: string;
  positionEvaluation?: string;
  possibleMate?: string;
  pv?: string;
  depth?: number;
};

export default class Engine {
  private stockfish: Worker | null;
  private messageCallbacks: ((messageData: EngineMessage) => void)[];
  public isReady: boolean;
  public currentSkillLevel: number;
  public currentLimitStrength: boolean;
  public currentElo: number;
  public currentDepth: number;

  constructor() {
    this.stockfish = null;
    this.messageCallbacks = [];
    this.isReady = false;
    this.currentSkillLevel = 20;
    this.currentLimitStrength = false;
    this.currentElo = 2850;
    this.currentDepth = 10;

    if (typeof window !== 'undefined') {
      this.initializeEngine();
    }
  }

  private initializeEngine(): void {
    try {
      this.stockfish = new Worker('/stockfish-nnue-16-single.js');
      
      this.stockfish.onmessage = (e: MessageEvent) => {
        const messageData = this.transformSFMessageData(e);
        this.messageCallbacks.forEach(callback => callback(messageData));
        
        if (e.data === 'readyok') {
          this.isReady = true;
        }
      };

      this.stockfish.onerror = (error) => {
        console.error('Stockfish error:', error);
      };

      this.sendCommand('uci');
      this.sendCommand('isready');
    } catch (error) {
      console.error('Failed to initialize Stockfish:', error);
    }
  }

  private sendCommand(command: string): void {
    if (this.stockfish) {
      this.stockfish.postMessage(command);
    } else {
      console.warn('Stockfish not initialized - command not sent:', command);
    }
  }

  private transformSFMessageData(e: MessageEvent): EngineMessage {
    const uciMessage = e.data;
    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/score cp\s+(-?\d+)/)?.[1],
      possibleMate: uciMessage.match(/score mate\s+(-?\d+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1]) || 0,
    };
  }

  public onMessage(callback: (messageData: EngineMessage) => void): void {
    this.messageCallbacks.push(callback);
  }

  public onReady(callback: () => void): void {
    const readyCheck = (messageData: EngineMessage) => {
      if (messageData.uciMessage === 'readyok') {
        callback();
        // Remove this listener after it's triggered
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== readyCheck);
      }
    };
    this.onMessage(readyCheck);
  }

  public evaluatePosition(fen: string): void {
    this.sendCommand(`position fen ${fen}`);
    this.sendCommand(`go depth ${this.currentDepth}`);
  }

  public stop(): void {
    this.sendCommand('stop');
  }

  public terminate(): void {
    this.isReady = false;
    this.sendCommand('quit');
    if (this.stockfish) {
      this.stockfish.terminate();
      this.stockfish = null;
    }
  }

public setBossLevel(
  level: number, 
  newGamePlus: number, // NG+ cycles (0 = first playthrough)
  difficulty: Difficulty
) {
  if (level < 1 || level > 9) throw new Error("Boss level must be 1-9.");

  // Base scaling (adjust these arrays to fine-tune balance)
  const skillLevels = {
    easy:   [0, 1, 2, 3, 4, 5, 5, 5, 5],
    medium: [0, 2, 4, 7, 9, 9, 9, 9, 9],
    hard:   [4, 15, 16, 17, 18, 19, 20, 20, 20]
  };

  const defaultDepths = {
    easy:   [1, 2, 3, 4, 6, 8, 10, 10, 10],
    medium: [1, 3, 5, 8, 10, 10, 10, 10, 10],
    hard:   [4, 8, 10, 10, 10, 10, 10, 10, 10]
  };

  let skill = 10;
  let depth = 10;
  let levelNG = level;
  if(newGamePlus > 0){
    levelNG = 9; //set to max difficulty on difficulty track
  }
  if(difficulty === 'easy'){
    skill = skillLevels.easy[levelNG - 1];
    depth = defaultDepths.easy[levelNG - 1];
  } else if(difficulty === 'medium'){
    skill = skillLevels.medium[levelNG - 1];
    depth = defaultDepths.medium[levelNG - 1];
  } else {
    skill = skillLevels.hard[levelNG - 1];
    depth = defaultDepths.hard[levelNG - 1];
  }

  // Configure engine
  this.enableLimitStrength(false); // Disable Elo to use Skill Level
  this.setSkillLevel(skill);
  this.currentDepth = depth;
}

  public setSkillLevel(level: number) {
    if (level < 0 || level > 20) {
      throw new Error("Skill level must be between 0 and 20.");
    }
    this.stockfish?.postMessage(`setoption name Skill Level value ${level}`);
    this.currentSkillLevel = level;
  };

  public enableLimitStrength(enable: boolean) {
    this.stockfish?.postMessage(`setoption name UCI_LimitStrength value ${enable}`);
    this.currentLimitStrength = enable;
  };

  public setEloRating(elo: number) {
    if (elo < 1350 || elo > 2850) {
      throw new Error("Elo rating must be between 1350 and 2850.");
    }
    this.stockfish?.postMessage(`setoption name UCI_Elo value ${elo}`);
    this.currentElo = elo;
  };

  public getCurrentConfig() {
    return {
      skillLevel: this.currentSkillLevel,
      limitStrength: this.currentLimitStrength,
      elo: this.currentElo,
    };
  }

  public dumpUCIOptions() {
    this.sendCommand("uci"); // Logs all available UCI options
    this.onMessage((msg) => {
      if (msg.uciMessage.startsWith("option")) {
        console.log(msg.uciMessage); // Prints all engine options
      }
    });
  }
}