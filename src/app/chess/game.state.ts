import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameStatus } from './enums/game-status.enum';

@Injectable()
export class GameState {
  private gameStatus = new BehaviorSubject<GameStatus>(GameStatus.pending);
  private isWhite = new BehaviorSubject<boolean>(true);
  private hasTurn = new BehaviorSubject<boolean>(true);

  private gameKey = new BehaviorSubject<string>('');

  getGameStatus(): Observable<GameStatus> {
    return this.gameStatus.asObservable();
  }

  getIsWhite(): Observable<boolean> {
    return this.isWhite.asObservable();
  }

  getGameKey(): Observable<string> {
    return this.gameKey.asObservable();
  }

  getHasTurn(): Observable<boolean> {
    return this.hasTurn.asObservable();
  }

  setGameStatus(status: GameStatus): void {
    this.gameStatus.next(status);
  }

  setIsWhite(value: boolean): void {
    this.isWhite.next(value);
  }

  setHasTurn(value: boolean): void {
    this.hasTurn.next(value);
  }

  setGameKey(key: string): void {
    this.gameKey.next(key);
  }
}
