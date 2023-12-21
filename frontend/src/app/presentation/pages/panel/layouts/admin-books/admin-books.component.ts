import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  type OnInit,
  signal,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBookModalComponent } from '@presentation/components/admin/add-book-modal/add-book-modal.component';
import { AdminCardComponent } from '@presentation/components/admin/admin-card/admin-card.component';
import { BookAdminTableComponent } from '@presentation/components/admin/book-admin-table/book-admin-table.component';
import { CompleBookModalComponent } from '@presentation/components/admin/comple-book-modal/comple-book-modal.component';
import { CreateBookModalComponent } from '@presentation/components/admin/create-book-modal/create-book-modal.component';
import { GalleryBookModalComponent } from '@presentation/components/admin/gallery-book-modal/gallery-book-modal.component';
import { PageTabComponent } from '@presentation/components/admin/page-tab/page-tab.component';
import { SideBarComponent } from '@presentation/components/admin/side-bar/side-bar.component';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { OverlayComponent } from '@presentation/components/overlay/overlay.component';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import {
  AddState,
  BOOK_COLUMN,
  BOOK_DATA_SOURCE,
  TableColumns,
} from 'app/data/models/Admin';
import { Book, CompleteBook } from 'app/data/models/book';
import { BooksService } from 'app/data/services/books/books.service';
import { ToastService } from 'app/data/services/toast/Toast.service';
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
    GalleryBookModalComponent,
    OverlayComponent,
    CreateBookModalComponent,
    CompleBookModalComponent,
    ToastComponent,
  ],
})
export class AdminBooksComponent implements OnInit {
  protected bookDataSource: CompleteBook[] = [];
  protected bookColumns: TableColumns[] = BOOK_COLUMN;
  public search: string = '';

  public viewAddBook: boolean = false;
  public allBooks: WritableSignal<CompleteBook[]> = signal([]);
  private readonly toast = inject(ToastService);

  constructor(public bookService: BooksService) {}
  ngOnInit(): void {
    this.bookService.resetState();
    this.bookService.getAll().subscribe((books) => {
      this.allBooks.update((current) => books);
    });
  }

  public closeModal($event: boolean) {
    if (this.bookService.createdBook.stateCreate.state === AddState.COMPLETE) {
      let books = this.allBooks();
      books.push(this.bookService.createdBook.book);
      this.allBooks.update((current) => books);
    }

    this.viewAddBook = !this.viewAddBook;
  }

  protected togle(modal: number): void {
    if (modal === 1) {
      this.bookService.createdBook.stateCreate.open =
        !this.bookService.createdBook.stateCreate.open;
      this.viewAddBook = !this.viewAddBook;
    }

    if (modal === 2) {
      this.bookService.createdBook.stateComplete.open =
        !this.bookService.createdBook.stateComplete.open;
      this.viewAddBook = !this.viewAddBook;
    }

    if (modal === 3) {
      this.bookService.createdBook.stateAddImg.open =
        !this.bookService.createdBook.stateAddImg.open;
      this.viewAddBook = !this.viewAddBook;
    }
  }

  protected closeAll(): void {
    this.bookService.createdBook.stateCreate.open = false;
    this.bookService.createdBook.stateComplete.open = false;
    this.bookService.createdBook.stateAddImg.open = false;
    this.viewAddBook = false;
  }

  protected closeBooksModal(event: boolean, modal: number): void {
    if (event) {
      if (modal === 1) {
        this.toast.success(
          'Book has been created',
          'Now complete the info of the book.',
          5
        );
      }
      if (event && modal === 2) {
        this.toast.success(
          'Info has been saved',
          'Now add image to your book!',
          5
        );
      }

      if (event && modal === 3) {
        {
          this.toast.success(
            'Saved successfully',
            'Book has been completely created.',
            5
          );

          setTimeout(() => {
            this.viewAddBook = false;
          }, 800);
        }
      }
    } else {
      this.togle(modal);
    }
  }

  public viewOverlay() {
    return (
      this.viewAddBook ||
      this.bookService.createdBook.stateAddImg.open ||
      this.bookService.createdBook.stateCreate.open ||
      this.bookService.createdBook.stateComplete.open
    );
  }
}
