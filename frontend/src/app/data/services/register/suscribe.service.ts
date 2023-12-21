import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthResponse } from 'app/data/models/AuthResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscribeService {

  private api: ApiService = this.injector.get(ApiService)

  constructor(private injector: Injector) { }

  public suscribe(email: string, auth: AuthResponse): Observable<any>{
    return this.api.httpPut(`user/subscribe/${email}` ,auth, true);
  }

}
