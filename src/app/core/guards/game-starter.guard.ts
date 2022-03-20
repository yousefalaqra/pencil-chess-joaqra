import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Injectable()
export class CanActivateGameStarter implements CanActivateChild {
  constructor(private _playerService: PlayerService, private _router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this._playerService.getPlayerId() ||
      this._playerService.getPlayerName()
    ) {
      return true;
    } else {
      this._router.navigate(['']);

      return false;
    }
  }
}
