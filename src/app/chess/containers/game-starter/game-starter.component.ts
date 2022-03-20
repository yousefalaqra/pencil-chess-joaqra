import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GamePlayerModel } from '../../models/game-player.model';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-starter',
  templateUrl: './game-starter.component.html',
  styleUrls: ['./game-starter.component.scss'],
})
export class GameStarterComponent implements OnInit, OnDestroy {
  gameCode: string;

  gameKeySubscription: Subscription;

  constructor(private _gameService: GameService, private _router: Router) {}

  ngOnInit(): void {
    this.gameKeySubscription = this._gameService.gameKey$.subscribe((x) => {
      if (x) this._router.navigate(['game/board']);
    });
  }

  onCreateNewGame() {
    this._gameService.createGame();
  }

  onJoinGame() {
    this._gameService.joinGame(this.gameCode);
  }

  ngOnDestroy(): void {}
}
