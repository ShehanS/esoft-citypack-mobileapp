import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment.prod';
import { timeout } from 'rxjs/operators';
const URL = SERVER_URL;
const timeOut = 60000;


@Injectable({
  providedIn: 'root'
})
export class RESTServices{
  accessToken: string;
 
  constructor(private http: HttpClient, private storage: Storage) { 
   this.readStroage();
  
  }

  


readStroage(){
  console.log("Read Stroage")
  this.storage.get('current_user').then((val) => {
    //console.log(val);
    this.accessToken = val.access_token;
    
  });
}

createAuthrorizationHeader(): HttpHeaders {
  this.readStroage();
   let headers = new HttpHeaders();
   headers = headers.set('Access-Token', this.accessToken);
   headers = headers.set('Access-Control-Allow-Origin', '*');
   headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   headers = headers.set('Content-Type', 'application/json');
  return headers
}




login(user: any){

  return new Promise(resolve => {
    this.http.post(URL+"/api/login", user).pipe(timeout(10000)).subscribe(res => {
      resolve(res);
      }, err => {
       
     alert(JSON.stringify(err))
      
    });
  });
}

newAccount(user: any){
  this.readStroage();
  //let headers = this.createAuthrorizationHeader();
  return new Promise(resolve => {
    this.http.post(URL+"/api/create-user", user).pipe(timeout(10000)).subscribe(res => {
      resolve(res);
      }, err => {
      console.log(err);
      
    });
  });
}



getConfig(appData: any){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
   return new Promise(resolve => {
    this.http.post(URL+"/api/get-config", appData, {headers: headers}).pipe(timeout(10000)).subscribe(res => {
      resolve(res);
      }, err => {
      console.log(err);
      
    });
  });
}



requestDelevery(request: any){
  this.readStroage();
  console.log("Pots request")
  let headers = this.createAuthrorizationHeader();
  console.log(headers);
  return new Promise(resolve => {
    this.http.post(URL+"/api/request", request, {headers: headers}).pipe(timeout(10000)).subscribe(res => {
      resolve(res);
      }, err => {
      console.log(err);
      
    });
  });
}



getRequestStatus(id : string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.get(URL+"/api/request-status/"+id, {headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}



profileUpdate(prams : any, id : string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.put(URL+"/api/update-profile/"+id ,prams, {headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}




getLocation(lat: string, lan: string){
  return new Promise(resolve =>{
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lan+'&key=AIzaSyAz42Ko00vI9IPh_7hGerh-AoZl6XVd9so').pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}


sendLocation(data: any){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.post(URL+"/api/update-location" ,data, {headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}

getCourierJobs(id: string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.get(URL+"/api/jobs-details/"+id ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}

getPackgeDetails(id: string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.get(URL+"/api/packge-details/"+id ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}

setCourierAcceptions(id: string, parms: any){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.put(URL+"/api/update-jobs/"+id, parms ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}


getJobHistory(id: string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.get(URL+"/api/get-jobs-history/"+id ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}


getJobStatus(id: string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.get(URL+"/web/get-job-status/"+id ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}


courierJobTransfer(id: string, parms: any){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.put(URL+"/api/job-transfer/"+id, parms ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}

getClientHistory(id: string){
  this.readStroage();
  let headers = this.createAuthrorizationHeader();
  return new Promise(resolve =>{
    this.http.get(URL+"/api/client-history/"+id ,{headers: headers}).pipe(timeout(10000)).subscribe(res =>{
        resolve(res);
  }, err =>{
    console.log(err);

    });
  });
}

}