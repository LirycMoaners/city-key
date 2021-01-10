import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { MechanismListComponent } from './mechanism-list/mechanism-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { InventoryComponent } from './inventory/inventory.component';
import { NumberLockMechanismComponent } from './mechanism-list/number-lock-mechanism/number-lock-mechanism.component';
import { WheelPickerComponent } from './mechanism-list/number-lock-mechanism/wheel-picker/wheel-picker.component';



@NgModule({
  declarations: [
    GameComponent,
    MechanismListComponent,
    InventoryComponent,
    NumberLockMechanismComponent,
    WheelPickerComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule,
    GoogleMapsModule,
    SharedModule,
  ]
})
export class GameModule { }
