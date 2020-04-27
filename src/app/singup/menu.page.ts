import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef, NgZone, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { RESTServices } from '../rest/rest.service';
import { MatStepper } from '@angular/material';
import { AlertController } from '@ionic/angular';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
salutation: string;
firstName: string;
lastName: string;
gender: string;
age: number;
email: string;
address2: string;
city: string;
state: string;
postalCode: string;
nicOrPass: string;
contact: string;
userDetails: any;
username: string;
password: string;
role:string;
userLoginDetails: any;
deviceInfo = null;
 
  @ViewChild('stepper1', null) private userDetailStepper: MatStepper;
  
  isLinear = false;
  userFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private deviceService: DeviceDetectorService, public createAlert: AlertController, private RestClient: RESTServices,   private userFormBuilder: FormBuilder, private loginFormBuilder: FormBuilder) {
  
    }

  

  ngOnInit() {
   
    this.userFormGroup = this.userFormBuilder.group({
      salutation:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required],
      email:['',Validators.required],
      address2:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      postalCode:['',Validators.required],
      nicOrPass:['',Validators.required],
      contact:['',Validators.required],
      

      
    });
    this.loginFormGroup = this.loginFormBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
    
  }

  getUserDetails(){
    
    this.userDetails = this.userFormGroup.value;
  
 
   }

  getLoginDetails(){
    this.userLoginDetails = this.loginFormGroup;
  }

createNewUser(){
 
  console.log(this.userDetails = this.userFormGroup.value);
  if ((this.userFormGroup.value.salutation==null)||(this.userFormGroup.value.firstName==null)||(this.userFormGroup.value.contact==null)||(this.userFormGroup.value.nicOrPass==null)||(this.userLoginDetails.value.username==null)||(this.userLoginDetails.value.password==null)){
      
   this.userDetailStepper.previous();
    this.presentAlert();
    }else{
      const now = new Date()  
      const created_timestamp = Math.round(now.getTime() / 1000)   
var USER = {};
var salutation="salutation";
var firstName="first_name";
var lastName="last_name";
var gender="gender";
var age="age";
var email="email";
var address="address";
var city="city";
var state="state";
var postalCode="postal_code";
var nicOrPass="nic_or_passport";
var contact="contact";
var username="username";
var password="password";
var role="role";
var current_timestamp="timestamp";
var device="device"

USER[salutation] = this.userFormGroup.value.salutation;
USER[firstName] = this.userFormGroup.value.firstName;
USER[lastName] = this.userFormGroup.value.lastName;
USER[gender] = this.userFormGroup.value.gender;
USER[age] = this.userFormGroup.value.age;
USER[email] = this.userFormGroup.value.email;
USER[address] =this.userFormGroup.value.address2;
USER[city] = this.userFormGroup.value.city;
USER[state] = this.userFormGroup.value.state;
USER[postalCode] = this.userFormGroup.value.postalCode;
USER[nicOrPass] = this.userFormGroup.value.nicOrPass;
USER[contact] = this.userFormGroup.value.contact;
USER[username] = this.loginFormGroup.value.username;
USER[password] = this.loginFormGroup.value.password;
USER[role] = "client"
USER[current_timestamp] = created_timestamp;
USER[device]=this.deviceService.getDeviceInfo().userAgent;

this.RestClient.newAccount(USER).then(res =>{
console.log(res)
});
    }

}

async presentAlert() {
  const alert = await this.createAlert.create({
    header: 'Input Error',
    message: 'Please fill required feilds',
    buttons: ['OK']
  });

  await alert.present();
}

  
  


}
