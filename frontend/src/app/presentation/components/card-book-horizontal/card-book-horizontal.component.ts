import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { RouterLink } from '@angular/router';
// import { DefaultButtonComponent } from '../default-button/default-button.component'; , DefaultButtonComponent esto abajo en imports

@Component({
  selector: 'app-card-book-horizontal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './card-book-horizontal.component.html',
  styleUrl: './card-book-horizontal.component.css'
})
export class CardBookHorizontalComponent {
  @Input() public book: BookDetail;
  @Input() public className: string = "";
  @Input() public horizontalCard: boolean = false;

  constructor(){
    this.book = {} as BookDetail;
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string'; 
  }
}
