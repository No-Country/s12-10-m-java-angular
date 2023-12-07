import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../store/StoreSignals.service';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Injectable({providedIn: 'any'})
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

  public verifyLogin(){
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    this.setState({
      id: id as string,
      name: name as string,
      lastName: lastName as string,
      email: email as string,
      role: role as string,
      jwt: token as string,
    } as AuthResponse);
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

    this.setState(null);
    location.reload();
  }


}
