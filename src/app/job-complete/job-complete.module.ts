import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobCompletePageRoutingModule } from './job-complete-routing.module';

import { JobCompletePage } from './job-complete.page';
import { MaterialModule } from '../material.module';
import { LongPressModule } from 'ionic-long-press';
import { EnterTagDialog } from '../job-complete/enterid-component/enterid-component';


@NgModule({
  imports: [
    LongPressModule,
    CommonModule,
    FormsModule,
    IonicModule,
    JobCompletePageRoutingModule,
    MaterialModule,
  ],
  declarations: [JobCompletePage, EnterTagDialog],
  entryComponents: [EnterTagDialog],
 
})
export class JobCompletePageModule {}
