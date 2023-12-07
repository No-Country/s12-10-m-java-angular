import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { Book } from 'app/data/models/book';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent, NgOptimizedImage],
  templateUrl: './book-detail-card.component.html',
  styleUrl: './book-detail-card.component.css'
})
export class BookDetailCardComponent {

  @Input() public book: Book;

  constructor(){
    this.book = {} as Book;
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string'; 
  }
}
