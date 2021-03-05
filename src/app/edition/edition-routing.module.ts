import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditionComponent } from './edition.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditionRoutingModule { }
