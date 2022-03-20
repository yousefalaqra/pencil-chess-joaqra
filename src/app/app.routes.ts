import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGameStarter } from './core/guards/game-starter.guard';
import { CanActivateWelcome } from './core/guards/welcome.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'game',
    canActivateChild: [CanActivateGameStarter],
    loadChildren: () =>
      import('./chess/chess.module').then((m) => m.ChessModule),
  },
  {
    path: '',
    canActivate: [CanActivateWelcome],
    component: WelcomeComponent,
  },
  {path: '**',  pathMatch: 'full',redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
