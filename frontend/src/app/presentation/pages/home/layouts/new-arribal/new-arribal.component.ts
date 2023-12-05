import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardBookHorizontalComponent } from '@presentation/components/card-book-horizontal/card-book-horizontal.component';
import { CardBookComponent } from '@presentation/components/card-book/card-book.component';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { BookDetail } from 'app/data/models/book';
import { Observable, delay, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, CardBookComponent, CardBookHorizontalComponent],
  selector: 'new-arribal-layout',
  templateUrl: './new-arribal.component.html',
  styleUrls: ['./new-arribal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArribalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
