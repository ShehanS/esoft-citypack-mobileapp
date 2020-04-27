import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanningModulePage } from './scanning-module.page';

const routes: Routes = [
  {
    path: '',
    component: ScanningModulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanningModulePageRoutingModule {}
