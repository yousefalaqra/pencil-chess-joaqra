import { MoveChange } from 'ngx-chess-board';

export class MoveModel implements MoveChange {
  move: string;
  piece: string;
  color: 'white' | 'black';
  x: boolean;
  check: boolean;
  stalemate: boolean;
  mate: boolean;
  checkmate: boolean;
  fen: string;
  pgn: any;
  freeMode: boolean;
}
