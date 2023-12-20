import { Injectable, effect } from '@angular/core';
import { SignalsStoreService } from '../store/StoreSignals.service';
import { AuthResponse } from 'app/data/models/AuthResponse';
import { ApiService } from '../api.service';
import { first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoggedInService {
  constructor(private api: ApiService) {
  }

  public setLogin(values: AuthResponse) {
    sessionStorage.setItem("id", values.id);
    sessionStorage.setItem('name', values.name);
    sessionStorage.setItem('lastName', values.lastName);
    sessionStorage.setItem('email', values.email);
    sessionStorage.setItem('role', values.role);
    localStorage.setItem('token', values.jwt);
  }

  public verifyLogin() {
    const name = sessionStorage.getItem('name');
    const token = localStorage.getItem('token');

    if (token && !name) {
      // . . . Verificar Login
      this.api.httpGet('authenticate/profile', true).pipe(first()).subscribe((res: any)=>{
            sessionStorage.setItem('id', res.id);
            sessionStorage.setItem('name', res.name);
            sessionStorage.setItem('lastName', res.lastName);
            sessionStorage.setItem('email', res.email);
            sessionStorage.setItem('role', res.role);
      });
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

  public isLoggedIn(): boolean {
    const id = sessionStorage.getItem('id');
    return id !== null && id !== undefined;
  }
}
