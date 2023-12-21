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
    localStorage.setItem('id', values.id);
    localStorage.setItem('name', values.name);
    localStorage.setItem('lastName', values.lastName);
    localStorage.setItem('email', values.email);
    localStorage.setItem('role', values.role);
    localStorage.setItem('token', values.jwt);
  }

  public verifyLogin() {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    if (token && !name) {
      // . . . Verificar Login
      this.api.httpGet('authenticate/profile', true).pipe(first()).subscribe((res: any)=>{
            localStorage.setItem('id', res.id);
            localStorage.setItem('name', res.name);
            localStorage.setItem('lastName', res.lastName);
            localStorage.setItem('email', res.email);
            localStorage.setItem('role', res.role);
      });
      //. . . Renovar Login o redirijir a Login
    }
  }

  public updateId(updatedId: string) {
    localStorage.setItem('id', updatedId);
  }

  public logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    setTimeout(()=> location.reload(), 200);
  }

  public isLoggedIn(): boolean {
    const id = localStorage.getItem('id');
    return id !== null && id !== undefined;
  }
}
