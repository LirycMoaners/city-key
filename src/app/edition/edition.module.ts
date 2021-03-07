import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionComponent } from './edition.component';
import { EditionRoutingModule } from './edition-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditionInfoComponent } from './edition-info/edition-info.component';



@NgModule({
  declarations: [EditionComponent, EditionInfoComponent],
  imports: [
    EditionRoutingModule,
    SharedModule
  ]
})
export class EditionModule { }
