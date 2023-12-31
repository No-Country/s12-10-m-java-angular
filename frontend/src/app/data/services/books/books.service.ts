import { Injectable, Injector } from '@angular/core';
import {
  Book,
  BookCreation,
  BookDetail,
  BookPagination,
  CompleteBook,
} from 'app/data/models/book';
import {
  Observable,
  Observer,
  delay,
  first,
  map,
  of,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ApiService } from '../api.service';
import { AddModal, AddState } from 'app/data/models/Admin';

@Injectable()
export class BooksService {
  private latestBooks: BookDetail[];
  private api: ApiService = this.injector.get(ApiService);

  public createdBook: BookCreation;

  constructor(private injector: Injector) {
    const books = sessionStorage.getItem('latestBooks');

    this.createdBook = {} as BookCreation;
    console.log('Alo ?');
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

  public resetState(): void {
    this.createdBook.book = {} as CompleteBook;
    this.createdBook.stateCreate = {
      open: false,
      state: AddState.WAITING,
    } as AddModal;
    this.createdBook.stateComplete = {
      open: false,
      state: AddState.WAITING,
    } as AddModal;
    this.createdBook.stateAddImg = {
      open: false,
      state: AddState.WAITING,
    } as AddModal;
  }

  public detail(id: string): Observable<Book> {
    return this.api.httpGet(`book/${id}`, false);
  }

  public save(ID: string, title: string, isbn: string): Observable<any> {
    return this.api.httpPost(
      'book/createBook',
      { idBook: ID, title, isbn },
      true
    );
  }

  public completeBook(): Observable<any> {
    return this.api.httpPost('book/addInfoBook', this.createdBook.book, true);
  }

  public updateImg(): Observable<any> {
    //Enviar todo el array al back
    let images = this.createdBook.book.urlImages;
    return this.api.httpPost(
      'book/addImage' + this.createdBook.book.idBook,
      images,
      true
    );
  }
  /*
  public update(id: number, book: BookDetail): Observable<any> {
    return this.api.httpPut(`book/addImage/${id}`, book);
  }*/

  public getAll(): Observable<any> {
    return this.api.httpGet('book/allBooks');
  }

  public updateTitle(): Observable<any> {
    const updateTitle = {
      idBook: this.createdBook.book.idBook,
      title: this.createdBook.book.title,
    };
    return this.api.httpPatch('book/updateBook', updateTitle, true);
  }

  public updateCompleteBook(): Observable<any> {
    const updateComplete = {
      idBook: this.createdBook.book.idBook,
      price: this.createdBook.book.price,
      pages: this.createdBook.book.pages,

      publicationDate: this.createdBook.book.publicationDate,
      quantityAvailable: this.createdBook.book.quantityAvailable,

      description: this.createdBook.book.description,
      genre: this.createdBook.book.genre,
      language: this.createdBook.book.language,
    };
    return this.api.httpPatch('book/updateBook', updateComplete, true);
  }

  /* ELIMINAR LIBRO
  public delete(id: number): Observable<any>{
    return this.api.delete<any>(`book/${id}`);
  }*/
}
