import { Component, OnInit, Inject } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { RESTServices } from '../rest/rest.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { EnterTagDialog } from '../transfer-job/enterid-component/enterid-component';

export interface actionDialog{
  client: any;
  receiver: any;
  qRId: string;
}

@Component({
  selector: 'app-transfer-job',
  templateUrl: './transfer-job.page.html',
  styleUrls: ['./transfer-job.page.scss'],
})
export class TransferJobPage implements OnInit {
IsLongPresse: boolean = false;  
id: string;
client: any;
receiver: any;
scrollHeight = 0;
qRId: string;
courierHistory = [];
clientRequest: any;
receiverDetails: any;
isAvalabel: boolean = false;

  constructor(platform: Platform, private toastController: ToastController, private loadingController: LoadingController, private barcodeScanner: BarcodeScanner, private router: Router, private restService: RESTServices, public dialog: MatDialog) { 
   this.scrollHeight = platform.height();
    
    
  }

  

  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  async enterID(){
    if (this.IsLongPresse==false){
      this.IsLongPresse=true;
    const dialogRef = this.dialog.open(EnterTagDialog, {
      width: '250px',
      data: {id: this.id}
    });

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      });   

    dialogRef.afterClosed().subscribe(result => {
      //loading.present();
      console.log('The dialog was closed');
      this.courierHistory = [];
      this.clientRequest= '';
      this.receiverDetails= '';
     this.restService.getJobHistory(result).then(response =>{
       this.qRId = result;
       var responseData = JSON.stringify(response);
       var jsonResponse = JSON.parse(responseData);
       if (jsonResponse.error_code=="err01"){
         this.errorToast(jsonResponse.message);
       }else{
      // loading.dismiss();     
       jsonResponse.client_request.forEach(element => {
        this.isAvalabel = true;
         this.clientRequest = element;
         loading.dismiss();
       });

       jsonResponse.client_request[0].receiver_details.forEach(element => {
        this.isAvalabel = true;
         this.receiverDetails = element;
      });

       jsonResponse.couriers.forEach(element => {
        this.isAvalabel = true;
         this.courierHistory.push(element);
       });

     
      }
     
      });
    

    });
    
  }else{
    this.IsLongPresse=false;
  }
  
  }







  ngOnInit() {
   // this.navigationBar.setUp(true);


   
  }

async scanCode(){
this.courierHistory = [];
this.clientRequest= '';
this.receiverDetails= '';
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      });   
   
 this.barcodeScanner.scan().then(barcodeData =>{
   
     this.restService.getJobHistory(barcodeData.text).then(response =>{
       this.qRId = barcodeData.text;
       var responseData = JSON.stringify(response);
       var jsonResponse = JSON.parse(responseData);
       if (jsonResponse.error_code=="err01"){
        this.errorToast(jsonResponse.message);
      }else{
       loading.dismiss();     
       jsonResponse.client_request.forEach(element => {
        this.isAvalabel = true;
         this.clientRequest = element;
       });

       jsonResponse.client_request[0].receiver_details.forEach(element => {
        this.isAvalabel = true;
         this.receiverDetails = element;
      });

       jsonResponse.couriers.forEach(element => {
        this.isAvalabel = true;
         this.courierHistory.push(element);
       });

      }
     });
  });


  


  }


  actionDialog(): void {
    const dialogRef = this.dialog.open(ActionDialog, {
      width: '370px',
      data: {client: this.clientRequest, receiver: this.receiverDetails, qRId:this.qRId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.courierHistory = [];
      this.clientRequest= '';
      this.receiverDetails= '';
      this.restService.getJobHistory(this.qRId).then(response =>{
        var responseData = JSON.stringify(response);
        var jsonResponse = JSON.parse(responseData);
           
        jsonResponse.client_request.forEach(element => {
         this.isAvalabel = true;
          this.clientRequest = element;
        });
 
        jsonResponse.client_request[0].receiver_details.forEach(element => {
         this.isAvalabel = true;
          this.receiverDetails = element;
       });
 
        jsonResponse.couriers.forEach(element => {
         this.isAvalabel = true;
          this.courierHistory.push(element);
        });
 
      
      });
    });
  }



 



}


@Component({
  selector: 'action-popup',
  templateUrl: 'action-popup.html',
  styleUrls: ['./transfer-job.page.scss'],
})
export class ActionDialog {
 clientRequest: any;
 receiverDetails: any;
 loggedCourier : any;
 lat:any=''
 lng:any=''
 addresses =[];
 current_address = [];
 current_city: string;
 qRId: string;
 courier = {first_name:'',last_name:'',courier_id:'',contact:'',status:'',current_city:'',date:'',date_time:0,app_type:'', tx_type:'', displayName:''}
  constructor(private toastController: ToastController, private geolocation: Geolocation, private loadingController: LoadingController,private storage: Storage,private restService: RESTServices,
    public dialogRef: MatDialogRef<ActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: actionDialog) {
      this.clientRequest = data.client;
      this.receiverDetails = data.receiver;
      this.qRId = data.qRId;
      this.getLoc();
    }



    assignMe(){
    this.storage.get("current_user").then(courier =>{
      if((this.current_city=="")||(this.current_city=="undefined")){
        this.getLoc();
       }else{
      this.courier.first_name = courier.first_name;
      this.courier.last_name = courier.last_name;
      this.courier.courier_id = courier.user_id;
      this.courier.contact = courier.contact;
      this.courier.status = "working";
      this.courier.current_city = this.current_city;
      this.courier.date = new Date().toLocaleDateString(); 
      this.courier.date_time = new Date().getTime();
      this.courier.tx_type="in";
      this.courier.app_type="courier_app"
      this.courier.displayName = "Courier App";
      this.restService.courierJobTransfer(this.qRId, this.courier).then(response =>{
        console.log(response);
        this.assignToast();
      })
      }
    });

 
  }


  async assignToast() {
    const toast = await this.toastController.create({
      message: 'Job assign complete!',
      duration: 2000
    });
    toast.present();
  }

  async getLoc(){
  
    this.addresses=[];
    this.current_address=[];
      this.geolocation.getCurrentPosition({maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //alert("r succ"+resp.coords.latitude)
      //alert(JSON.stringify( resp.coords));
     
      this.lat=resp.coords.latitude
      this.lng=resp.coords.longitude
      console.log(this.lat+"-"+this.lng);
      this.restService.getLocation(this.lat, this.lng).then( res =>{
       var rawDataMap = JSON.stringify(res);
       var mapObj = JSON.parse(rawDataMap);
      // console.log(rawDataMap);
      // console.log(mapObj.results);
       mapObj.results.forEach(element => {
         //console.log(element.address_components[0])
         this.current_address.push(element.address_components[0]);
       });
        this.current_address.forEach(location =>{
          this.addresses.push(location.long_name);
          this.current_city=(this.addresses[2]);
          });    

      });
  

      },er=>{
        alert("error getting location")
       
        
      }).catch((error) => {
      alert('Error getting location'+JSON.stringify(error));
           
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
