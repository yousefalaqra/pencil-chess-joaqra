import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGameBoard } from '../core/guards/game-board.guard';
import { ChessFrameComponent } from './components/chess-frame/chess-frame.component';
import { GameBoardComponent } from './containers/game-board/game-board.component';
import { GameStarterComponent } from './containers/game-starter/game-starter.component';

const routes: Routes = [
  {
    path: '',
    component: GameStarterComponent,
  },
  {
    path: 'board',
    component: GameBoardComponent,
    canActivate: [CanActivateGameBoard],
  },
  {
      path: 'chess',
      component: ChessFrameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChessRoutingModule {}
