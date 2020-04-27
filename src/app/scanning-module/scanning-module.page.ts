import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
@Component({
  selector: 'app-scanning-module',
  templateUrl: './scanning-module.page.html',
  styleUrls: ['./scanning-module.page.scss'],
})
export class ScanningModulePage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }


  scanCode(){
    this.barcodeScanner.scan().then(barcodeData =>{
      console.log(barcodeData);
    })
  }

}
