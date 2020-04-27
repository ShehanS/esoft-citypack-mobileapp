import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RESTServices } from '../rest/rest.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

 //login page S.E final project


export class HomePage implements OnInit  {
 
  lat:any=''
  lng:any=''

  constructor(private navigationBar: NavigationBar, private alertController: AlertController,private loadingController: LoadingController,private geolocation: Geolocation,private router: Router, private storage: Storage, public loginAlert: AlertController, private RestClient: RESTServices) {
   
  }



  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];
  
  @ViewChild("spinner", null) spinnerDialog: ElementRef;
  userLogin = {
    username:'',
    password:''
  }

LoginAlert ={
    message: '',
    type: '',
    error: '',
    alertHeader:''
  }

  LoginRemember ={
    state: false
  }



currentUser ={
    access_token:'',
    user_id:'',
    role:'',
    first_name:'',
    last_name:'',
    contact:'',
    update:''
 }

  
remberState(){
  console.log(this.LoginRemember.state);
}



  async getLoc()
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      });
    await loading.present();

    this.geolocation.getCurrentPosition({maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //alert("r succ"+resp.coords.latitude)
      //alert(JSON.stringify( resp.coords));
      loading.dismiss()
      this.lat=resp.coords.latitude
      this.lng=resp.coords.longitude
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

  async logForm() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      });

      //this.router.navigate(['/home-page']);
    //await loading.present();
    console.log(this.userLogin);
    if((this.userLogin.username=="")||(this.userLogin.password=="")){
      this.LoginAlert.error="001";
      this.LoginAlert.message="Please enter username and password !";
      this.LoginAlert.type="login";
      this.LoginAlert.alertHeader="Login";
     this.presentAlert();
    }else{
      loading.present();
      this.RestClient.login(this.userLogin).then(res =>{
        console.log(res);
        loading.dismiss();
       var jsonObject = JSON.stringify(res);
          var response = JSON.parse(jsonObject);
          this.spinnerDialog.nativeElement.style.visibility = 'hidden';
      if(response.code=="err001"){
          this.LoginAlert.error="err001";
          this.LoginAlert.message="Cannot find user!";
          this.LoginAlert.type="login";
          this.LoginAlert.alertHeader="Login";
          this.presentAlert();
        }else if(response.code=="err002"){
          this.LoginAlert.error="err002";
          this.LoginAlert.message="Password is not matched!";
          this.LoginAlert.type="login";
          this.LoginAlert.alertHeader="Login";
          this.presentAlert();
        }else if(response.account_state=="disiable"){
          this.LoginAlert.error="err002";
          this.LoginAlert.message="Your account is disiable!";
          this.LoginAlert.type="login";
          this.LoginAlert.alertHeader="Sorry";
          this.presentAlert();
        }else if (response.role=="Courier"){
          this.currentUser.access_token=response.access_token;
          this.currentUser.user_id =  response.user_id;
          this.currentUser.role =  response.role;
          this.currentUser.first_name = response.first_name;
          this.currentUser.last_name = response.last_name;
          this.currentUser.contact = response.contact;
          this.currentUser.update = response.update;
          this.storage.set("current_user",this.currentUser);
          this.storage.set("access-token",this.currentUser.access_token);
          this.storage.set("role",this.currentUser.role);
          this.storage.set("rember_me", this.LoginRemember.state)
          this.router.navigate(['/courier']);
        
          }else if (response.role=="Client"){
          this.currentUser.access_token=response.access_token;
          this.currentUser.user_id =  response.user_id;
          this.currentUser.role =  response.role;
          this.currentUser.first_name = response.first_name;
          this.currentUser.last_name = response.last_name;
          this.currentUser.contact = response.contact;
          this.currentUser.update = response.update;
          this.storage.set("access-token",this.currentUser.access_token);
          this.storage.set("current_user",this.currentUser);
          this.storage.set("role",this.currentUser.role);
          this.storage.set("rember_me", this.LoginRemember.state)

          this.router.navigate(['/client']);
        }

      });
    }
    
  }
  async presentAlert() {
    const alert = await this.loginAlert.create({
      header: this.LoginAlert.alertHeader,
      message: this.LoginAlert.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  ngOnInit(): void {
    this.navigationBar.setUp(true);
    var currentUser;
   this.storage.get('current_user').then((val) => {
    var data = JSON.stringify(val);
    currentUser = JSON.parse(data); 
  });
/*
  if (currentUser.access_token!=null){
    if (currentUser.access_token!=undefined){
      if (currentUser.role=="Client"){
        this.router.navigate(['/client']);
      }else if (currentUser.role=="courier"){
        this.router.navigate(['/courier']);
      }
    }
  }
*/


  
  }

  ionViewWillEnter(){
    
  }


}
