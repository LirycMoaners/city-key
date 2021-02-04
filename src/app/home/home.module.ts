import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScenarioDialogComponent } from './scenario-dialog/scenario-dialog.component';
import { FilterScenarioDialogComponent } from './filter-scenario-dialog/filter-scenario-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    ScenarioDialogComponent,
    FilterScenarioDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
