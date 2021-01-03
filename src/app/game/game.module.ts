import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { MechanismListComponent } from './mechanism-list/mechanism-list.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [GameComponent, MechanismListComponent],
  imports: [
    GameRoutingModule,
    CommonModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class GameModule { }
