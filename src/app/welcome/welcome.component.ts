import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../core/services/player.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  playerName: string = '';

  startGame$: Subscription;

  constructor(private _playerService: PlayerService, private _router: Router) {}

  ngOnInit(): void {
    this.startGame$ = this._playerService
      .getStartGame()
      .subscribe(() => this._router.navigate(['game']));
  }

  onCreatePlayer(): void {
    this._playerService.createNewPlayer(this.playerName);
  }

  ngOnDestroy(): void {
    this.startGame$.unsubscribe();
  }
}
