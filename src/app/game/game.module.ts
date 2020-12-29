import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { MechanismListComponent } from './mechanism-list/mechanism-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [GameComponent, MechanismListComponent],
  imports: [
    GameRoutingModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class GameModule { }
