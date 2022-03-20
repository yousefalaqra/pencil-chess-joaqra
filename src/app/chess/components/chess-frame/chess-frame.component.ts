import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxChessBoardView } from 'ngx-chess-board';
import { WindowRef } from 'src/app/core/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { MessageType } from '../../enums/message-type.enum';
import { GamePlayerModel } from '../../models/game-player.model';
import { MoveModel } from '../../models/move.model';

@Component({
  selector: 'app-chess-frame',
  templateUrl: './chess-frame.component.html',
  styleUrls: ['./chess-frame.component.scss'],
})
export class ChessFrameComponent implements OnInit {
  @HostListener('window:message', ['$event'])
  onMessage(e: any) {
    let data = e.data;
    if (data.for == 'frame') {
      switch (data.type) {
        case MessageType.playerId:
          this.playerIdMessageHandler(data.payload);
          break;

        case MessageType.firstPlayer:
          this.firstPlayerMessageHandler(data.payload);
          break;

        case MessageType.secondPlayer:
          this.secondPlayerMessageHandler(data.payload);
          break;

        case MessageType.startGame:
          this.startGameMessageHandler(data.payload);
          break;

        case MessageType.move:
          this.addMoveMessageHandler(data.payload);
          break;

        case MessageType.switchTurn:
          this.onSwitchTurn(data.payload);
          break;

        case MessageType.endGame:
          this.endGameMessageHandler();
          break;
      }
    }
  }

  @ViewChild('board', { static: false }) board: NgxChessBoardView;

  @ViewChild('chessFrame') chessFrame: ElementRef;
  chessIframeWindow: Window;

  lightDisabled: boolean = true;
  darkDisabled: boolean = true;
  boardDisabled: boolean = true;

  boardUrl = environment.boardUrl;

  playerId: string;

  firstPlayer: GamePlayerModel;
  secondPlayer: GamePlayerModel;

  starterPlayer: string;

  // hasTurn: 'white' | 'black' = 'white';
  hasTurn: boolean = false;

  playerColor: 'black' | 'white';

  constructor(private _window: WindowRef) {}

  ngOnInit(): void {}

  onMoveChange(event: any): void {
    this._window.nativeWindow.top?.postMessage(
      {
        for: 'board',
        type: MessageType.move,
        payload: event,
      },
      this.boardUrl
    );
  }

  playerIdMessageHandler(playerId: string) {
    this.playerId = playerId;
  }

  firstPlayerMessageHandler(player: GamePlayerModel): void {
    this.firstPlayer = player;

    this.flipBoard(player);
  }

  secondPlayerMessageHandler(player: GamePlayerModel): void {
    this.secondPlayer = player;
    this.flipBoard(player);
  }

  flipBoard(player: GamePlayerModel): void {
    if (player.playerId == this.playerId && player.color == 'black') {
      // this.board.reverse();
    }
  }

  addMoveMessageHandler(move: MoveModel): void {
    this.board.move(move.move);

    this.hasTurn = !this.hasTurn;
  }

  onSwitchTurn(color: 'black' | 'white'): void {
    if (this.firstPlayer.playerId == this.playerId) {
      if (this.firstPlayer.color == color) {
        this.hasTurn = false;
      } else {
        this.hasTurn = true;
      }
    }

    if (this.secondPlayer.playerId == this.playerId) {
      if (this.secondPlayer.color == color) {
        this.hasTurn = false;
      } else {
        this.hasTurn = true;
      }
    }
  }

  startGameMessageHandler(resetBoard: boolean): void {
    this.boardDisabled = false;

    if (resetBoard) this.board.reset();
    if (
      this.firstPlayer.color == 'white' &&
      this.playerId == this.firstPlayer.playerId
    ) {
      this.hasTurn = true;
      this.playerColor = 'white';
    } else if (
      this.firstPlayer.color == 'black' &&
      this.playerId == this.firstPlayer.playerId
    ) {
      this.playerColor = 'black';
      this.hasTurn = false;
      this.board.reverse();
    }

    if (
      this.secondPlayer.color == 'white' &&
      this.playerId == this.secondPlayer.playerId
    ) {
      this.hasTurn = true;
      this.playerColor = 'white';
    } else if (
      this.secondPlayer.color == 'black' &&
      this.playerId == this.secondPlayer.playerId
    ) {
      this.playerColor = 'black';
      this.hasTurn = false;
      this.board.reverse();
    }
  }

  endGameMessageHandler(): void {
    this.boardDisabled = true;
  }
}
