import { Injectable, effect } from '@angular/core';
import { SignalsStoreService } from '../store/StoreSignals.service';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Injectable({ providedIn: 'root' })
export class LoggedInService extends SignalsStoreService<AuthResponse> {
  constructor() {
    super({} as AuthResponse);

    effect(() => {
      const state = this.state.asReadonly();
      console.log("Is enter ?");
      state().id !== undefined && state().id !== null
        ? sessionStorage.setItem('id', state().id)
        : sessionStorage.removeItem('id');

      (state().name !== undefined)
        ? sessionStorage.setItem('name', state().name)
        : sessionStorage.removeItem('name');

      state().lastName !== undefined
        ? sessionStorage.setItem('lastName', state().lastName)
        : sessionStorage.removeItem('lastName');

      state().email !== undefined
        ? sessionStorage.setItem('email', state().email)
        : sessionStorage.removeItem('email');

      state().role !== undefined
        ? sessionStorage.setItem('role', state().role)
        : sessionStorage.removeItem('role');

      state().jwt !== undefined
        ? localStorage.setItem('token', state().jwt)
        : localStorage.removeItem('token');
    });
  }

  public setLogin(values: AuthResponse) {
    this.setState(values);
  }
  // <<
  public verifyLogin() {
    const id = sessionStorage.getItem('id');
    const name = sessionStorage.getItem('name');
    const lastName = sessionStorage.getItem('lastName');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');
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

  public updateId(updatedId: string) {
    this.set('id', updatedId);
  }

  public logOut() {
    this.setState({});
    location.reload();
  }
}
