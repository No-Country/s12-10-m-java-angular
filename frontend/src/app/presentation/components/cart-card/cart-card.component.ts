import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { CartService } from 'app/data/services/cart/cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, DefaultButtonComponent, FormsModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {

  @Input() public bookOfCard: { book: BookDetail, quantity: number };
  @Output() public deleteBook = new EventEmitter<BookDetail>();

  constructor(public cartService:CartService){
    this.bookOfCard = {} as { book: BookDetail, quantity: number };
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string'; 
  }

  decreaseQuantity(){
    this.bookOfCard.quantity=this.bookOfCard.quantity-1;
  }

  increaseQuantity(){
    this.bookOfCard.quantity=this.bookOfCard.quantity+1;
  }


}
