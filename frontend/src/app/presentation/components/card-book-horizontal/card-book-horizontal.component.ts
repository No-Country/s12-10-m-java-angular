import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { CartService } from 'app/data/services/cart/cart.service';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';

@Component({
  selector: 'app-card-book-horizontal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, DefaultButtonComponent],
  templateUrl: './card-book-horizontal.component.html',
  styleUrls: [
    './card-book-horizontal.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBookHorizontalComponent {
  @Input() public book: BookDetail;
  @Input() public className: string = '';
  @Input() public onCart: boolean = false;

  constructor(public cartService: CartService,
    private router: Router,
    private loggedInService: LoggedInService) {
    this.book = {} as BookDetail;
  }

  addOrRemove() {
    if (this.loggedInService.isLoggedIn()) {
      this.onCart
      ? this.cartService.deleteBookToCart(this.book)
      : this.cartService.addBookToCart(this.book);
    this.onCart = !this.onCart;
    } else {
      this.router.navigate(['/login']);
    }
  }

  removeFromCart() {
    this.book;
  }

  addToCart() {}

  isStringId(ID: string | number) {
    return typeof ID === 'string';
  }
}
