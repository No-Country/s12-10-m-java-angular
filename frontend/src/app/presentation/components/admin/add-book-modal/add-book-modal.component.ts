import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  type OnInit,
} from '@angular/core';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import { StepAddComponent } from '../step-add/step-add.component';
import { AddModal, AddState } from 'app/data/models/Admin';
import { CreateBookModalComponent } from '../create-book-modal/create-book-modal.component';
import { BooksService } from 'app/data/services/books/books.service';
import { Book } from 'app/data/models/book';
import { CompleBookModalComponent } from '../comple-book-modal/comple-book-modal.component';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from 'app/data/services/toast/Toast.service';
import { GalleryBookModalComponent } from '../gallery-book-modal/gallery-book-modal.component';

@Component({
  selector: 'add-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent,
    StepAddComponent,
    CreateBookModalComponent,
    CompleBookModalComponent,
    ToastComponent,
    GalleryBookModalComponent,
  ],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookModalComponent implements OnInit, OnDestroy {
  private readonly toast = inject(ToastService);
  public mainModal: boolean = true;

  constructor(public bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.resetState();
  }
  ngOnDestroy(): void {
    this.bookService.resetState();
  }

  private togle(modal: number): void {
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

  protected togleModal(modal: number): void {
    this.togle(modal);
  }

  protected closeModal(event: boolean, modal: number): void {
    this.togle(modal);

    if (event && modal === 1)
      this.toast.success(
        'Book has been created',
        'Now complete the info of the book.',
        5
      );
    if (event && modal === 2)
      this.toast.success(
        'Info has been saved',
        'Now add image to your book!',
        5
      );
    if (event && modal === 3)
      this.toast.success(
        'Saved successfully',
        'Book has been completely created.',
        5
      );
  }
}
