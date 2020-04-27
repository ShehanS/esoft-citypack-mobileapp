import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideNavPage } from './slide-nav.page';

const routes: Routes = [
  {
    path: '',
    component: SlideNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideNavPageRoutingModule {}
