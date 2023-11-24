import { DestroyRef, Injectable, Injector, inject } from '@angular/core';
import { UserLoginState } from '../../models/userLoginState';
import { ApiService } from '../api.service';
import {  Observable, Observer, Subject, firstValueFrom, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  private api: ApiService = this.injector.get(ApiService);

  constructor(private injector: Injector) { 
  }

  public login(loginSubmitted: UserLoginState): Observable<any>  {
    return this.api.httpPost('login', loginSubmitted, false);
  }

  public setInStorage(values: UserLoginState){
    Object.entries(values).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

}
