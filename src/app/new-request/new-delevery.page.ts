import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RESTServices } from '../rest/rest.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import {formatDate} from '@angular/common';
import { interval, Subscription, Observable} from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ToastController } from '@ionic/angular';
//delevery items poups data properties
export interface DialogData {
  deleveryType: string;
  mesurmentType:string;
  mesurment: string;
  mesurmentValue: number;
  desc: string;

}
//messagebox poups data properties
export interface MessageBoxDialogData {
  jobID: string;
  message: string;
}

@Component({
  selector: 'app-new-delevery',
  templateUrl: './new-delevery.page.html',
  styleUrls: ['./new-delevery.page.scss'],

})
export class NewDeleveryPage implements OnInit {
  
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  state: string;
  requestStatusSubscription: Subscription
  durationInSeconds = 5;
  lat:any=''
  lng:any=''
  first_name: string;
  last_name: string;
  current_address = [];
  addresses =[];
  panelOpenState = false;
  deleveryType: string;
  mesurmentType:string;
  mesurment: string;
  mesurmentValue: number
  desc:string;
  configList:any;
  deleveryItems=[];
  itemsDesc=[];
  CURRENT_USER;
  courier_details=[];
  current_city: string;
  status = false;
  notifactionStatus =false;
  requestID : string;
  jobID: string;
  message: string;

  receiverDetails = {   
    salutation:'',
    firstName:'',
    lastName:'',
    contact:'',
    address:''    
  }
   requestObject ={
    user_id: '',
    first_name: '',
    last_name: '',
    current_location:[],
    current_address:'',
    current_city:'',
    delevery_items:[],
    receiver_details: {},
    device:'',
    request_date: '',
    date_time: 0
  }

  configRequest={
    token:"city-pack",
    config_type:"list",
    list_name:"delevery_item"
  }

  

  constructor(private toastController: ToastController, public messageDialog: MatDialog, private localNotifications: LocalNotifications, private deviceService: DeviceDetectorService, public dialog: MatDialog, private _formBuilder: FormBuilder,public alertController: AlertController,public loadingController: LoadingController,private geolocation: Geolocation,private router: Router, private storage: Storage, public loginAlert: AlertController, private restService: RESTServices)  { 
    
  }
  ngOnInit() {
   this.getLoc();
   this.readStroage();
   this.getConfiguration();
 
  }





getConfiguration(){
  this.restService.getConfig(this.configRequest).then(response =>{
    this.storage.set("config_list",response);
  })
}



  async ionViewDidEnter(){
    this.getConfiguration(); 
    let savedRequest = await this.storage.get("request_status");  
    if (savedRequest==null){
     return false;
   }
   this.requestStatusSubscription = interval(5000).subscribe(r =>{
     this.getRequestStatus();
   });
  }


  openProcessDialog(jobID : string) {
    const dialogRef = this.dialog.open(MessageBoxDialog, {
      width: '350px',
      data: {jobID: jobID, message: this.message}
    });
   dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }



  async sendReceiverDetails(){
   let runningJob = await this.checkExsitingProcess();
   if (runningJob===false){
    const loading = await this.loadingController.create({
      message: 'Please wait...',});
  if ((this.receiverDetails.salutation==="")||(this.receiverDetails.firstName==="")||(this.receiverDetails.lastName==="")||(this.receiverDetails.contact==="")||(this.receiverDetails.address==="")){
    this.presentAlert();
    }else{
    await loading.present();   
    this.requestObject={
        user_id: this.CURRENT_USER.user_id,
        first_name: this.CURRENT_USER.first_name,
        last_name: this.CURRENT_USER.last_name,
        current_location: [{lat:this.lat},{lng:this.lng}],
        current_address:this.addresses.toString().toString(),
        current_city: this.current_city.toString(),
        delevery_items: this.deleveryItems,
        receiver_details: [{"salutation":this.receiverDetails.salutation,"first_name":this.receiverDetails.firstName,"last_name":this.receiverDetails.lastName,"contact":this.receiverDetails.contact,"address":this.receiverDetails.address}],
        device:this.deviceService.getDeviceInfo().userAgent,
        request_date: formatDate(new Date(), 'M/d/yyyy', 'en'),
        date_time: (new Date).getTime()
      }
      this.restService.requestDelevery(this.requestObject).then(res =>{
         if (res!=null){
          loading.dismiss()
          var response = JSON.stringify(res);
          var jsonRes = JSON.parse(response);
          this.storage.set('request_status',jsonRes);
          this.requestCompleteToast();
          this.status=false;
          this.notifactionStatus = false;
          this.requestStatusSubscription = interval(1000).subscribe(r =>{
            this.getRequestStatus();
          });
        }    
      });    
    
       
    }
   }
  }


  async requestCompleteToast() {
    const toast = await this.toastController.create({
      message: 'Request has been sent!',
      duration: 2000
    });
    toast.present();
  }


  courierNotification(message: string) {
    const notification = {
      id: 1234,
      text: message,
      trigger: { at: new Date() },
      led: 'FF0000',
      smallIcon: 'res://mipmap-hdpi/ic_launcher.png',
      icon: 'res://mipmap-hdpi/ic_launcher.png',
      vibrate: true
    };
    this.localNotifications.schedule(notification);
  }


  async getRequestStatus(){
      console.log("===RELOAD RQUEST STATUS===")
    this.storage.get("request_status").then(request =>{
      this.requestID = request.request_id;
      this.restService.getRequestStatus(this.requestID).then(async res =>{
        this.courier_details=[];
          var resJson = JSON.stringify(res);
          var JsonObject = JSON.parse(resJson);
           if (JsonObject.args5=="working"){
             
            if(this.notifactionStatus==false){
           this.courierNotification("Courier is one the way!!!");
            }
            this.notifactionStatus = true;

           this.status = false;
           this.courier_details.push("First Name : "+JsonObject.args1);
           this.courier_details.push("Last Name : "+JsonObject.args2);
           this.courier_details.push("Contact : "+JsonObject.args3);
           this.courier_details.push("Request ID : "+JsonObject.args4);
           this.courier_details.push("Status : "+JsonObject.args5);
           this.storage.set("courier_details", this.courier_details);
           }           
           if (JsonObject.args5=="pending"){
            this.courier_details.push(JsonObject.args1);
            if (this.status==false){
            
              this.status= true;
         }
           }
           if (JsonObject.args5=="complete"){
            await this.storage.remove("courier_details");
            await this.storage.remove("request_status");
            this.courier_details=[];
            this.requestStatusSubscription.unsubscribe();
           }
          


      });
    });




 
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please enter required feilds.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertSuccessfull() {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'Your request has been process.',
      buttons: ['OK']
    });

    await alert.present();
  }



  addDelevery(): void {
    
   


    const dialogRef = this.dialog.open(AddingDelevery, {
      width: '350px',
      data: {deleveryType: this.deleveryType, mesurmentType:this.mesurmentType, mesurment:this.mesurment, mesurmentValue: this.mesurment, desc:this.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     

      if(result != undefined){
        this.deleveryItems.push(result);
        this.loadItemsForList();
        
      }
    });
  
  
  }



  loadItemsForList(){
    this.itemsDesc=[];
    this.deleveryItems.forEach(element =>{
      this.itemsDesc.push(element);
    })
    //console.log(this.itemsDesc);
  }
  removeItem(id: number): void{
 this.itemsDesc.splice(id,1);
this.deleveryItems=[];

  // this.loadItemsForList();
  }


  async checkStatus(){
   let check = await this.checkExsitingProcess();
   console.log(check);
  }


  async checkExsitingProcess(){
    let value : boolean;
    let savedRequest = await this.storage.get("request_status");  
     if (savedRequest==null){
      return false;
    }
    var saveJson = JSON.stringify(savedRequest);
    var saveJsonObject = JSON.parse(saveJson);
    this.requestID = saveJsonObject.request_id;
    let requestStatus = await this.restService.getRequestStatus(saveJsonObject.request_id);
    var resJson = JSON.stringify(requestStatus);
    var JsonObject = JSON.parse(resJson);
    return new Promise (resolve =>{
      if (Object.keys(JsonObject).length===0){
        value = false;
      }else{
        value = true;
        this.openProcessDialog(saveJsonObject.s);
      }    
      resolve(value);
    
    });



  }
  


 

  async getLoc()
  {
    this.addresses=[];
    this.current_address=[];
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      });
    await loading.present();

    this.geolocation.getCurrentPosition({maximumAge: 1000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //alert("r succ"+resp.coords.latitude)
      //alert(JSON.stringify( resp.coords));
      loading.dismiss()
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
         // console.log(location.long_name)
          this.addresses.push(location.long_name);
          this.current_city=(this.addresses[2]);
        });

      

      });
      },er=>{
        //alert("error getting location")
        loading.dismiss()
        this.showLoader('Can not retrieve Location')
      }).catch((error) => {
      //alert('Error getting location'+JSON.stringify(error));
      loading.dismiss()
      this.showLoader('Error getting location - '+JSON.stringify(error))
      });
  }

  async showLoader(msg)
  {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

 readStroage(){
  this.storage.get('current_user').then((current_user) => {
    this.CURRENT_USER = current_user;
    });
  this.storage.get('courier_details').then(courier =>{
    this.courier_details = courier;
  });    


  }


  



}

@Component({
  selector: 'add-delevery',
  templateUrl: 'add-delevery.html',
  styleUrls: ['./new-delevery.page.scss'],
})
export class AddingDelevery {



  jsonList;
  selectedValue: string;
  MesurSelectedValue: string;
  GradingSelectedValue: string;
  MesureType=[];
  ListItems=[];
  GradingsType:any;
  DeleveryType=[];


  
  constructor(private storage: Storage,
    public dialogRef: MatDialogRef<AddingDelevery>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
       this.storage.get("config_list").then(items =>{
      var obj = JSON.stringify(items);
        this.jsonList = JSON.parse(obj);
          this.jsonList.item_list.forEach(element => {
          this.ListItems.push(element)
         });
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
    
  }


  deleveryTypeChange(){
  this.MesureType=[];
  this.jsonList.item_list.forEach(element => {

   if (element.item_value===this.selectedValue){
    
     element.mesure_type.forEach(element => {
      console.log(element)
      this.MesureType.push(element)
      });



   }
   });
  

  }

  mesurementTypeChange(){
       this.GradingsType=[];
   
    this.MesureType.forEach(element =>{
      if (element.type===this.MesurSelectedValue){
     this.GradingsType=(element.dimension);
      }
    })
    }







}




@Component({
  selector: 'messagebox-dialog',
  templateUrl: 'messagebox-dialog.html',
})
export class MessageBoxDialog {

  constructor(
    public dialogRef: MatDialogRef<MessageBoxDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageBoxDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}