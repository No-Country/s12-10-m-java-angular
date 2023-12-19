import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { CartService } from 'app/data/services/cart/cart.service';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, DefaultButtonComponent],
  selector: 'card-book',
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBookComponent implements OnInit {
  @Input({ required: true }) public book: BookDetail;
  public onCart: boolean = false;

  constructor(public cartService: CartService, private loggedIn: LoggedInService, private router: Router) {
    this.book = {} as BookDetail;
  }
  ngOnInit(): void {
    this.onCart = this.cartService.isInTheCart(this.book.id)
  }

  addOrRemove() {
    if (this.loggedIn.isLogged()) {
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

  view() {
    console.log(this.book.id);
  }
}
