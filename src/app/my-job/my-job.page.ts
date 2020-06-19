import { Component, OnInit, Inject } from '@angular/core';
import { RESTServices } from '../rest/rest.service';
import { Storage } from '@ionic/storage';
import { Subscription, interval } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { element } from 'protractor';


export interface CancelOption{
  rejectList : any;
  reason: string;
  id: string;
}


@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.page.html',
  styleUrls: ['./my-job.page.scss'],
})

export class MyJobPage implements OnInit {
  CURRENT_USER : any;
  jobs = [];
  getJobsSubscription: Subscription
  reason = [];
  response = {courier_status:'',comment:''}
  constructor(public dialog: MatDialog, private restService: RESTServices, private storage : Storage, private localNotifications:LocalNotifications) {
   
   }

  ngOnInit() {
   
   // this.getJobList();
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
      
      this.storage.get('current_user').then((current_user) => {
        this.CURRENT_USER = current_user;
        var saveData = JSON.stringify(current_user);
        var jsonData = JSON.parse(saveData);
        this.restService.getCourierJobs(jsonData.user_id).then(response =>{
          this.jobs=[];
          var data = JSON.stringify(response);
          var jsonData = JSON.parse(data);
          
          

          jsonData.forEach(element => {
            console.log(element)
            this.jobs.push(element)
          });
          



        })




        }); 
     



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


  courierAcceptUpdate(id: string){
   this.response.courier_status="accept";
   this.restService.setCourierAcceptions(id, this.response).then(response =>{
     console.log(response)
     this.getJobList();
   })

    }
    
  courierCancelUpdate(id: string, reason: string){
    this.response.courier_status="cancel";
    this.response.comment = reason;
    
    console.log(reason);
    this.restService.setCourierAcceptions(id, this.response).then(response =>{
      console.log(response)
      this.getJobList();
    })
 
     }


     openReasonDialog(id: string) {
     this.storage.get("reject_reason").then(list =>{
      const dialogRef = this.dialog.open(CancelDialog, {
        width: '250px',
        data: {rejectList : list, id : id}
      });
        dialogRef.afterClosed().subscribe(result => {
          this.getJobList();
        });
      
     });

     
    }
  
  
  





   
}

@Component({
  selector: 'cancel-reason-alert-dialog',
  templateUrl: 'cancel-reason-alert.html',
})
export class CancelDialog {
rejectList: any;
reason: string;
response = {courier_status:'',comment:''}
  constructor(
    private restService: RESTServices,
    public dialogRef: MatDialogRef<CancelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CancelOption) {
      this.rejectList = data.rejectList.item_list;
    console.log(data.id)
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  selectReason(){
    console.log(this.reason)
  }

  cancelling(){

    this.response.courier_status="cancel";
    this.response.comment = this.reason;
    this.restService.setCourierAcceptions(this.data.id, this.response).then(response =>{
      console.log(response)
     this.dialogRef.close();
    })
  }



}
