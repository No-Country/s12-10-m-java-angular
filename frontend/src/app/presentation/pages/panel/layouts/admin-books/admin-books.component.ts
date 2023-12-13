import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { AdminCardComponent } from '@presentation/components/admin/admin-card/admin-card.component';
import { AdminTableComponent } from '@presentation/components/admin/admin-table/admin-table.component';
import { PageTabComponent } from '@presentation/components/admin/page-tab/page-tab.component';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { AdminTable, BOOK_COLUMN, BOOK_DATA_SOURCE, TableBody, TableColumns } from 'app/data/models/Admin';
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
    AdminTableComponent,
  ],
})
export class AdminBooksComponent implements OnInit {
  protected bookDataSource: Book[] = BOOK_DATA_SOURCE;
  protected bookColumns: TableColumns[] = BOOK_COLUMN;

  constructor() {
  }
  ngOnInit(): void {}
}
