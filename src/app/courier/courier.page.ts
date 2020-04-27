import { Component, OnInit } from '@angular/core';
import { RESTServices } from '../rest/rest.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription, interval } from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-courier',
  templateUrl: './courier.page.html',
  styleUrls: ['./courier.page.scss'],
})
export class CourierPage implements OnInit {
  mode = new FormControl('over');
  lat:any=''
  lng:any=''
  currentUser: [];
  current_address = [];
  addresses =[];
  current_city: string;
  checked : boolean;
  updateStatus={status:false}
  CURRENT_USER : any;
  courierDetails={
    current_city:'',
    first_name:'',
    last_name:'',
    contact:'',
    status:'',
    job_running:false,
    courier_id:'',
    date_time:0,
    location_date:''
  }
  requestStatusSubscription: Subscription
  constructor(private restService: RESTServices, private geolocation: Geolocation, private storage : Storage) {
    
 
   }

  ngOnInit() {
    this.readStroage();
      
  }


 
  statusClicked() {
     var saveUser = JSON.stringify(this.CURRENT_USER);
     var user = JSON.parse(saveUser);
    this.updateStatus.status=this.checked;
    this.restService.profileUpdate(this.updateStatus, user.user_id).then(response =>{
  
      if(this.updateStatus.status==true){
        console.log("Working start")
      this.requestStatusSubscription = interval(5000).subscribe(r =>{
      this.sendLocation();

      });
    }else{
      console.log("Working stop")
      this.requestStatusSubscription.unsubscribe();
    }




   })
  }

  readStroage(){
  
    this.storage.get('current_user').then((current_user) => {
      this.CURRENT_USER = current_user;
      this.checked = current_user.update;
      }); 
     
    }


    async sendLocation()
    {
    
  
      this.geolocation.getCurrentPosition({maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
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
           // console.log(location.long_name)
            this.addresses.push(location.long_name);
            this.current_city=(this.addresses[2]);
          });
  
        
  
        });
        },er=>{
        
 
        });


        this.courierDetails.first_name= this.CURRENT_USER.first_name;
        this.courierDetails.last_name=this.CURRENT_USER.last_name;
        this.courierDetails.current_city = this.current_city;
        this.courierDetails.contact = this.CURRENT_USER.contact;
        this.courierDetails.courier_id = this.CURRENT_USER.user_id;
        this.courierDetails.status = "working";
        this.courierDetails.job_running = false;
        this.courierDetails.date_time = new Date().getTime();
        this.courierDetails.location_date = new Date().toLocaleDateString();

        console.log(this.courierDetails)

        this.restService.sendLocation(this.courierDetails).then(response =>{
          console.log(response)
        })
    }

}
