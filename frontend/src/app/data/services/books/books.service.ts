import { Injectable, Injector } from '@angular/core';
import { Book } from 'app/data/models/book';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private api: ApiService = this.injector.get(ApiService)

  constructor(private injector: Injector) { }
  
  public lista(): Observable<Book[]>{
    return this.api.httpGet('list');
  }

  public detail(id: number): Observable<Book>{
    return this.api.httpGet(`detail/${id}`);
  } 

  public save(book: Book): Observable<any>{
    return this.api.httpPost('create', book);
  }

  public update(id: number, book: Book): Observable<any>{
    return this.api.httpPut(`update/${id}`, book);
  }
/* ELIMINAR LIBRO
  public delete(id: number): Observable<any>{
    return this.api.delete<any>(`delete/${id}`);
  }*/
}
