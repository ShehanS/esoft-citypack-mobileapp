import { Component, OnInit } from '@angular/core';
import { RESTServices } from '../rest/rest.service';
import { Storage } from '@ionic/storage';
import { element } from 'protractor';
@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.page.html',
  styleUrls: ['./client-history.page.scss'],
})
export class ClientHistoryPage implements OnInit {
history = [];
CURRENT_USER : any;
  constructor(private restService: RESTServices, private storage: Storage) { }

  ngOnInit() {
    this.getHistory()
  }


  ionViewDidEnter(){
    this.getHistory()

  }


  async getHistory(){
  
    this.storage.get('current_user').then((current_user) => {
      this.CURRENT_USER = current_user;
      var saveData = JSON.stringify(current_user);
      var jsonData = JSON.parse(saveData);
      this.restService.getClientHistory(jsonData.user_id).then(response =>{
        this.history = [];
        var data = JSON.stringify(response);
        var jsonData = JSON.parse(data);
        jsonData.forEach(element => {
          this.history.push(element); 
          console.log(element)
        });
        
       
      
      }); 

    }); 
  }

}
