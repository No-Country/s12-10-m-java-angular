import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../data/models/book';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { booksArray } from '../../../data/mocks/booksArray';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CardBookComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  booksArray: Book[]=booksArray

}

