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
  private http: HttpClient = this.injector.get(HttpClient);
  private loggedInService: LoggedInService = this.injector.get(LoggedInService);
  private readonly token = this.loggedInService.select('jwt');

  constructor(private injector: Injector) {}

  /*

  Trending
  /book/searchByCriteria?page={page}&size={size}&minPrice={minPrice}&maxPrice={maxPrice}&minPages={minPages}&genre={genre}&language={language}&searchEvenNotAvailable={searchEvenNotAvailable}&orderBy={}&secondOrderBy={}&ascOrDesc={}

  Ultimos agregados
    Nuevo endpoint

  Buscar categorias
    /book/searchGenre/{genre}?page=0&size=5

  */
  private createHeaders(isNedAuth: boolean): HttpHeaders {
    let headers = {} as HttpHeaders;
    if (isNedAuth) {
      const token = this.token();
      headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, //falta sacar token de local storage
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

  private createParams(url: string, params: any){
    let updated = url+"?";
    Object.entries(params).forEach((value, index)=>{
      updated = `${updated}${value[0]}=${value[1]}${Object.entries(params).length-1 !== index ? "&" : ""}`;
    });
    return updated;
  }

  public httpGet(
    path: string,
    isNedAuth?: boolean,
    params?: any
  ): Observable<any> {
    let url = this.createPath(path);

    return this.http.get<any>(url, {
      headers: this.createHeaders(isNedAuth === undefined ? false : isNedAuth),
      params: !params ? {} : params,
    });
  }

  public httpPost(
    path: string,
    body: any,
    isNedAuth: boolean = false
  ): Observable<any> {
    const url = this.createPath(path);
    return this.http.post<any>(url, body, {headers: this.createHeaders(isNedAuth)});
  }

  public httpPut(
    path: string,
    body: any,
    isNedAuth: boolean = false
  ): Observable<any> {
    const url = this.createPath(path);

    return this.http.put<any>(url, body, {
      headers: this.createHeaders(isNedAuth),
    });
  }
}
