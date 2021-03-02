import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionComponent } from './edition.component';
import { EditionRoutingModule } from './edition-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EditionComponent],
  imports: [
    EditionRoutingModule,
    SharedModule
  ]
})
export class EditionModule { }
