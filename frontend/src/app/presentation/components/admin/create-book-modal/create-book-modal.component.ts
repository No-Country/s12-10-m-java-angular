import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Output,
  type OnInit,
  EventEmitter,
  OnDestroy,
  inject,
} from '@angular/core';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import { ErrorMessageComponent } from '@presentation/components/error-message/error-message.component';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BooksService } from 'app/data/services/books/books.service';
import { Subject, catchError, delay, of, takeUntil, tap } from 'rxjs';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { AddState } from 'app/data/models/Admin';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from 'app/data/services/toast/Toast.service';

@Component({
  selector: 'create-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent,
    ErrorMessageComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    DefaultButtonComponent,
    ToastComponent,
  ],
  templateUrl: './create-book-modal.component.html',
  styleUrls: [
    './create-book-modal.component.css',
    '../../../shared/form.style.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookModalComponent implements OnInit, OnDestroy {
  @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();
  private readonly toast = inject(ToastService);

  protected createBookForm: FormGroup;
  public sending: boolean = false;
  public titleNotUK: boolean = false;
  public lastTitle: string = '';
  public isbnNotUK: boolean = false;
  public lastISBN: string = '';

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private builder: FormBuilder,
    protected bookService: BooksService
  ) {
    this.createBookForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.bookService.createdBook.isUpdate) {
      this.isbn.setValue(this.bookService.createdBook.book.isbn);
      this.title.setValue(this.bookService.createdBook.book.title);
    }

    this.createBookForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        if (this.isbnNotUK && this.lastISBN !== values.isbn) {
          this.isbnNotUK = false;
        }
        if (
          !this.isbnNotUK &&
          this.lastISBN !== '' &&
          this.lastISBN === values.isbn
        ) {
          this.isbnNotUK = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm() {
    return this.builder.group({
      title: ['', [Validators.required]],
      isbn: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.maxLength(13),
          Validators.minLength(10),
        ],
      ],
    });
  }

  onSubmit() {
    let sending = this.sending;

    const { title, isbn } = this.createBookForm.value;
    const ID = crypto.randomUUID();
    this.bookService.createdBook.book.idBook = ID;

    sending = !sending;
    this.bookService.createdBook.stateCreate.state = AddState.SENDING;

    if (!this.bookService.createdBook.isUpdate) {
      this.bookService.save(ID, title, isbn).subscribe({
        next: (res: any) => {
          sending = !sending;
          this.bookService.createdBook.stateCreate.state = AddState.COMPLETE;
          this.bookService.createdBook.book.title = title;
          this.bookService.createdBook.book.isbn = isbn;
          this.closeModal.emit(true);
        },
        error: (err: any) => {
          this.lastISBN = isbn;

          sending = !sending;
          this.bookService.createdBook.stateCreate.state = AddState.WAITING;

          this.isbnNotUK = true;
          this.toast.error('Opss', 'Ha ocurrido un error al guardar', 5);
        },
      });
    } else {
      this.bookService.updateTitle().subscribe({
        next: () => {
          this.bookService.createdBook.book.title = title;
          this.bookService.createdBook.stateCreate.state = AddState.COMPLETE;
          this.closeModal.emit(true);
        },
        error: () => {
          this.lastTitle = title;

          sending = !sending;
          this.bookService.createdBook.stateCreate.state = AddState.WAITING;

          this.toast.error('Opss', 'Ha ocurrido un error al actualizar', 5);
        },
      });
    }
  }

  public get isbn() {
    return this.createBookForm.get('isbn')!;
  }

  public get title() {
    return this.createBookForm.get('title')!;
  }
}
