import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDetail, BookPagination } from 'app/data/models/book';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrendingServiceService {

  private apiUrl = 'https://librarync1.fly.dev/api/v1/book/searchHighestRating?page=0&size=5';

  constructor(private http: HttpClient) {}

  getHighestRatedBooks(): Observable<BookDetail[]> {
    const bookList: Observable<BookDetail[]> = this.http.get<BookPagination>(this.apiUrl).pipe(
      map((response: BookPagination) => response.content)
    );
    return bookList;
  }

}
