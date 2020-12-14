import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import {MechanismListComponent} from './mechanism-list/mechanism-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GameComponent
  },
  {
    path: 'mechanism_list',
    component: MechanismListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
