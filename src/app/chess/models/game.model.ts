import { GameStatus } from '../enums/game-status.enum';
import { GamePlayerModel } from './game-player.model';
import { MoveModel } from './move.model';

export class GameModel {
  gameId: string;
  status: GameStatus;
  crtDate: number;
  startTime?: number;
  endTime?: number;
  firstPlayer: GamePlayerModel;
  secondPlayer?: GamePlayerModel;
  moves: Array<MoveModel>;
  currentTurn?: string;
  starter?: string
  rematch: Array<string>;
}
