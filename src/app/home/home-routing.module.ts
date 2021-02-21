import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationListComponent } from './creation-list/creation-list.component';
import { HomeComponent } from './home.component';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'scenario-list'
      },
      {
        path: 'shop',
        component: ShopComponent,
        data: { animation: 'ShopPage', icon: 'store' }
      },
      {
        path: 'scenario-list',
        component: ScenarioListComponent,
        data: { animation: 'ScenarioListPage', icon: 'policy' }
      },
      {
        path: 'creation-list',
        component: CreationListComponent,
        data: { animation: 'CreationListPage', icon: 'design_services' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
