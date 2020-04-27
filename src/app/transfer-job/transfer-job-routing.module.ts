import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferJobPage } from './transfer-job.page';

const routes: Routes = [
  {
    path: '',
    component: TransferJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferJobPageRoutingModule {}
