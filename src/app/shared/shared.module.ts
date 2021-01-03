import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ItemIconPipe } from './pipes/item-icon.pipe';
import { MechanismIconPipe } from './pipes/mechanism-icon.pipe';

@NgModule({
  declarations: [
    ItemIconPipe,
    MechanismIconPipe
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [
    GoogleMapsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    ItemIconPipe,
    MechanismIconPipe
  ]
})
export class SharedModule { }
