import { Injectable, inject } from '@angular/core';
import { UserLoginState } from '../../models/userLoginState';
import { ApiService } from '../api.service';
import {  firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  private api: ApiService = inject(ApiService);
  constructor() { 

  }

  public async login(loginSubmitted: UserLoginState) {
    let response = await firstValueFrom(this.api.httpPost('login', loginSubmitted, false));

  }

}
