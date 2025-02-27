import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core-services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  isAdminLoggedIn:any;
  constructor(private auth: AuthenticationService, private myRoute: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isLoggednIn()) {
      return true;
    } else {
      this.myRoute.navigate(["/"]);
      return false;
    }

  }
}
