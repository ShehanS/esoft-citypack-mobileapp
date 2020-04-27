import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { IonicModule } from '@ionic/angular';

import { ScanningModulePageRoutingModule } from './scanning-module-routing.module';

import { ScanningModulePage } from './scanning-module.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    NgxQRCodeModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ScanningModulePageRoutingModule
  ],
  declarations: [ScanningModulePage]
})
export class ScanningModulePageModule {}
