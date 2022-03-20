import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';
import { Observable, Subject } from 'rxjs';
import { PlayerModel } from '../models/player.model';

@Injectable()
export class PlayerService {
  private playerDbPath = '/players';
  private playersListFireRef: AngularFireList<PlayerModel>;

  private startGame = new Subject<boolean>();

  constructor(private _db: AngularFireDatabase) {
    this.playersListFireRef = this._db.list(this.playerDbPath);
  }

  getPlayerId(): string | null {
    return localStorage.getItem('playerId');
  }

  getPlayerName(): string | null {
    return localStorage.getItem('playerName');
  }

  getStartGame(): Observable<boolean> {
    return this.startGame.asObservable();
  }

  createNewPlayer(name: string): void {
    let playerModel: PlayerModel = {
      playerId: this._db.createPushId(),
      playerName: name,
    };

    this.playersListFireRef
      .push(playerModel)
      .then((firebaseResult: DatabaseReference) => {
        localStorage.setItem('playerId', firebaseResult.key as string);
        localStorage.setItem('playerName', playerModel.playerName as string);
        this.startGame.next(true);
      });
  }
}
