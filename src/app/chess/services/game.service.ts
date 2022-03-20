import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';

import { GameStatus } from '../enums/game-status.enum';
import { GamePlayerModel } from '../models/game-player.model';
import { GameModel } from '../models/game.model';
import { MoveModel } from '../models/move.model';

@Injectable()
export class GameService {
  private gameDbPath = '/games';
  // private gamesListFireRef: AngularFireList<GameModel>;

  gameKey$ = new BehaviorSubject<string>('');

  constructor(private _db: AngularFireDatabase) {}

  getGameData(key: string): Observable<GameModel | null> {
    return this._db
      .object<GameModel>(`${this.gameDbPath}/${key}`)
      .valueChanges();
  }

  getGameStatus(key: string): Observable<GameStatus | null> {
    return this._db
      .object<GameStatus>(`${this.gameDbPath}/${key}/status`)
      .valueChanges();
  }

  getGameStarter(key: string): Observable<string | null> {
    return this._db
      .object<string>(`${this.gameDbPath}/${key}/starter`)
      .valueChanges();
  }

  getGameMoves(key: string): Observable<Array<MoveModel>> {
    return this._db
      .list<MoveModel>(`${this.gameDbPath}/${key}/moves`)
      .valueChanges();
  }

  getSecondPlayer(key: string): Observable<GamePlayerModel | null> {
    return this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/secondPlayer`)
      .valueChanges();
  }

  getFirstPlayer(key: string): Observable<GamePlayerModel | null> {
    return this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/firstPlayer`)
      .valueChanges();
  }

  getCurrentTurn(key: string): Observable<string | null> {
    return this._db
      .object<string>(`${this.gameDbPath}/${key}/currentTurn`)
      .valueChanges();
  }

  getGameRematch(key: string): Observable<Array<string>> {
    return this._db
      .list<string>(`${this.gameDbPath}/${key}/rematch`)
      .valueChanges();
  }

  createGame(): void {
    let game: GameModel = {
      gameId: this._db.createPushId(),
      firstPlayer: {
        playerId: localStorage.getItem('playerId') as string,
        playerName: localStorage.getItem('playerName') as string,
      },
      crtDate: Date.now(),
      status: GameStatus.pending,
      moves: [],
      rematch: [],
    };
    let gameKey = this._db.list(this.gameDbPath).push(game).key;

    this.setGameKey(gameKey as string);
  }

  joinGame(gameKey: string) {
    this.setGameKey(gameKey);

    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${gameKey}/secondPlayer`)
      .update({
        playerId: localStorage.getItem('playerId') as string,
        playerName: localStorage.getItem('playerName') as string,
      });

    this.updateGameStatus(gameKey, GameStatus.toss);
  }

  setGameKey(key: string): void {
    this.gameKey$.next(key);
    localStorage.setItem('gameKey', key);
  }

  updateGameStatus(gameKey: string, status: GameStatus): void {
    this._db.object<GameModel>(`${this.gameDbPath}/${gameKey}`).update({
      status: status,
      startTime: Date.now(),
    });
  }

  addMove(gameKey: string, move: MoveModel) {
    this._db.list(`${this.gameDbPath}/${gameKey}/moves`).push(move);
  }

  removeFirstPlayer(key: string) {
    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/firstPlayer`)
      .update({
        leftGame: true,
      });
  }

  removeSecondPlayer(key: string) {
    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/secondPlayer`)
      .update({
        leftGame: true,
      });
  }

  decidedStarterPlayer(key: string, toss: 0 | 1) {
    let firstPlayerColor: 'white' | 'black' = toss == 0 ? 'white' : 'black';
    let secondPlayerColor: 'white' | 'black' = toss == 1 ? 'white' : 'black';

    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/firstPlayer`)
      .update({
        color: firstPlayerColor,
      });

    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/secondPlayer`)
      .update({
        color: secondPlayerColor,
      });
    this.updateGameStatus(key, GameStatus.started);
  }

  updateFirstPlayerColor(key: string, color: 'black' | 'white') {
    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/firstPlayer`)
      .update({
        color: color,
      });
  }

  updateSecondPlayerColor(key: string, color: 'black' | 'white') {
    this._db
      .object<GamePlayerModel>(`${this.gameDbPath}/${key}/secondPlayer`)
      .update({
        color: color,
      });
  }

  onRematch(gameKey: string, playerId: string): void {
    this._db.list(`${this.gameDbPath}/${gameKey}/rematch`).push(playerId);
  }
}
