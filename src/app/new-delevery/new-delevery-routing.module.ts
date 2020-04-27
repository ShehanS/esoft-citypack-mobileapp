import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDeleveryPage } from './new-delevery.page';

const routes: Routes = [
  {
    path: '',
    component: NewDeleveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDeleveryPageRoutingModule {}
