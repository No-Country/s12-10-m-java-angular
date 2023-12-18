import { Injectable, Injector } from '@angular/core';
import { Book, BookDetail, BookPagination } from 'app/data/models/book';
import { Observable, Observer, first, map, of, take, takeUntil, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable()
export class BooksService {
  private latestBooks: BookDetail[];

  private api: ApiService = this.injector.get(ApiService);

  constructor(private injector: Injector) {
    const books = sessionStorage.getItem('latestBooks');

    try {
      this.latestBooks =
        books !== null && books !== undefined
          ? (JSON.parse(books) as BookDetail[])
          : [];
    } catch (error) {
      console.error('Error al parsear la cadena JSON:', error);
      this.latestBooks = [];
    }
  }

  /**
   * Recupera una lista de libros del backend
   *
   * @return {void} no retorna nada
   */
  public latestAdded(): Observable<BookDetail[]> {
    if (this.latestBooks.length === 0) {
      return this.api
        .httpGet('book/searchLatestAdded', false, { page: 0, size: 12 })
        .pipe(
          map((data: BookPagination) => {
            this.latestBooks = data.content;
            sessionStorage.setItem(
              'latestBooks',
              JSON.stringify(Object.values(data.content))
            );
            return Object.values(data.content);
          })
        );
    } else {
      return of(this.latestBooks);
    }
  }

  public detail(id: string): Observable<Book> {
    return this.api.httpGet(`book/${id}`, false);
  }

  public save(book: BookDetail): Observable<any> {
    return this.api.httpPost('book/createBookRequest', book);
  }

  public update(id: number, book: BookDetail): Observable<any> {
    return this.api.httpPut(`book/addImage/${id}`, book);
  }

  /* ELIMINAR LIBRO
  public delete(id: number): Observable<any>{
    return this.api.delete<any>(`book/${id}`);
  }*/
}
