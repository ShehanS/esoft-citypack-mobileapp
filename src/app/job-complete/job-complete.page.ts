import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EnterTagDialog } from '../job-complete/enterid-component/enterid-component';
import { RESTServices } from '../rest/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-job-complete',
  templateUrl: './job-complete.page.html',
  styleUrls: ['./job-complete.page.scss'],
})
export class JobCompletePage implements OnInit {
 id: string;
 isAvalabel: boolean = false
 IsLongPresse: boolean = false
 jobDetail : any;
senderDetail : any;
  constructor( private toastController: ToastController, private dialog: MatDialog, private restService:RESTServices, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  enterID(){
    if (this.IsLongPresse==false){
      this.IsLongPresse=true;
    const dialogRef = this.dialog.open(EnterTagDialog, {
      width: '250px',
      data: {id: this.id}
    });

 dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.restService.getJobHistory(result).then(response =>{
        var responseData = JSON.stringify(response);
       var jsonResponse = JSON.parse(responseData);
       if (jsonResponse.error_code=="err01"){
         this.isAvalabel = false;
         this.errorToast(jsonResponse.message);
       }else{
        this.isAvalabel = true;
        this.jobDetail = jsonResponse.client_request[0]
        this.senderDetail = jsonResponse.client_request;
        console.log(this.senderDetail);

       }
      });

    });



  }else{
    this.IsLongPresse=false;
  }
  }



  scan(){
   this.barcodeScanner.scan().then(barcodeData =>{
    this.restService.getJobHistory(barcodeData.text).then(response =>{
      var responseData = JSON.stringify(response);
     var jsonResponse = JSON.parse(responseData);
     if (jsonResponse.error_code=="err01"){
       this.isAvalabel = false;
       this.errorToast(jsonResponse.message);
     }else{
      this.isAvalabel = true;
      this.jobDetail = jsonResponse.client_request[0]
      this.senderDetail = jsonResponse.client_request;
      console.log(this.senderDetail);
     }
    });
  });

  }


  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



}


