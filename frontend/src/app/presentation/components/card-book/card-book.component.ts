import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, DefaultButtonComponent],
  selector: 'card-book',
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css'
})

export class CardBookComponent {

  @Input() public book: BookDetail;

  constructor(){
    this.book = {} as BookDetail;
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string'; 
  }

  redirectToBookDetail(){
  
  }
}
