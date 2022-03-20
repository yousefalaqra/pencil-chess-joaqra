import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MiniMaterialModule } from '../shared/mini-material.module';
import { ChessRoutingModule } from './chess.routes';
import { GameStarterComponent } from './containers/game-starter/game-starter.component';
import { GameService } from './services/game.service';
import { GameBoardComponent } from './containers/game-board/game-board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { CommonModule } from '@angular/common';
import { CanActivateGameBoard } from '../core/guards/game-board.guard';
import { ChessFrameComponent } from './components/chess-frame/chess-frame.component';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SafePipe } from './pipes/safe.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MirrorPlayersNameComponent } from './components/mirror-players-name/mirror-players-name.component';

@NgModule({
  declarations: [
    GameStarterComponent,
    GameBoardComponent,
    ChessFrameComponent,
    SafePipe,
    MirrorPlayersNameComponent,
  ],
  providers: [GameService, CanActivateGameBoard],
  imports: [
    ChessRoutingModule,
    MiniMaterialModule,
    FormsModule,
    NgxChessBoardModule,
    CommonModule,
    MatIconModule,
    ClipboardModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
})
export class ChessModule {}
