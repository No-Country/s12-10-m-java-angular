import { Injectable, Injector } from '@angular/core';
import { BookDetail } from 'app/data/models/book';
import { Observable, of, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private cachedBooks: BookDetail[] = [];

  private api: ApiService = this.injector.get(ApiService)

  constructor(private injector: Injector) { }
  
  public list(): Observable<BookDetail[]> {
    if (this.cachedBooks.length > 0) {
      return of(this.cachedBooks);
    } else {
      return this.api.httpGet('book/toCard/allBooks?page=0&size=5').pipe(
        tap((books) => {
          this.cachedBooks = books;
        })
      );
    }
  }

  public detail(id: number): Observable<BookDetail>{
    return this.api.httpGet(`book/toCard/${id}`);
  } 

  public save(book: BookDetail): Observable<any>{
    return this.api.httpPost('book/createBookRequest', book);
  }

  public update(id: number, book: BookDetail): Observable<any>{
    return this.api.httpPut(`book/addImage/${id}`, book);
  }
  
/* ELIMINAR LIBRO
  public delete(id: number): Observable<any>{
    return this.api.delete<any>(`book/${id}`);
  }*/
}
