import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { AdminTable, TableBody, TableColumns } from 'app/data/models/Admin';
import { Book } from 'app/data/models/book';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'admin-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTableComponent implements OnInit {
  @Input({ required: true }) public columns: TableColumns[] = [
    {},
  ] as TableColumns[];

  @Input({ required: true }) public bookDataSource: Book[] = [] as Book[];
  public currentPage: number = 1;

  ngOnInit(): void {}

  updatePage(updatePage: number){
    this.currentPage = updatePage;
  }
}
