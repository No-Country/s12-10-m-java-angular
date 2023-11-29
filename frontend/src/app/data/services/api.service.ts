import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ApiService {
  private devUrl: string = 'https://librarync1.fly.dev/api/v1'; 

  private http: HttpClient = this.injector.get(HttpClient);

  constructor(private injector: Injector) { }

  private createHeaders(isNedAuth: boolean) {
    let httpOptions = {};


    if(isNedAuth){

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `,//falta sacar token de local storage 
        }),
      };

    } else {

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

    }

    return httpOptions;
  }

  public httpGet(path: string, isNedAuth: boolean = false): Observable<any> {
      const url = `${this.devUrl}/${path}`;
      return this.http.get<any>(url, this.createHeaders(isNedAuth));
  }

  public httpPost(path: string, body: any, isNedAuth: boolean = false): Observable<any> {
    const url = `${this.devUrl}/${path}`;
    return this.http.post<any>(url, body, this.createHeaders(isNedAuth));
  }

  public httpPut(path: string, body: any, isNedAuth: boolean = false): Observable<any> {
      const url = `${this.devUrl}/${path}`;
    
      return this.http.put<any>(url, body, this.createHeaders(isNedAuth));
  }
}
