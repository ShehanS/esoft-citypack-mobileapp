import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ResponsePageRoutingModule } from './response-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ResponsePage } from './response.page';
import { MaterialModule } from '../material.module';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    NgxQRCodeModule,
    ResponsePageRoutingModule

  ],
  declarations: [ResponsePage],
  providers:[FileOpener, File]
 
})
export class ResponsePageModule {}
