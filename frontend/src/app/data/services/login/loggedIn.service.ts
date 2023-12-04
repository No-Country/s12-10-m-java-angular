import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../store/StoreSignals.service';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService extends SignalsStoreService<AuthResponse>{

  constructor() { 
    super({} as AuthResponse);
  }

  public setLogin(values: AuthResponse){
    localStorage.setItem("id", !values.id ? "" : values.id);
    localStorage.setItem("name", values.name);
    localStorage.setItem("lastName", values.lastName);
    localStorage.setItem("email", values.email);
    localStorage.setItem("role", values.role);
    localStorage.setItem("token", values.jwt);

    this.setState(values);
  }

  public updateId(updatedId: string){
    this.set("id", updatedId);
  }

  public logOut(){
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    this.setState({} as AuthResponse);
  }


}
