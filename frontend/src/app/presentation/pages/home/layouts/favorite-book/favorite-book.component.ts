import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'favorite-book-layout',
  templateUrl: './favorite-book.component.html',
  styleUrls: ['./favorite-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteBookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
