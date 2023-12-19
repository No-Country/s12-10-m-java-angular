import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoggedInService } from '../services/login/loggedIn.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loggedInService: LoggedInService, private router: Router) {}

  canActivate(): boolean {
    if (this.loggedInService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}