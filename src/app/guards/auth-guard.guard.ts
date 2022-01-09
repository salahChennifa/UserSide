import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
 
  constructor(private afauth:AngularFireAuth, private router:Router){
    
  }
  canActivate(): Observable<boolean> {
 
    return  this.afauth.authState.pipe(map(auth=>{
        if(!auth){
             this.router.navigate(['/login'])
             return false;
        }
        else {
          return true;
        }
     }))

  }
  
}
