import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { NumberDetailComponent } from '@presentation/components/number-detail/number-detail.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, DefaultButtonComponent, NumberDetailComponent, RouterLink],
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
