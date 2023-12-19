import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableColumns } from 'app/data/models/Admin';
import { Book } from 'app/data/models/book';
import { FilterPipe } from 'app/data/pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminTableComponent } from '../admin-table/admin-table.component';

@Component({
  selector: 'book-admin-table',
  standalone: true,
  imports: [CommonModule, AdminTableComponent, NgxPaginationModule, FilterPipe],
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

  ngOnInit(): void {}

  updatePage(updatePage: number) {
    this.currentPage = updatePage;
  }
}
