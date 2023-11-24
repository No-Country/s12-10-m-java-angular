import { Injectable, Injector } from '@angular/core';
import { NewUserState } from 'app/data/models/userRegisterState';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private api: ApiService = this.injector.get(ApiService)

  constructor(private injector: Injector) { }

  
  public register(newUser: NewUserState): Observable<any>{
    return this.api.httpPost('register', newUser, false);
  }

  public setInStorage(values: NewUserState){
    Object.entries(values).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }
}
