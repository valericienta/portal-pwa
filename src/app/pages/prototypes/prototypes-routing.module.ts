import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrototypesPage } from './prototypes.page';

const routes: Routes = [
  {
    path: '',
    component: PrototypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrototypesPageRoutingModule {}
