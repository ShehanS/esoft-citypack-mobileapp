import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourierPageRoutingModule } from './courier-routing.module';

import { CourierPage } from './courier.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    CourierPageRoutingModule
  ],
  declarations: [CourierPage]
})
export class CourierPageModule {}
