import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDeleveryPageRoutingModule } from './new-delevery-routing.module';

import { NewDeleveryPage, AddingDelevery, MessageBoxDialog } from './new-delevery.page';
import { MaterialModule } from '../material.module';
import { MatDialogModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    NewDeleveryPageRoutingModule,
    
  ],
  entryComponents: [
    AddingDelevery,
    MessageBoxDialog
    
    
  ],
  declarations: [NewDeleveryPage, AddingDelevery, MessageBoxDialog],
  
})
export class NewDeleveryPageModule {}
