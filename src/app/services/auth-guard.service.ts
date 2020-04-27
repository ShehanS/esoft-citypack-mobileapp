import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private router: Router, private storage: Storage) {}
  
  async canActivate(    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    var token = await this.storage.get("access-token");
     if ((token != null)){
       return true;        
      }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

  
  
  

 
  
}
