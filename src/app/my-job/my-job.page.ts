import { Component, OnInit } from '@angular/core';
import { RESTServices } from '../rest/rest.service';
import { Storage } from '@ionic/storage';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.page.html',
  styleUrls: ['./my-job.page.scss'],
})
export class MyJobPage implements OnInit {
  CURRENT_USER : any;
  jobs = [];
  getJobsSubscription: Subscription

  response = {courier_status:'',comment:''}
  constructor(private restService: RESTServices, private storage : Storage) {
   
   }

  ngOnInit() {
   
    this.getJobList();
    this.getJobsSubscription = interval(10000).subscribe(r =>{
      this.getJobList();
    });
 
  }



ionViewDidEnter(){
  this.getJobList()
}

ngOnDestroy(){
this.getJobsSubscription.unsubscribe();
}



  


    getJobList(){
      this.jobs=[];
      this.storage.get('current_user').then((current_user) => {
        this.CURRENT_USER = current_user;
        var saveData = JSON.stringify(current_user);
        var jsonData = JSON.parse(saveData);
        this.restService.getCourierJobs(jsonData.user_id).then(response =>{
          var data = JSON.stringify(response);
          var jsonData = JSON.parse(data);
          jsonData.forEach(element => {
            console.log(element)
            this.jobs.push(element)
          });
          



        })




        }); 
     



    }


  courierAcceptUpdate(id: string){
   this.response.courier_status="accept";
   this.restService.setCourierAcceptions(id, this.response).then(response =>{
     console.log(response)
     this.getJobList();
   })

    }
    
  courierCancelUpdate(id: string){
    this.response.courier_status="cancel";
    this.restService.setCourierAcceptions(id, this.response).then(response =>{
      console.log(response)
      this.getJobList();
    })
 
     }
   
}
