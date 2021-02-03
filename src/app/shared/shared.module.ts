import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ItemIconPipe } from './pipes/item-icon.pipe';
import { MechanismIconPipe } from './pipes/mechanism-icon.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    ItemIconPipe,
    MechanismIconPipe,
    EnumToArrayPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSliderModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    ItemIconPipe,
    MechanismIconPipe,
    EnumToArrayPipe
  ]
})
export class SharedModule { }
