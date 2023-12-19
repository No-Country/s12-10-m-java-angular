import { Injectable, effect } from '@angular/core';
import { SignalsStoreService } from '../store/StoreSignals.service';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Injectable({ providedIn: 'root' })
export class LoggedInService {
  constructor() {
  }

  public setLogin(values: AuthResponse) {
    sessionStorage.setItem("id", values.id);
    sessionStorage.setItem('name', values.name);
    sessionStorage.setItem('lastName', values.lastName);
    sessionStorage.setItem('email', values.email);
    sessionStorage.setItem('role', values.role);
    localStorage.setItem('token', values.jwt);
  }

  // <<
  public verifyLogin() {
    const { id, name, lastName, email, role } = sessionStorage;
    const token = localStorage.getItem('token');

    if (token && id && name && lastName && email && role) {
      // . . . Verificar Login

      //. . . Renovar Login o redirijir a Login
    }
  }

  public updateId(updatedId: string) {
    sessionStorage.setItem('id', updatedId);
  }

  public logOut() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    localStorage.removeItem('token');

    setTimeout(()=> location.reload(), 200);
  }

  public isLogged(): boolean {
    const { id, name, lastName, email, role } = sessionStorage;
    const token = localStorage.getItem('token');

    if (token && id && name && lastName && email && role) {
      console.log('esta logueado')
      return true
    }
    else{
      console.log('no esta logueado')
      return false
    }
  }
}
