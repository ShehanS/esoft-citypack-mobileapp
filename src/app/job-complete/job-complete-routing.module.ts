import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobCompletePage } from './job-complete.page';

const routes: Routes = [
  {
    path: '',
    component: JobCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobCompletePageRoutingModule {}
