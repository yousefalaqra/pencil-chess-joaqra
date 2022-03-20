import { NgModule } from '@angular/core';
import { CanActivateGameBoard } from './guards/game-board.guard';
import { CanActivateGameStarter } from './guards/game-starter.guard';
import { CanActivateWelcome } from './guards/welcome.guard';
import { PlayerService } from './services/player.service';
import { WindowRef } from './services/window-ref.service';

@NgModule({
  providers: [PlayerService, CanActivateGameStarter, CanActivateWelcome, WindowRef],
  imports: [],
  exports: []
})
export class CoreModule {}
