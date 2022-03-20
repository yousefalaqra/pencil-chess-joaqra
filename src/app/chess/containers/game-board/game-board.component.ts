import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { GameStatus } from '../../enums/game-status.enum';
import { MessageType } from '../../enums/message-type.enum';
import { GamePlayerModel } from '../../models/game-player.model';
import { MoveModel } from '../../models/move.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chessFrame') chessFrame: ElementRef;
  chessIframeWindow: Window;

  @HostListener('window:message', ['$event'])
  onMessage(e: any) {
    let data = e.data;
    if (data.for == 'board') {
      switch (data.type) {
        case MessageType.move:
          this.onMoveMessageHandler(data.payload);
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    localStorage.setItem('setMoves', 'true');
    // return false;
  }

  chessFrameUrl: string = environment.frameUrl;

  hasWhite: boolean;
  hasTurn: 'b' | 'w';
  gameStatus: GameStatus;
  subscriptions: Array<Subscription> = [];

  gameKey: string;
  playerId: string;

  firstPlayer: GamePlayerModel;
  secondPlayer: GamePlayerModel;

  moves: Array<MoveModel> = [];

  starterPlayer: string;

  secondPlayerJoined: boolean = false;

  massager: Window;

  rematchPLayersIds: Array<string>;

  constructor(
    private _service: GameService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  onLoadFrame(event: any): void {
    setTimeout(() => {
      this.subscriptions.push(
        this._service.getFirstPlayer(this.gameKey).subscribe((player) => {
          if (player) {
            if(player.leftGame) this._service.updateGameStatus(this.gameKey, GameStatus.abounded)
            this.chessIframeWindow.postMessage(
              { for: 'frame', type: MessageType.firstPlayer, payload: player },
              this.chessFrameUrl
            );

            this.chessIframeWindow.postMessage(
              {
                for: 'frame',
                type: MessageType.playerId,
                payload: this.playerId,
              },
              this.chessFrameUrl
            );
          }
        }),

        this._service.getSecondPlayer(this.gameKey).subscribe((player) => {
          if (player) {
            if(player.leftGame) this._service.updateGameStatus(this.gameKey, GameStatus.abounded)
            this.chessIframeWindow.postMessage(
              { for: 'frame', type: MessageType.secondPlayer, payload: player },
              this.chessFrameUrl
            );
            this.chessIframeWindow.postMessage(
              {
                for: 'frame',
                type: MessageType.playerId,
                payload: this.playerId,
              },
              this.chessFrameUrl
            );
          }
        }),

        this._service.getGameStatus(this.gameKey).subscribe((status) => {
          if (status == GameStatus.started)
            this.chessIframeWindow.postMessage(
              {
                for: 'frame',
                type: MessageType.startGame,
                payload: false,
              },
              this.chessFrameUrl
            );

          if (status == GameStatus.rematchStart)
            this.chessIframeWindow.postMessage(
              {
                for: 'frame',
                type: MessageType.startGame,
                payload: true,
              },
              this.chessFrameUrl
            );
        }),

        this._service.getGameMoves(this.gameKey).subscribe((moves) => {
          let lastMove = moves[moves.length - 1];

          if (localStorage.getItem('setMoves') == 'true') {
            moves.forEach((x) => {
              this.updateBoard(x);
            });

            localStorage.setItem('setMoves', 'false');
          } else {
            if (moves.length > this.moves.length) {
              this.updateBoard(lastMove);
            }
          }
          if (lastMove) {
            this.chessIframeWindow.postMessage(
              {
                for: 'frame',
                type: MessageType.switchTurn,
                payload: lastMove.color,
              },
              this.chessFrameUrl
            );

            this.checkEndOfGame(lastMove);
          }
        })
      );
    }, 3000);
  }
  ngOnInit(): void {
    this.gameKey = localStorage.getItem('gameKey') as string;
    this.playerId = localStorage.getItem('playerId') as string;

    this.subscriptions.push(
      this._service.getFirstPlayer(this.gameKey).subscribe((player) => {
        this.firstPlayer = player as GamePlayerModel;
      }),

      this._service.getSecondPlayer(this.gameKey).subscribe((player) => {
        this.secondPlayer = player as GamePlayerModel;
      }),

      this._service.getGameStatus(this.gameKey).subscribe((status) => {
        this.gameStatus = status as GameStatus;

        if (status == GameStatus.toss) this.createToss();

        if (status == GameStatus.checkMate || status == GameStatus.draw)
          this.sendDisableBoardMessage();
      }),

      this._service.getGameRematch(this.gameKey).subscribe((x) => {
        this.rematchPLayersIds = x;

        if (x.length == 1)
          this._service.updateGameStatus(
            this.gameKey,
            GameStatus.rematchRequest
          );

        if (x.length == 2) {
          this._service.updateGameStatus(this.gameKey, GameStatus.swapColors);
          this.swapPlayersColors();
        }
      })
    );
  }

  createToss() {
    let toss: 0 | 1 = Math.round(Math.random()) as 0 | 1;

    this._service.decidedStarterPlayer(this.gameKey, toss);
  }

  checkEndOfGame(lastMove: MoveModel) {
    if (lastMove.checkmate) {
      this._service.updateGameStatus(this.gameKey, GameStatus.checkMate);
    }

    if (lastMove.stalemate) {
      this._service.updateGameStatus(this.gameKey, GameStatus.draw);
    }
  }

  sendDisableBoardMessage(): void {
    this.chessIframeWindow.postMessage(
      { for: 'frame', type: MessageType.endGame, payload: {} },
      this.chessFrameUrl
    );
  }

  ngAfterViewInit(): void {
    let nativeFrameElement: HTMLElement = this.chessFrame.nativeElement;
    this.chessIframeWindow = (<HTMLIFrameElement>nativeFrameElement)
      .contentWindow as Window;

    nativeFrameElement.onload = (e) => {
      this.onLoadFrame(e);
    };

    // this.chessIframeWindow.addEventListener('message', )
  }

  updateBoard(move: MoveModel): void {
    this.moves.push(move);
    this.chessIframeWindow.postMessage(
      { for: 'frame', type: MessageType.move, payload: move },
      this.chessFrameUrl
    );
  }

  onMoveMessageHandler(move: MoveModel) {
    console.log('move: ', move);
    if (move.stalemate == undefined) move.stalemate = false;
    this.moves.push(move);
    this._service.addMove(this.gameKey, move);
  }

  onCopyCode(): void {
    this._snackBar.open('Code copied', undefined, { duration: 3000 });
  }

  onRematch(): void {
    this._service.onRematch(this.gameKey, this.playerId);
  }

  onLeaveGame(): void {
    if (this.playerId == this.firstPlayer.playerId) {
      this._service.removeFirstPlayer(this.gameKey);
      localStorage.setItem('gameKey', '');
      this._router.navigate(['game']);
    }

    if (this.playerId == this.secondPlayer.playerId) {
      this._service.removeSecondPlayer(this.gameKey);
      localStorage.setItem('gameKey', '');
      this._router.navigate(['game']);
    }
  }

  swapPlayersColors(): void {
    if (this.firstPlayer.color == 'black') {
      this._service.updateFirstPlayerColor(this.gameKey, 'white');
      this._service.updateSecondPlayerColor(this.gameKey, 'black');
    } else {
      this._service.updateFirstPlayerColor(this.gameKey, 'black');
      this._service.updateSecondPlayerColor(this.gameKey, 'white');
    }
    this._service.updateGameStatus(this.gameKey, GameStatus.rematchStart);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
