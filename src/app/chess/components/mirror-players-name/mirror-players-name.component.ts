import { Component, Input, OnInit } from '@angular/core';
import { GamePlayerModel } from '../../models/game-player.model';

@Component({
  selector: 'app-mirror-players-name',
  templateUrl: './mirror-players-name.component.html',
  styleUrls: ['./mirror-players-name.component.scss']
})
export class MirrorPlayersNameComponent implements OnInit {

  @Input() firstPlayer: GamePlayerModel;
  @Input() secondPlayer: GamePlayerModel;
  @Input() starter: string;
  @Input() playerId: string;
  constructor() { }

  ngOnInit(): void {
    console.log('object:', this.starter, this.playerId);
  }

}
