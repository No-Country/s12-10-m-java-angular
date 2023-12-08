import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { CartService } from 'app/data/services/cart/cart.service';

@Component({
  selector: 'app-card-book-horizontal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, DefaultButtonComponent],
  templateUrl: './card-book-horizontal.component.html',
  styleUrls: ['./card-book-horizontal.component.css', '../default-button/default-button.component.css']
})
export class CardBookHorizontalComponent {
  @Input() public book: BookDetail;
  @Input() public className: string = "";
  @Input() public onCart: boolean = false;

  constructor(public cartService: CartService) {
    this.book = {} as BookDetail;
  }

  addOrRemove() {
    this.onCart ? this.cartService.deleteBookToCart(this.book): this.cartService.addBookToCart(this.book);
    this.onCart = !this.onCart;
  }

  removeFromCart(){
    this.book
  }

  addToCart(){

  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string';
  }
}
