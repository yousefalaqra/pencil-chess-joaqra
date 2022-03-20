import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Injectable()
export class CanActivateWelcome implements CanActivate {
  constructor(private _playerService: PlayerService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return localStorage.getItem('playerId')
      ? this._router.navigate(['game'])
      : true;
  }
}
