import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionComponent } from './edition.component';
import { EditionRoutingModule } from './edition-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditionMarkersComponent } from './edition-markers/edition-markers.component';



@NgModule({
  declarations: [EditionComponent, EditionMarkersComponent],
  imports: [
    EditionRoutingModule,
    SharedModule
  ]
})
export class EditionModule { }
