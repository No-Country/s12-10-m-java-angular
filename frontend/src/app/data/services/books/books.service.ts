import { Injectable, Injector } from '@angular/core';
import { Book } from 'app/data/models/book';
import { Observable, of, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private cachedBooks: Book[] = [];

  private api: ApiService = this.injector.get(ApiService)

  constructor(private injector: Injector) { }
  
  public list(): Observable<Book[]> {
    if (this.cachedBooks.length > 0) {
      return of(this.cachedBooks);
    } else {
      return this.api.httpGet('list').pipe(
        tap((books) => {
          this.cachedBooks = books;
        })
      );
    }
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
