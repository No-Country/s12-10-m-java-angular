import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInService } from '../services/login/loggedIn.service';

@Injectable({
  providedIn: 'root',
})
export class cartGuard {

  constructor(private loggedInService: LoggedInService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const usuarioAutorizado = this.loggedInService.isLogged();

    if (usuarioAutorizado) {
      return true; 
    } else {
      return false;
    }
  }
}