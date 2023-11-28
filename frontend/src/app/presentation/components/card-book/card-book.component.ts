import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css'
})

export class CardBookComponent {

  @Input() public book: BookDetail;

  constructor(){
    this.book = {} as BookDetail;
  }
}
