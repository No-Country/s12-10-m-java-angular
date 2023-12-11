import { Injectable, effect } from '@angular/core';
import { SignalsStoreService } from '../store/StoreSignals.service';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Injectable({ providedIn: 'root' })
export class LoggedInService extends SignalsStoreService<AuthResponse> {
  constructor() {
    super({} as AuthResponse);

    effect(() => {
      const state = this.state.asReadonly();
      (state().id !== undefined)
        ? localStorage.setItem('id', state().id)
        : localStorage.removeItem('id');

      (state().name !== undefined)
        ? localStorage.setItem('name', state().name)
        : localStorage.removeItem('name');

      (state().lastName !== undefined)
        ? localStorage.setItem('lastName', state().lastName)
        : localStorage.removeItem('lastName');

      (state().email !== undefined)
        ? localStorage.setItem('email', state().email)
        : localStorage.removeItem('email');

      (state().role !== undefined)
        ? localStorage.setItem('role', state().role)
        : localStorage.removeItem('role');

      (state().jwt !== undefined)
        ? localStorage.setItem('jwt', state().jwt)
        : localStorage.removeItem('jwt');
    });
  }

  public setLogin(values: AuthResponse) {
    this.setState(values);
  }
  // <<
  public verifyLogin() {
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

  public updateId(updatedId: string) {
    this.set('id', updatedId);
  }

  public logOut() {
    this.setState({});
    location.reload();
  }
}
