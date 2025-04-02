/*!
 * Stockfish.js (http://github.com/nmrugg/stockfish.js)
 * License: GPL
 */

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
  public attacked: boolean;
  public diverted: boolean;

  constructor() {
    this.stockfish = null;
    this.messageCallbacks = [];
    this.isReady = false;
    this.currentSkillLevel = 20;
    this.currentLimitStrength = false;
    this.currentElo = 2850;
    this.attacked = false;
    this.diverted = false;

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

  public evaluatePosition(fen: string, depth: number = 18): void {
    if (depth > 24) depth = 24;
    this.sendCommand(`position fen ${fen}`);
    this.sendCommand(`go depth ${depth}`);
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

  // ... (rest of your methods remain the same)


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
    this.stockfish?.postMessage(`setoption name Skill Level value ${level}`);
    this.currentSkillLevel = level;
  };

  enableLimitStrength(enable: boolean) {
    this.stockfish?.postMessage(`setoption name UCI_LimitStrength value ${enable}`);
    this.currentLimitStrength = enable;
  };

  setEloRating(elo: number) {
    if (elo < 1350 || elo > 2850) {
      throw new Error("Elo rating must be between 1350 and 2850.");
    }
    this.stockfish?.postMessage(`setoption name UCI_Elo value ${elo}`);
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