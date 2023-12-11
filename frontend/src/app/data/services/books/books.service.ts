import { Injectable, Injector } from '@angular/core';
import { Book, BookDetail } from 'app/data/models/book';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { RxjsStoreService } from '../store/StoreRxJs.service';

@Injectable()
export class BooksService extends RxjsStoreService<BookDetail[]> {
  private cachedBooks: BookDetail[];

  private api: ApiService = this.injector.get(ApiService)

  constructor(private injector: Injector) { 
    super(Array(0) as BookDetail[]);
    this.cachedBooks = [];
  }
  
  /**
   * Recupera una lista de libros del backend
   *
   * @return {void} no retorna nada
   */
  public list(): void {

    if (this.cachedBooks.length === 0) {
      this.api.httpGet('book/toCard/allBooks?page=0&size=5', false)
      .subscribe(
        {
          next: (books)=>{
            this.setState(Object.values( BOOK_DETAIL_MOOK ));
            this.cachedBooks = BOOK_DETAIL_MOOK;
            console.log("Mook 1: ", BOOK_DETAIL_MOOK);
          },
          error: (error: any )=>{
            this.setState(Object.values( BOOK_DETAIL_MOOK ));
            this.cachedBooks = BOOK_DETAIL_MOOK;
            console.log("Mook 2: ", BOOK_DETAIL_MOOK);
          }
        }
      );
    }
  }

  public detail(id: number): Observable<Book>{
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
