import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInService } from './login/loggedIn.service';

@Injectable({
  providedIn: 'any'
})
export class ApiService {
  private prodURL: string = 'https://librarync1.fly.dev/api/v1'; 
  private devURL: string = 'http://localhost:8080/api/v1'; 
  private http: HttpClient = this.injector.get(HttpClient);
  private loggedInService: LoggedInService = this.injector.get(LoggedInService);
  private readonly token = this.loggedInService.select("jwt");

  constructor(private injector: Injector) { }

  private createHeaders(isNedAuth: boolean) {
    let httpOptions = {};


    if(isNedAuth){
      const token = this.token();
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,//falta sacar token de local storage 
        }),
      };

    } else {

      httpOptions = {
        headers: new HttpHeaders({
        }),
      };

    }

    return httpOptions;
  }

  private createPath(value: string){
    return `${this.prodURL}/${value}`;
  }

  public httpGet(path: string, isNedAuth: boolean = false): Observable<any> {
      const url = this.createPath(path);
      return this.http.get<any>(url, this.createHeaders(isNedAuth));
  }

  public httpPost(path: string, body: any, isNedAuth: boolean = false): Observable<any> {
    const url = this.createPath(path);
    return this.http.post<any>(url, body, this.createHeaders(isNedAuth));
  }

  public httpPut(path: string, body: any, isNedAuth: boolean = false): Observable<any> {
      const url = this.createPath(path);
    
      return this.http.put<any>(url, body, this.createHeaders(isNedAuth));
  }
}
