import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientHistoryPageRoutingModule } from './client-history-routing.module';

import { ClientHistoryPage } from './client-history.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ClientHistoryPageRoutingModule
  ],
  declarations: [ClientHistoryPage]
})
export class ClientHistoryPageModule {}
