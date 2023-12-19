import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import { StepAddComponent } from '../step-add/step-add.component';
import { AddModal, AddState } from 'app/data/models/Admin';
import { CreateBookModalComponent } from '../create-book-modal/create-book-modal.component';
import { BooksService } from 'app/data/services/books/books.service';
import { Book } from 'app/data/models/book';
import { CompleBookModalComponent } from '../comple-book-modal/comple-book-modal.component';

@Component({
  selector: 'add-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent,
    StepAddComponent,
    CreateBookModalComponent,
    CompleBookModalComponent,
  ],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookModalComponent implements OnInit {
  public mainModal: boolean = true;

  constructor(public bookService: BooksService) {}
  public createBook: AddModal = { state: AddState.WAITING, open: false };
  public completeBook: AddModal = { state: AddState.WAITING, open: false };
  public addImages: AddModal = { state: AddState.WAITING, open: false };

  ngOnInit(): void {
    this.bookService.createdBook.book = {} as Book;
    this.bookService.createdBook.stateCreate = {
      open: false,
      state: AddState.WAITING,
    } as AddModal;
    this.bookService.createdBook.stateComplete = {
      open: false,
      state: AddState.WAITING,
    } as AddModal;
    this.bookService.createdBook.stateAddImg = {
      open: false,
      state: AddState.WAITING,
    } as AddModal;
  }

  togleModal(modal: number) {
    if (modal === 1) {
      this.bookService.createdBook.stateCreate.open =
        !this.bookService.createdBook.stateCreate.open;
      this.mainModal = !this.mainModal;
    }
    if (modal === 2) {
      this.bookService.createdBook.stateComplete.open =
        !this.bookService.createdBook.stateComplete.open;
      this.mainModal = !this.mainModal;
    }
    if (modal === 3) {
      this.bookService.createdBook.stateAddImg.open =
        !this.bookService.createdBook.stateAddImg.open;
      this.mainModal = !this.mainModal;
    }
  }
}
