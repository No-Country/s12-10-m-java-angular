import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, type OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBookModalComponent } from '@presentation/components/admin/add-book-modal/add-book-modal.component';
import { AdminCardComponent } from '@presentation/components/admin/admin-card/admin-card.component';
import { BookAdminTableComponent } from '@presentation/components/admin/book-admin-table/book-admin-table.component';
import { PageTabComponent } from '@presentation/components/admin/page-tab/page-tab.component';
import { SideBarComponent } from '@presentation/components/admin/side-bar/side-bar.component';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import {  AddState, BOOK_COLUMN, BOOK_DATA_SOURCE, TableColumns } from 'app/data/models/Admin';
import { Book } from 'app/data/models/book';
import { BooksService } from 'app/data/services/books/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    AdminCardComponent,
    PageTabComponent,
    DefaultButtonComponent,
    BookAdminTableComponent,
    FormsModule,
    AddBookModalComponent,
    SpinnerComponent,
  ],
})
export class AdminBooksComponent implements OnInit {
  protected bookDataSource: Book[] = [];
  protected bookColumns: TableColumns[] = BOOK_COLUMN;
  public search: string = '';

  public viewAddBook: boolean = false;
  public allBooks: WritableSignal<Book[]> = signal([]);

  constructor(public bookService: BooksService) {}
  ngOnInit(): void {
    this.bookService.getAll().subscribe((books) => {
      this.allBooks.update((current) => (books.content));
    });
  }

  public closeModal($event: boolean) {
    if (this.bookService.createdBook.stateCreate.state === AddState.COMPLETE) {
      let books = this.allBooks();
      books.push(this.bookService.createdBook.book);
      this.allBooks.update((current) => (books));
    }

    this.viewAddBook = !this.viewAddBook;
  }
}
