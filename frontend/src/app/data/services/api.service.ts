import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInService } from './login/loggedIn.service';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  private prodURL: string = 'https://librarync1.fly.dev/api/v1';
  private devURL: string = 'http://localhost:8080/api/v1';
  private readonly http: HttpClient = this.injector.get(HttpClient);

  constructor(private injector: Injector) {}

  private createHeaders(isNedAuth: boolean): HttpHeaders {
    let headers = {} as HttpHeaders;
    if (isNedAuth) {
      const token = localStorage.getItem('token');
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    return headers;
  }

  private createPath(value: string) {
    return `${this.prodURL}/${value}`;
  }

  public httpGet(
    path: string,
    isNedAuth?: boolean,
    params?: any
  ): Observable<any> {
    let url = this.createPath(path);
    console.log('params', params);
    return this.http.get<any>(url, {
      headers: this.createHeaders(isNedAuth === undefined ? false : isNedAuth),
      params: !params ? {} : params,
    });
  }

  public httpPost(
    path: string,
    body: any,
    isNedAuth?: boolean
  ): Observable<any> {
    const url = this.createPath(path);
    return this.http.post<any>(url, body, {
      headers: this.createHeaders(isNedAuth === undefined ? false : isNedAuth),
    });
  }

  public httpPut(path: string, body: any, isNedAuth: boolean): Observable<any> {
    const url = this.createPath(path);

    return this.http.put<any>(url, body, {
      headers: this.createHeaders(isNedAuth),
    });
  }

  public httpPatch(path: string, body: any, isNedAuth: boolean) {
    const url = this.createPath(path);
    return this.http.patch<any>(url, body, { headers: this.createHeaders(isNedAuth) });
  }
}
