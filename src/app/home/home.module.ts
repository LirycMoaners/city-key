import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScenarioDialogComponent } from './scenario-list/scenario-dialog/scenario-dialog.component';
import { FilterScenarioDialogComponent } from './scenario-list/filter-scenario-dialog/filter-scenario-dialog.component';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';
import { CreationListComponent } from './creation-list/creation-list.component';
import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    HomeComponent,
    ScenarioDialogComponent,
    FilterScenarioDialogComponent,
    ScenarioListComponent,
    CreationListComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
