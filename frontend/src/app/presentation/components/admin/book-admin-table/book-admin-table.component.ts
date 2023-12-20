import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddModal, AddState, TableColumns } from 'app/data/models/Admin';
import { Book } from 'app/data/models/book';
import { FilterPipe } from 'app/data/pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { BooksService } from 'app/data/services/books/books.service';
import { OutsideClickDirective } from 'app/data/util/outsideClick.directive';

@Component({
  selector: 'book-admin-table',
  standalone: true,
  imports: [
    CommonModule,
    AdminTableComponent,
    NgxPaginationModule,
    FilterPipe,
    OutsideClickDirective,
  ],
  templateUrl: './book-admin-table.component.html',
  styleUrl: './book-admin-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAdminTableComponent implements OnInit {
  @Input({ required: true }) public columns: TableColumns[] = [
    {},
  ] as TableColumns[];

  @Input({ required: true }) public bookDataSource: Book[] = [] as Book[];
  @Input() public searchTerm: string = '';
  public currentPage: number = 1;

  public actionActive: boolean[] = [false, false, false, false, false];

  constructor(private bookService: BooksService) {}
  ngOnInit(): void {}

  updatePage(updatePage: number) {
    this.currentPage = updatePage;
  }

  excuteAction(action: number, book: Book, index: number) {
    this.actionActive[index] = !this.actionActive[index];

    this.bookService.createdBook.book = book;
    this.bookService.createdBook.isUpdate = true;

    this.bookService.createdBook.stateCreate = {
      state: AddState.WAITING,
      open: false,
    } as AddModal;
    this.bookService.createdBook.stateComplete = {
      state: AddState.WAITING,
      open: false,
    } as AddModal;
    this.bookService.createdBook.stateAddImg = {
      state: AddState.WAITING,
      open: false,
    } as AddModal;

    if (action === 1) this.excuteUpdateTitle();
    if (action === 2) this.excuteUpdateInfo();
    if (action === 3) this.executeGallery();
  }

  excuteUpdateTitle() {
    this.bookService.createdBook.stateCreate.open = true;
  }

  excuteUpdateInfo() {
    this.bookService.createdBook.stateComplete.open = true;
  }

  executeGallery() {
    this.bookService.createdBook.stateAddImg.open = true;
  }
}
