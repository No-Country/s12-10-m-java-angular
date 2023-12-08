import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, DefaultButtonComponent],
  selector: 'card-book',
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css',
})
export class CardBookComponent implements OnInit {
  @Input({required: true}) public book: BookDetail;

  constructor() {
    this.book = {} as BookDetail;
  }
  ngOnInit(): void {
    console.log("book in card", this.book);
  }

  isStringId(ID: string | number) {
    return typeof ID === 'string';
  }

  view() {
    console.log(this.book.id);
  }
}
