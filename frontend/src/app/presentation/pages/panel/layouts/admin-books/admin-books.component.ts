import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminCardComponent } from '@presentation/components/admin/admin-card/admin-card.component';
import { BookAdminTableComponent } from '@presentation/components/admin/book-admin-table/book-admin-table.component';
import { PageTabComponent } from '@presentation/components/admin/page-tab/page-tab.component';
import { SideBarComponent } from '@presentation/components/admin/side-bar/side-bar.component';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import {  BOOK_COLUMN, BOOK_DATA_SOURCE, TableColumns } from 'app/data/models/Admin';
import { Book } from 'app/data/models/book';

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
    FormsModule
  ],
})
export class AdminBooksComponent implements OnInit {
  protected bookDataSource: Book[] = BOOK_DATA_SOURCE;
  protected bookColumns: TableColumns[] = BOOK_COLUMN;
  public search: string = '';
  constructor() {}
  ngOnInit(): void {}
}
