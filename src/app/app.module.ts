import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicGestureConfig } from '../utils/IonicGestureConfig'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { RESTServices } from './rest/rest.service';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { HomePage } from './login/home.page';
import { CourierPage } from './courier/courier.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:9000/ws', options: {}};
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [IonicStorageModule.forRoot(), 
    DeviceDetectorModule.forRoot(),
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicModule.forRoot(), 
    SocketIoModule.forRoot(config),
    AppRoutingModule, 
    BrowserAnimationsModule,  
    HttpClientModule,
    NgxQRCodeModule,


    
    
  ],
  providers: [
    NavigationBar,
    DocumentViewer,
    File,
    FileOpener,
    Printer,
    BarcodeScanner,
    Base64ToGallery,
    BackgroundMode,
    NativeGeocoder,
    Geolocation,
    HttpClient,
    HttpClientModule,
    StatusBar,
    SplashScreen,
    RESTServices,
    HomePage,
    Storage,
    CourierPage,
    AndroidFullScreen,
    LocalNotifications, 
    
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
