import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  selector: 'app-book-detail-card',
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent],
  templateUrl: './book-detail-card.component.html',
  styleUrl: './book-detail-card.component.css'
})
export class BookDetailCardComponent {

}
