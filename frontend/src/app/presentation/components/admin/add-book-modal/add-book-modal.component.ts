import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  type OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import { StepAddComponent } from '../step-add/step-add.component';
import { BooksService } from 'app/data/services/books/books.service';

@Component({
  selector: 'add-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent,
    StepAddComponent,
  ],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookModalComponent implements OnInit, OnDestroy {
  @Output() public openOrCloseModal: EventEmitter<number> = new EventEmitter();


  constructor(public bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.resetState();
  }

  ngOnDestroy(): void {

  }

  protected togleModal(modal: number): void {
    this.openOrCloseModal.emit(modal);
  }
}
