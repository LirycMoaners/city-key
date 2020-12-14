import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { MechanismListComponent } from './mechanism-list/mechanism-list.component';



@NgModule({
  declarations: [GameComponent, MechanismListComponent],
  imports: [
    GameRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class GameModule { }
