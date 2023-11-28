import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../data/models/book';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css'
})

export class CardBookComponent {

  @Input() bookOfCard:Book = {} as Book;
}
