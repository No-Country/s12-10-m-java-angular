import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Output,
  type OnInit,
  EventEmitter,
  OnDestroy,
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
import { Subject, delay, of, takeUntil, tap } from 'rxjs';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { AddState } from 'app/data/models/Admin';

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
  ],
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.css', '../../../shared/form.style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookModalComponent implements OnInit, OnDestroy {
  @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();

  protected createBookForm: FormGroup;
  public sending: boolean = false;
  public titleNotUK: boolean = false;
  public lastTitle: string = '';
  public isbnNotUK: boolean = false;
  public lastISBN: string = '';

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private builder: FormBuilder, private bookService: BooksService) {
    this.createBookForm = this.createForm();
  }

  ngOnInit(): void {
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
      title: ['', Validators.required],
      isbn: ['', Validators.required],
    });
  }

  onSubmit() {
    const { title, ISBN } = this.createBookForm.value;
    this.sending = true;
    this.bookService.createdBook.stateCreate.state = AddState.SENDING;
    of(true)
      .pipe(delay(1000))
      .subscribe(
          ()=>{
            this.sending = false;
            this.bookService.createdBook.stateCreate.state = AddState.COMPLETE;
            this.bookService.createdBook.book.idBook = crypto.randomUUID();
            this.bookService.createdBook.book.title = title;
            this.bookService.createdBook.book.isbn = ISBN;

            this.lastISBN = ISBN;
            this.lastTitle = title;

            this.closeModal.emit(true);
          }
      );
  }
}
