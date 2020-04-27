import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


declare var google: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  CURRENT_USER: any;
  subscribe: any;
  private backButtonSub: Subscription;
  
  constructor(private router: Router, private platform: Platform, private storage: Storage, private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation,) { 
    
  }

  ngOnInit() {

this.getCurrentUser();
  
 
  }

  async getCurrentUser(){
   this.CURRENT_USER = await this.storage.get("current_user");
  }







ionViewDidEnter() {
  this.backButtonSub = this.platform.backButton.subscribeWithPriority(
    10000,
    () => {
      if (window.confirm("Do you want to exit?")) {
      navigator['app'].exitApp()
      }
    });
}

ionViewWillLeave() {
  this.backButtonSub.unsubscribe();
}


  
  
}
