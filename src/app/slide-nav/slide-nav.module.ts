import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideNavPageRoutingModule } from './slide-nav-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { SlideNavPage } from './slide-nav.page';
import { MaterialModule } from '../material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SlideNavPageRoutingModule,
    MaterialModule
  ],
  entryComponents: [SlideNavPage],
  declarations: [SlideNavPage],
  bootstrap: [SlideNavPage],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class SlideNavPageModule {}
