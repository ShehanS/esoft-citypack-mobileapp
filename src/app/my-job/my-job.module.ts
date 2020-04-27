import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyJobPageRoutingModule } from './my-job-routing.module';

import { MyJobPage } from './my-job.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    MyJobPageRoutingModule
  ],
  declarations: [MyJobPage]
})
export class MyJobPageModule {}
