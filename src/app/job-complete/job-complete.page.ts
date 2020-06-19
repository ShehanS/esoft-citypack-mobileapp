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
 qrID: string;
 isAvalabel: boolean = false
 IsLongPresse: boolean = false
 jobDetail : any;
 senderDetail : any;
 response = {courier_status:'',comment:'',status:''}
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
      this.qrID = result;
      this.restService.getJobHistory(result).then(response =>{
        var responseData = JSON.stringify(response);
       var jsonResponse = JSON.parse(responseData);
       if (jsonResponse.error_code=="err01"){
         this.isAvalabel = false;
         this.jobToast(jsonResponse.message);
        

       }else{

      this.restService.getJobStatus(this.qrID).then(response =>{
        var jsonObject = JSON.stringify(response);
        var json = JSON.parse(jsonObject);
        if (json.status=="complete"){
          this.jobToast("Already compleced !")
        }else if(json.status=="accept"){
        this.isAvalabel = true;
        this.jobDetail = jsonResponse.client_request[0]
        this.senderDetail = jsonResponse.client_request;
        console.log(this.senderDetail);
        }

      })
        

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
      this.qrID = barcodeData.text;
      var responseData = JSON.stringify(response);
     var jsonResponse = JSON.parse(responseData);
     if (jsonResponse.error_code=="err01"){
       this.isAvalabel = false;
       this.jobToast(jsonResponse.message);
     }else{
      this.isAvalabel = true;
      this.jobDetail = jsonResponse.client_request[0]
      this.senderDetail = jsonResponse.client_request;
      console.log(this.senderDetail);
     }
    });
  });

  }



  jobComplete(){
    this.response.courier_status="complete";
    this.response.status="complete";
    this.restService.setCourierAcceptions(this.qrID, this.response).then(response =>{
      console.log(response)
      this.jobDetail =[];
      this.senderDetail =[];
     this.jobToast("Job is done.");
    })
  }

  async jobToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



}


