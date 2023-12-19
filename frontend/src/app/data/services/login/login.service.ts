import { DestroyRef, Injectable, Injector, inject } from '@angular/core';
import { UserLoginState } from '../../models/userLoginState';
import { ApiService } from '../api.service';
import {  Observable, Observer, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  private api: ApiService = this.injector.get(ApiService);

  constructor(private injector: Injector) { 
  }

  public login(loginSubmitted: UserLoginState): Observable<any>  {
    return this.api.httpPost('authenticate/login', loginSubmitted, false);
  }

  public setInStorage(values: AuthResponse){
    Object.entries(values).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  public forgotPassword(email: string){
    return this.api.httpPost('forgot-password', email, false);
  }
}
