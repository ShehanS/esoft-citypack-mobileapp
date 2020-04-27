import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnterTagDialog } from '../transfer-job/enterid-component/enterid-component';

import { IonicModule } from '@ionic/angular';

import { TransferJobPageRoutingModule } from './transfer-job-routing.module';

import { TransferJobPage, ActionDialog } from './transfer-job.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MaterialModule } from '../material.module';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  imports: [
    NgxQRCodeModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    LongPressModule,
    IonicModule,
    TransferJobPageRoutingModule
  ],
  entryComponents: [EnterTagDialog, ActionDialog],
  declarations: [TransferJobPage, ActionDialog, EnterTagDialog],
  
 
 

})
export class TransferJobPageModule {}
