import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { MechanismListComponent } from './mechanism-list/mechanism-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { InventoryComponent } from './inventory/inventory.component';
import { NumberLockComponent } from './mechanism-list/number-lock/number-lock.component';
import { WheelPickerComponent } from './mechanism-list/number-lock/wheel-picker/wheel-picker.component';
import { ItemComponent } from './inventory/item/item.component';
import { StepDialogComponent } from './step-dialog/step-dialog.component';
import { LockComponent } from './mechanism-list/lock/lock.component';
import { ResembleComponent } from './mechanism-list/resemble/resemble.component';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  declarations: [
    GameComponent,
    MechanismListComponent,
    InventoryComponent,
    ItemComponent,
    NumberLockComponent,
    WheelPickerComponent,
    LockComponent,
    StepDialogComponent,
    ResembleComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule,
    GoogleMapsModule,
    WebcamModule,
    SharedModule,
  ]
})
export class GameModule { }
