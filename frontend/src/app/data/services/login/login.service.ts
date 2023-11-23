import { Injectable } from '@angular/core';
import { UserState } from '../../models/userLoginState';
import { SignalsSimpleStoreService } from '../StoreService.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends SignalsSimpleStoreService<UserState> {

  constructor() { 
    super();
  }

}
