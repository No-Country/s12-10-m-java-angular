import { inject } from '@angular/core';
import { Router, type ResolveFn } from '@angular/router';
import { Book } from '../models/book';
import { BooksService } from '../services/books/books.service';
import { EMPTY, mergeMap, of } from 'rxjs';

export const bookDetailResolver: ResolveFn<Book> = (route, state) => {
  const router = inject(Router);
  const bookService = inject(BooksService);
  const ID = route.paramMap.get('id')!;

    return bookService.detail(ID).pipe(
      mergeMap((book) => {
        if (book) {
          return of(book);
        } else {
          router.navigate(['/404']);
          return EMPTY;
        }
      })
    );
};
